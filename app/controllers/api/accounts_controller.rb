class Api::AccountsController < ApplicationController
    protect_from_forgery with: :null_session
  
    def check_username
      username = params["username"]

      if User.where(username: username).exists?
        res = {"unavailable" => "Username is unavailable"}
      else 
        res = {"available" => "Username is available"}
      end

      render(json: res)
    end


end