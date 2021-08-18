class ApplicationController < ActionController::Base

    private 
    def check_authenticated_user
        unless @current_user
            redirect_to '/login'
        end
    end
end
