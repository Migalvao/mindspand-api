class ApiController < ActionController::Base

    private 
    def check_authenticated_user
        unless @current_user
            error = {"error": "User must be authenticated"}
            render(json: error, status: 401)
        end
    end
end
