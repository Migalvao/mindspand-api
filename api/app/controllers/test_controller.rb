class TestController < ApplicationController
    protect_from_forgery with: :null_session
  
    def index

        puts SKILLS
        puts SKILLS["1"]

        res = {"success" => "Article was successfully deleted"}
        render(:json => res)
    end
end