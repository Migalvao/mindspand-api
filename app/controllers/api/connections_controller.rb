class Api::ConnectionsController < ApplicationController
    include AuthenticationConcern

    def request_match

        if @current_user

            request = MatchRequest.new
            request.student_id = @current_user.id

            if SkillClass.find_by(id: params[:id])
                #check if class exists
                request.skill_class_id = params[:id]

                most_recent_request = MatchRequest.where(student_id: @current_user.id, skill_class_id: params[:id]).order(:created_at).reverse_order.first

                if most_recent_request and most_recent_request.status_is_pending?
                    #check if pending request already exists
                    error = {"error": "Match request already exists"}
                    render(json: error, status: 400)
                    return

                elsif most_recent_request and Connection.find_by(match_id: most_recent_request.id, class_status: "in_progress")
                    #check if connection already exists
                    error = {"error": "Connection to this class already exists"}
                    render(json: error, status: 400)
                    return
                end


                if request.save
                    #success

                    #create respective notification for the teacher
                    data = {match_id: request.id, person_id: request.skill_class.teacher.id, notification_type: "received_request", 
                        text: "New match request from #{@current_user.username} to class #{request.skill_class.title}"}
                    notification = Notification.new(data)

                    if not notification.save
                        error = {"error": notification.errors.full_messages}
                        render(json: error, status: 500)
                        return
                    end

                    res = {"request": request.as_json(only: [:id, :status])}
                    render(json: res)

                else
                    error = {"error": request.errors.full_messages}
                    render(json: error, status: 400)
                end


            else
                error = {"error": "Class with that id does not exist"}
                render(json: error, status: 400)
            end


        else
            error = {"error": "User must be authenticated"}
            render(json: error, status: 401)
        end

    end

    def update_match

        if @current_user

            request = MatchRequest.find_by(id: params[:id])

            if request
                #check if request exists

                if request.status_is_pending?
                    
                    begin
                        request.status = params[:status]
                    rescue
                        error = {"error": "Updated status is invalid"}
                        render(json: error, status: 400)
                        return
                    end

                    if request.status_is_pending?
                        error = {"error": "Can't update request to pending"}
                        render(json: error, status: 400)
                        return

                    elsif request.status_is_cancelled? and request.student_id != @current_user.id
                        error = {"error": "Only the student can cancel the match request"}
                        render(json: error, status: 400)
                        return

                    elsif (request.status_is_refused? or request.status_is_accepted?) and request.skill_class.teacher_id != @current_user.id
                        error = {"error": "Only the teacher can answer the match request"}
                        render(json: error, status: 400)
                        return

                    end

                    #valid update
                    request.response_datetime = Time.new

                    if request.save
                        if request.status_is_cancelled?
                            #if request was cancelled, we need to delete the notification
                            notification = Notification.find_by(match_id: request.id)
                            notification.destroy

                        else
                            #if request was answered, we need to create a new notification for the answer
                            
                            data = {match_id: request.id, person_id: request.student_id, 
                                    notification_type: request.status_is_accepted? ? "match_accepted" : "match_denied",
                                    text: request.status_is_accepted? ? "Match request to class #{request.skill_class.title} accepted!" 
                                        : "Match request to class #{request.skill_class.title} denied."
                            }

                            notification = Notification.new(data)

                            if not notification.save
                                error = {"error": notification.errors.full_messages}
                                render(json: error, status: 500)
                                return
                            end

                            if request.status_is_accepted?
                                #request was accepted so connection must be created
                                connection = Connection.new(match_id: request.id)

                                if not connection.save
                                    error = {"error": connection.errors.full_messages}
                                    render(json: error, status: 500)
                                    return
                                end
                            end

                        end

                        res = {"request": request.as_json(only: [:id, :status])}
                        render(json: res)
                    else
                        error = {"error": request.errors.full_messages}
                        render(json: error, status: 400)
                    end

                else
                    error = {"error": "Match request has already been updated"}
                    render(json: error, status: 400)
                end


            else
                error = {"error": "Match request with that id does not exist"}
                render(json: error, status: 400)
            end

        else
            error = {"error": "User must be authenticated"}
            render(json: error, status: 401)
        end

    end

end