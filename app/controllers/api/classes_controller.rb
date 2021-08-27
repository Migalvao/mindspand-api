# frozen_string_literal: true

module Api
  class ClassesController < ApiController
    include AuthenticationConcern

    before_action :check_class, only: [:update_class, :delete_class]
  
    
    def post_class
      if @current_user
        filtered_params = class_params
        filtered_params[:teacher] = @current_user

        new_class = SkillClass.new(filtered_params)

        if new_class.save
          # success
          res = new_class.as_json(
            only: %i[id title description no_classes class_duration method regime
                     location], include: { skill: { only: %i[id name] }, teacher: { only: %i[id username name] } }
          )
          render(json: res)
        else
          res = { 'error' => new_class.errors }
          render(json: res, status: 400)
        end
      else
        error = { "error": 'User must be authenticated' }
        render(json: error, status: 401)
      end
    end

    def get_classes
      if @current_user
        classes = SkillClass.visible_to_all.where(class_params())
        classes = classes.as_json(
          only: %i[id title description no_classes class_duration method regime
                   location], include: { skill: { only: %i[id name] }, teacher: { only: %i[id username name] } }
        )
        render(json: classes)
      else
        error = { "error": 'User must be authenticated' }
        render(json: error, status: 401)
      end
    end

    def get_new_classes
      # Classes created up to a week ago
      if @current_user
        classes = SkillClass.visible_to_all.where("created_at >= ?", 1.week.ago).where(class_params())
        classes = classes.as_json(
          only: %i[id title description no_classes class_duration method regime
                   location], include: { skill: { only: %i[id name] }, teacher: { only: %i[id username name] } }
        )
        render(json: classes)
      else
        error = { "error": 'User must be authenticated' }
        render(json: error, status: 401)
      end
    end

    def get_user_classes
      if @current_user

        classes = if @current_user.id == params[:id].to_i
                    # own classes, show all classes
                classes = SkillClass.visible_to_own_user.where(teacher: params[:id])
                  else
                    # someone else's classes, only show those not archived
                classes = SkillClass.visible_to_all.where(teacher: params[:id])
                  end

        classes = classes.as_json(
          only: %i[id title description no_classes class_duration method regime
                   location], include: { skill: { only: %i[id name] }, teacher: { only: %i[id username name] } }
        )
        render(json: classes)
      else
        error = { "error": 'User must be authenticated' }
        render(json: error, status: 401)
      end
    end

    def get_single_class
      if @current_user

        c = SkillClass.visible_to_all.find_by(id: params[:id])

        if c

          class_json = c.as_json(
            only: %i[id title description no_classes class_duration method regime
                     location], include: { skill: { only: %i[id name] }, teacher: { only: %i[id username name] } }
          )
          render(json: class_json)
        else

          error = { "error": 'Class not found' }
          render(json: error, status: 404)
        end

      else
        error = { "error": 'User must be authenticated' }
        render(json: error, status: 401)
      end
    end

    def update_class

        begin
            if @skill_class.update(edit_class_params())
                c = @skill_class.as_json(only: [:id, :title, :description, :no_classes, :class_duration, :method, :regime, :location], 
                                        include: {skill: { only: [:id, :name]}, 
                                                teacher: {only: [:id, :username, :name]}})
                render(json: c)
            else

                render_json_400(@skill_class.errors.full_messages)
            end
        rescue
            render_json_400("Method or regime is not valid")
        end
    end

    def delete_class
        open_connections = Connection.where(class_status: "in_progress", match_id: MatchRequest.where(skill_class_id: @skill_class.id))
        
        if open_connections.empty?
            # we can delete the class
            @skill_class.update(deleted: true)

            res = {"success": "Class was deleted successfully"}
            render(json: res)

        else
            # There are open connections so class can't be closed
            render_json_400("Class can't be deleted because there are open connections to it")
        end
    end

    private
    def check_class
        @skill_class = SkillClass.visible_to_all.find_by(id: params[:class_id])

        return render_json_400("Class with that id was not found") unless @skill_class
        
        return render_json_400("Class doesn't belong to you") if @skill_class.teacher_id != @current_user.id
    end

    private
    def edit_class_params
        #filters parameters
      params.permit(:title, :description, :no_classes, :class_duration, :method, :difficulty, :regime, :location, :archived)
    end

    private

    def class_params
      # filters parameters
      params.permit(:title, :description, :no_classes, :class_duration, :method, :difficulty, :regime, :location,
                    :skill_id)
    end
  end
end
