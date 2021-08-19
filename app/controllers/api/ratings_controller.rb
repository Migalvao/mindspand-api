# frozen_string_literal: true

module Api
  class RatingsController < ApiController
    include AuthenticationConcern
    before_action :check_authenticated_user
    before_action :check_connection, only: :rate_class

    def rate_class
      review = Review.new(connection_id: @connection.id, student_teacher: @is_student, rating: params[:rating],
                          comment: params[:comment])

      if review.save

          # We need to mark the own user's notification as read, should there be one
          own_notification = Notification.find_by(match_id: @connection.match_id, person_id: @current_user.id, notification_type: "connection_closed")

          if own_notification and ! own_notification.update(read: true)
              return render_json_500(own_notification.errors.full_messages)
          end

          res = { "review": review.as_json(only: %i[id rating comment]) }
          render(json: res)

      else
        render_json_400(review.errors.full_messages)

      end
    end

    private

    def check_connection
      @connection = Connection.find_by(id: params[:id])

      if @connection.in_progress?
        render_json_400("Class can't be rated because it's still in progess")

      elsif @connection.cancelled?
        render_json_400("Class can't be rated because it's been cancelled")

      elsif @connection.match.student_id == @current_user.id

        if Review.where(connection_id: @connection.id, student_teacher: true).exists?
          render_json_400('You have already rated this class')
        end

        @is_student = true
        # User is the student, student_teacher = true

      elsif @connection.match.skill_class.teacher_id == @current_user.id
        # User is the teacher, student_teacher = false
        if Review.where(connection_id: @connection.id, student_teacher: false).exists?
          render_json_400('You have already rated this class')
        end

        @is_student = false

      else
        # User is neither student nor teacher
        render_json_400('You are not allowed to rate this class')
      end
    end
end
