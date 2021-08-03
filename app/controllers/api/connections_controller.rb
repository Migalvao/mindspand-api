class Api::ConnectionsController < ApplicationController
    include AuthenticationConcern

    def request_match

        if @current_user

            request = MatchRequest.new
            request.student_id = @current_user.id

            if SkillClass.find_by(id: params[:id])
                #check if class exists
                request.class_id = params[:id]

                if MatchRequest.find_by(student_id: @current_user.id, class_id: params[:id])
                    #check if request already exists
                    error = {"error": "Match request already exists"}
                    render(json: error, status: 400)
                    return
                end

                if request.save
                    #success
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

end