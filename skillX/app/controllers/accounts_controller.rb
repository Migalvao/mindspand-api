class AccountsController < ApplicationController
    protect_from_forgery with: :null_session
  
    def get_signup
      render "accounts/signup", status: 500
    end

    def post_signup

        puts params
        puts signup_params
        user = User.new(signup_params)
    
        if user.save
          redirect_to index
        else
          res = {"errors" => user.errors}
          render(:json => res)
        end

    end

    private
    def signup_params
        #filters parameters
      params.permit(:name, :username, :email, :password, :description)
    end
end