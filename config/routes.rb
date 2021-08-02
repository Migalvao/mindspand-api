Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "accounts#get_login"

  ## API
  get '/api/username/:username', to: 'api/utils#check_username', as: 'check_username'  #Check username
  get '/api/skills/', to: 'api/utils#get_all_skills', as: 'get_all_skills'  #Fetch skills and categories
  get '/api/users/', to: 'api/utils#get_all_users', as: 'get_all_users'  #Fetch all users

  #Classes
  get '/api/classes', to: 'api/classes#get_classes', as: 'get_classes'
  post '/api/users/:id/classes', to: 'api/classes#post_class', as: 'post_class'
  get '/api/users/:id/classes', to: 'api/classes#get_user_classes', as: 'get_user_classes'


  
  ## FRONTEND

  #Signup
  get '/signup', to: 'accounts#get_signup', as: 'get_signup'
  post '/signup', to: 'accounts#post_signup', as: 'post_signup'

  #login
  get '/login', to: 'accounts#get_login', as: 'get_login'
  post '/login', to: 'accounts#post_login', as: 'post_login'

  #logout
  delete '/logout', to: 'accounts#logout', as: 'logout'

  #home
  get '/', to: 'test#home', as: 'home'
  get '/home', to: 'test#home'

  #profile
  get '/users/:id', to: 'accounts#get_profile', as: 'get_profile'  #Profile
  put '/users/:id', to: 'accounts#update_profile', as: 'update_profile'  #Edit Profile
  get '/users/:id/edit', to: 'accounts#get_edit_profile', as: 'get_edit_profile'  #Get Edit Profile

end
