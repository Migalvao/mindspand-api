class Api::ConnectionsController < ApiController
    include AuthenticationConcern
    before_action :check_authenticated_user
    before_action :check_class_exists, only: :request_match
    before_action :check_request_exists, only: :update_match
    before_action :check_connection, only: :update_connection
    after_action :update_unread_notifications, only: :get_notifications

    def request_match

        request = MatchRequest.new(student_id: @current_user.id, skill_class_id: params[:id])

        most_recent_request = MatchRequest.where(student_id: @current_user.id, skill_class_id: params[:id]).order(created_at: :desc).first

        if most_recent_request and most_recent_request.status_is_pending?
            #check if pending request already exists
            error = {"error": "Match request already exists"}
            render(json: error, status: 400)

        elsif most_recent_request and Connection.find_by(match_id: most_recent_request.id, class_status: "in_progress")
            #check if connection already exists
            error = {"error": "Connection to this class already exists"}
            render(json: error, status: 400)

        elsif request.save
            #success

            #create respective notification for the teacher
            data = {match_id: request.id, person_id: request.skill_class.teacher.id, notification_type: "received_request", 
                text: "New match request from #{@current_user.username} to class #{request.skill_class.title}"}
            notification = Notification.new(data)

            if notification.save
                res = {"request": request.as_json(only: [:id, :status])}
                render(json: res)

            else
                error = {"error": notification.errors.full_messages}
                return render(json: error, status: 500)
            end

        else
            error = {"error": request.errors.full_messages}
            render(json: error, status: 400)
        end

    end

    def update_match

        if @request.status_is_pending?
            
            begin
                @request.status = params[:status]
            rescue
                return render_json_400("Updated status is invalid")
            end

            if @request.status_is_pending?
                return render_json_400("Can't update request to pending")

            elsif @request.status_is_cancelled? and @request.student_id != @current_user.id
                return render_json_400("Only the student can cancel the match request")

            elsif (@request.status_is_refused? or @request.status_is_accepted?) and @request.skill_class.teacher_id != @current_user.id
                return render_json_400("Only the teacher can answer the match request")

            end

            #valid update
            @request.response_datetime = Time.new

            if @request.save
                if @request.status_is_cancelled?
                    #if request was cancelled, we need to delete the notification
                    notification = Notification.find_by(match_id: @request.id)
                    notification.destroy

                else
                    #if request was answered, we need to create a new notification for the answer
                    
                    data = {match_id: @request.id, person_id: @request.student_id, 
                            notification_type: @request.status_is_accepted? ? "match_accepted" : "match_denied",
                            text: @request.status_is_accepted? ? "Match request to class #{@request.skill_class.title} accepted!" 
                                : "Match request to class #{@request.skill_class.title} denied."
                    }

                    notification = Notification.new(data)

                    unless notification.save
                        error = {"error": notification.errors.full_messages}
                        return render(json: error, status: 500)
                    end

                    # we also need to mark the own user's notification as read since they responded
                    own_notification = Notification.find_by(match_id: @request.id, person_id: @current_user.id, notification_type: "received_request")
                    
                    if own_notification
                        unless own_notification.update(read: true)
                            return render_json_500(own_notification.errors.full_messages)
                        end
                    else
                        # Shouldn't happen, notification not found
                        puts "Error: there was no notification"
                    end

                    if @request.status_is_accepted?
                        #request was accepted so connection must be created
                        connection = Connection.new(match_id: @request.id)

                        unless connection.save
                            error = {"error": connection.errors.full_messages}
                            return render(json: error, status: 500)
                        end
                    end

                end

                res = {"request": @request.as_json(only: [:id, :status])}
                render(json: res)
            else
                render_json_400(@request.errors.full_messages)
            end

        else
            render_json_400("Match request has already been updated")
        end

    end

    def update_connection

        if @connection.in_progress?

            begin
                @connection.class_status = params[:status]

            rescue
                return render_json_400("Updated status is invalid")
            end

            if @connection.in_progress?
                return render_json_400("Updated status is invalid")
            end

            # Valid request

            if @is_student
                @connection.person_closed_connection = "student_closed"
            else
                @connection.person_closed_connection = "teacher_closed"
            end

            @connection.ended_at = Time.new

            if @connection.save
                # connection updated successfully, now we need to notify the other user

                skill_class = @connection.match.skill_class

                if @connection.given?
                    text = "Connection to class #{skill_class.title} was closed. Class was given"
                else
                    text = "Connection to class #{skill_class.title} was closed. Class was canceled"
                end


                if @is_student
                    # create notification for the teacher
                    notification = Notification.new({text: text, notification_type: "connection_closed", match_id: @connection.match_id, person_id: skill_class.teacher_id})
                else
                    #create notification for the student
                    notification = Notification.new({text: text, notification_type: "connection_closed", match_id: @connection.match_id, person_id: @connection.match.student_id})
                end

                unless notification.save
                    error = {"error": notification.errors.full_messages}
                    return render(json: error, status: 500)
                end

                res = @connection.as_json(only: [:id, :created_at, :ended_at, :class_status])
                render(json: res)

            else
                render_json_400(@connection.errors.full_messages)
            end

        else
            render_json_400("Connection has already been closed")
        end

    end

    def get_notifications
        @unread_notifications = Notification.where(person_id: @current_user.id, read: false).order(created_at: :desc)
        u_n_json = @unread_notifications.as_json(only: [:id, :text, :notification_type, :created_at], include: {match: { only: [:id, :student_id, :status], include: {connection: {only: [:id, :class_status]}}}})
        read_notifications = Notification.where(person_id: @current_user.id, read: true).order(created_at: :desc).as_json(only: [:id, :text, :notification_type, :created_at], include: {match: { only: [:id, :student_id, :status], include: {connection: {only: [:id, :class_status]}}}})

        notifications = {"read": read_notifications, "unread": u_n_json}

        render(json: notifications)
    end

    private
    def check_class_exists
        unless SkillClass.find_by(id: params[:id])
            error = {"error": "Class with that id does not exist"}
            render(json: error, status: 400)
        end
    end

    private
    def check_request_exists
        @request = MatchRequest.find_by(id: params[:id])

        unless @request
            error = {"error": "Match request with that id does not exist"}
            render(json: error, status: 400)
        end
    end

    private
    def check_connection
        @connection = Connection.find_by(id: params[:id])

        return render_json_400("Connection with that id does not exist") unless @connection

        if @connection.match.student_id == @current_user.id
            # Student is closing the connection
            @is_student = true

        elsif @connection.match.skill_class.teacher_id == @current_user.id
            # Teacher is closing the connection
            @is_student = false

        else
            # Unauthorized
            error = {"error": "Can't close other users' connections"}
            render(json: error, status: 401)
        end

    end

    private
    def update_unread_notifications
        # only informative notifications should be marked read
        @unread_notifications.where(notification_type: ["match_accepted", "match_denied"]).update_all(read: true)

    end

end