class Api::ClassesController < ApplicationController
    include AuthenticationConcern
  
    def post_class

        if @current_user
            filtered_params = class_params
            filtered_params[:teacher] = @current_user

            new_class = SkillClass.new(filtered_params)
        
            if new_class.save
                # success
                res = new_class.as_json(only: [:id, :title, :description, :no_classes, :class_duration, :method, :regime, :location], include: {skill: { only: [:id, :name]}, teacher: {only: [:id, :username, :name]}})
                render(json: res)
            else
                res = {"error" => new_class.errors}
                render(json: res, status: 400)
            end
        else
            error = {"error": "User must be authenticated"}
            render(json: error, status: 401)
        end

    end

    def get_classes
        if @current_user
            # TODO filters
            classes = SkillClass.where(archived: false).where(class_params())
            classes = classes.as_json(only: [:id, :title, :description, :no_classes, :class_duration, :method, :regime, :location], include: {skill: { only: [:id, :name]}, teacher: {only: [:id, :username, :name]}})
            render(json: classes)
        else
            error = {"error": "User must be authenticated"}
            render(json: error, status: 401)
        end
    end

    def get_new_classes
        # Classes created up to a week ago
        if @current_user
            classes = SkillClass.where(archived: false).where("created_at >= ?", 1.week.ago)
            classes = classes.as_json(only: [:id, :title, :description, :no_classes, :class_duration, :method, :regime, :location], include: {skill: { only: [:id, :name]}, teacher: {only: [:id, :username, :name]}})
            render(json: classes)
        else
            error = {"error": "User must be authenticated"}
            render(json: error, status: 401)
        end
    end
  
    def get_user_classes
        if @current_user

            if @current_user.id == params[:id].to_i
                #own classes, show all classes
                classes = SkillClass.where(teacher: params[:id])
            else
                #someone else's classes, only show those not archived
                classes = SkillClass.where(teacher: params[:id], archived: false)
            end
            
            classes = classes.as_json(only: [:id, :title, :description, :no_classes, :class_duration, :method, :regime, :location], include: {skill: { only: [:id, :name]}, teacher: {only: [:id, :username, :name]}})
            render(json: classes)
        else
            error = {"error": "User must be authenticated"}
            render(json: error, status: 401)
        end
    end

    def get_single_class
        if @current_user

            c = SkillClass.find_by(id: params[:id])

            if c

                class_json = c.as_json(only: [:id, :title, :description, :no_classes, :class_duration, :method, :regime, :location], include: {skill: { only: [:id, :name]}, teacher: {only: [:id, :username, :name]}})
                render(json: class_json)
            else
                
                error = {"error": "Class not found"}
                render(json: error, status: 404)
            end

        else
            error = {"error": "User must be authenticated"}
            render(json: error, status: 401)
        end
    end

    private
    def class_params
        #filters parameters
      params.permit(:title, :description, :no_classes, :class_duration, :method, :difficulty, :regime, :location, :skill_id)
    end

end