class Api::ConnectionsController < ApplicationController
    include AuthenticationConcern
    before_action :check_authenticated_user
    before_action :check_class_exists, only: :request_match
    before_action :check_request_exists, only: :update_match
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
                render(json: error, status: 500)
                return
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
                render_json_400("Updated status is invalid")
                return
            end

            if @request.status_is_pending?
                render_json_400("Can't update request to pending")
                return

            elsif @request.status_is_cancelled? and @request.student_id != @current_user.id
                render_json_400("Only the student can cancel the match request")
                return

            elsif (@request.status_is_refused? or @request.status_is_accepted?) and @request.skill_class.teacher_id != @current_user.id
                render_json_400("Only the teacher can answer the match request")
                return

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
                        render(json: error, status: 500)
                        return
                    end

                    if @request.status_is_accepted?
                        #request was accepted so connection must be created
                        connection = Connection.new(match_id: @request.id)

                        unless connection.save
                            error = {"error": connection.errors.full_messages}
                            render(json: error, status: 500)
                            return
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

    def get_notifications
        @unread_notifications = Notification.where(person_id: @current_user.id, read: false).order(created_at: :desc)
        u_n_json = @unread_notifications.as_json(only: [:id, :text, :notification_type, :created_at, :match_id], include: {match: { only: [:id, :student_id]}})
        read_notifications = Notification.where(person_id: @current_user.id, read: true).order(created_at: :desc).as_json(only: [:id, :text, :notification_type, :created_at], include: {match: { only: [:id, :student_id]}})

        notifications = {"read": read_notifications, "unread": u_n_json}

        render(json: notifications)
    end

    private 
    def check_authenticated_user
        unless @current_user
            error = {"error": "User must be authenticated"}
            render(json: error, status: 401)
        end
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
    def render_json_400(message)
        error = {"error": message}
        render(json: error, status: 400)
    end

    private
    def update_unread_notifications
        # only informative notifications should be marked read
        @unread_notifications.where(notification_type: ["match_accepted", "match_denied"]).update_all(read: true)

    end

end