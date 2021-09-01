# frozen_string_literal: true

module Api
  class ConnectionsController < ApiController
    include AuthenticationConcern
    before_action :check_authenticated_user
    before_action :check_class_exists, only: :request_match
    before_action :check_request_exists, only: :update_match
    before_action :check_connection, only: :update_connection
    after_action :update_unread_notifications, only: :get_notifications

    def request_match
      request = MatchRequest.new(student_id: @current_user.id, skill_class_id: params[:id])

      most_recent_request = MatchRequest.where(student_id: @current_user.id,
                                               skill_class_id: params[:id]).order(created_at: :desc).first

      if most_recent_request&.status_is_pending?
        # check if pending request already exists
        error = { "error": 'Match request already exists' }
        render(json: error, status: 400)

      elsif most_recent_request && Connection.find_by(match_id: most_recent_request.id, class_status: 'in_progress')
        # check if connection already exists
        error = { "error": 'Connection to this class already exists' }
        render(json: error, status: 400)

      elsif request.save
        # success

        # create respective notification for the teacher
        data = { match_id: request.id, person_id: request.skill_class.teacher.id, notification_type: 'received_request',
                 text: "#{@current_user.username} wants to have a class with you!" }
        notification = Notification.new(data)

        if notification.save
          res = { "request": request.as_json(only: %i[id status]) }
          render(json: res)

        else
          error = { "error": notification.errors.full_messages }
          render(json: error, status: 500)
        end

      else
        error = { "error": request.errors.full_messages }
        render(json: error, status: 400)
      end
    end

    def update_match
      if @request.status_is_pending?

        begin
          @request.status = params[:status]
        rescue StandardError
          return render_json_400('Updated status is invalid')
        end

        if @request.status_is_pending?
          return render_json_400("Can't update request to pending")

        elsif @request.status_is_cancelled? && (@request.student_id != @current_user.id)
          return render_json_400('Only the student can cancel the match request')

        elsif (@request.status_is_refused? || @request.status_is_accepted?) && (@request.skill_class.teacher_id != @current_user.id)
          return render_json_400('Only the teacher can answer the match request')

        end

        # valid update
        @request.response_datetime = Time.new

        if @request.save
          if @request.status_is_cancelled?
            # if request was cancelled, we need to delete the notification
            notification = Notification.find_by(match_id: @request.id)
            notification.destroy

          else
            # if request was answered, we need to create a new notification for the answer

            data = { match_id: @request.id, person_id: @request.student_id,
                     notification_type: @request.status_is_accepted? ? 'match_accepted' : 'match_denied',
                     text: if @request.status_is_accepted?
                             "#{@request.skill_class.teacher.username} accepted your request."
                           else
                             "#{@request.skill_class.teacher.username} refused your request."
                           end }

            notification = Notification.new(data)

            unless notification.save
              error = { "error": notification.errors.full_messages }
              return render(json: error, status: 500)
            end

            own_notification = Notification.find_by(match_id: @request.id, person_id: @current_user.id, notification_type: "received_request")

            if @request.status_is_accepted?
              #request was accepted so connection must be created
              connection = Connection.new(match_id: @request.id)

              if not connection.save
                  error = {"error": connection.errors.full_messages}
                  render(json: error, status: 500)
                  return
              end

              # We need to mark the own user's notification as read, should there be one
              if own_notification and ! own_notification.update(read: true, text: "You accepted #{@request.student.username} request")
                  return render_json_500(own_notification.errors.full_messages)
              end
            
            else
              # request was refused so we delete the notification
              own_notification.destroy

            end
          end

          res = { "request": @request.as_json(only: %i[id status]) }
          render(json: res)
        else
          render_json_400(@request.errors.full_messages)
        end

      else
        render_json_400('Match request has already been updated')
      end
    end

    def update_connection
      if @connection.in_progress?

        begin
          @connection.class_status = params[:status]
        rescue StandardError
          return render_json_400('Updated status is invalid')
        end

        return render_json_400('Updated status is invalid') if @connection.in_progress?

        # Valid request

        @connection.person_closed_connection = if @is_student
                                                 'student_closed'
                                               else
                                                 'teacher_closed'
                                               end

        @connection.ended_at = Time.new

        if @connection.save
          # connection updated successfully, now we need to notify the other user

          skill_class = @connection.match.skill_class

          text = if @connection.given?
                   " ended the class!\nGive your feedback!"
                 else
                   " ended the class!"
                 end


          if @is_student
            # create notification for the teacher
            notification = Notification.new({ text: @connection.match.student.username + text, notification_type: 'connection_closed',
                                              match_id: @connection.match_id, person_id: skill_class.teacher_id })
          else
            # create notification for the student
            notification = Notification.new({ text: skill_class.teacher.username + text, notification_type: 'connection_closed',
                                              match_id: @connection.match_id, person_id: @connection.match.student_id })
          end

          unless notification.save
            error = { "error": notification.errors.full_messages }
            return render(json: error, status: 500)
          end

          res = @connection.as_json(only: %i[id created_at ended_at class_status])
          render(json: res)

        else
          render_json_400(@connection.errors.full_messages)
        end

      else
        render_json_400('Connection has already been closed')
      end
    end

    def get_notifications
      request_notifications = Notification.where(person_id: @current_user.id, notification_type: "received_request", read: false).order(created_at: :desc)
      requests_json = request_notifications.as_json(only: %i[id text notification_type created_at],
                                                    include: { match: {
                                                      only: %i[id status], include: { connection: { only: %i[id class_status] } , student: { only: %i[id avatar] },
                                                      skill_class: { only: %i[title], include: { teacher: {only: %i[id avatar] } } } }
                                                    } })
  
      other_notifications = Notification.where(person_id: @current_user.id).where.not(notification_type: "received_request")
      past_request_notifications = Notification.where(person_id: @current_user.id, notification_type: "received_request", read: true)
  
      regular_notifications = other_notifications.or(past_request_notifications).order(created_at: :desc).as_json(
          only: %i[id text notification_type
                  created_at], include: { match: { only: %i[id student_id status], include: { connection: { only: %i[id class_status person_closed_connection] }, 
                                                                                            student: { only: %i[id avatar] }, 
                                                                                            skill_class: { only: %i[title], include: { teacher: {only: %i[id avatar] } } }
                                                                                            } } }
        )
  
      notifications = { "regular": regular_notifications, "requests": requests_json }

      render(json: {"notifications": notifications })
    end

    private

    def check_class_exists
      unless SkillClass.visible_to_all.find_by(id: params[:id])
        error = { "error": 'Class with that id does not exist' }
        render(json: error, status: 400)
      end
    end

    def check_request_exists
      @request = MatchRequest.find_by(id: params[:id])

      unless @request
        error = { "error": 'Match request with that id does not exist' }
        render(json: error, status: 400)
      end
    end

    def check_connection
      @connection = Connection.find_by(id: params[:id])

      return render_json_400('Connection with that id does not exist') unless @connection

      if @connection.match.student_id == @current_user.id
        # Student is closing the connection
        @is_student = true

      elsif @connection.match.skill_class.teacher_id == @current_user.id
        # Teacher is closing the connection
        @is_student = false

      else
        # Unauthorized
        error = { "error": "Can't close other users' connections" }
        render(json: error, status: 401)
      end
    end

    private
    def update_unread_notifications
      # only informative notifications should be marked read
      # @unread_notifications.where(notification_type: %w[match_accepted match_denied]).update_all(read: true)
    end
  end
end
