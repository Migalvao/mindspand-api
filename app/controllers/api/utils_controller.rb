class Api::UtilsController < ApiController
  #include AuthenticationConcern
  
  def check_username
    username = params["username"]

    if User.where(username: username).exists?
      res = {"unavailable" => "Username is unavailable"}
    else 
      res = {"available" => "Username is available"}
    end

    render(json: res)
  end

  def get_all_skills

    categories = Category.all
    skills = categories.as_json(only: [:id, :name, :color], include: {skills: { only: [:id, :name]}})

    render(json: skills)

  end

  def get_all_users

    users = User.all
    users_json = users.as_json(only: [:id, :name, :username, :description])

    render(json: users_json)

  end

end