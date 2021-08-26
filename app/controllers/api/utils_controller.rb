# frozen_string_literal: true

module Api
  class UtilsController < ApiController
    # include AuthenticationConcern

  def check_username
      username = params['username']

      res = if User.where(username: username).exists?
              { 'unavailable' => 'Username is unavailable' }
            else
              { 'available' => 'Username is available' }
            end

      render(json: res)
    end

    def get_all_skills
      categories = Category.all.order(:name)
      skills = categories.as_json(only: %i[id name color], include: { skills: { only: %i[id name] } })

      render(json: skills)
    end

    def get_all_users
      users = User.all
      users_json = users.as_json(only: %i[id name username description])

      render(json: users_json)
    end
  end
end
