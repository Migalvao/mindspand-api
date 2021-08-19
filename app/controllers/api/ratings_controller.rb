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
        res = { "review": review.as_json(only: %i[id rating comment]) }
        render(json: res)

      else
        render_json_400(review.errors.full_messages)

      end
    end

    private

    def check_connection
      @connection = Connection.find_by(id: params[:id])

      if @connection

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

      else
        render_json_400('Connection with that id does not exist')

      end
    end

    def render_json_400(message)
      error = { "error": message }
      render(json: error, status: 400)
    end
  end
end
