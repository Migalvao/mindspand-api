Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "accounts#get_login"

  ## API
  get '/api/username/:username', to: 'api/utils#check_username', as: 'check_username'  #Check username
  get '/api/skills/', to: 'api/utils#get_all_skills', as: 'get_all_skills'  #Fetch skills and categories
  get '/api/users/', to: 'api/utils#get_all_users', as: 'get_all_users'  #Fetch all users

  #Classes
  get '/api/classes', to: 'api/classes#get_classes', as: 'get_classes'
  get '/api/classes/:id', to: 'api/classes#get_single_class', as: 'get_single_class'
  post '/api/users/:id/classes', to: 'api/classes#post_class', as: 'post_class'
  get '/api/users/:id/classes', to: 'api/classes#get_user_classes', as: 'get_user_classes'

  #Connections
  post '/api/classes/:id/request', to: 'api/connections#request_match', as: 'request_match'
  put '/api/match_request/:id/', to: 'api/connections#update_match', as: 'update_match' # Answer or cancel match request
  get '/api/notifications', to: 'api/connections#get_notifications', as: 'api_get_notifications'
  put '/api/connections/:id/', to: 'api/connections#update_connection', as: 'update_connection' # End connection

  #Ratings/reviews
  post '/api/connections/:id/rate', to: 'api/ratings#rate_class', as: 'rate_class'

  
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

  #connections
  get '/connections', to: 'connections#get_connections', as: 'get_connections'

  #notifications
  get '/notifications', to: 'connections#get_notifications', as: 'get_notifications'
  
  #avatar
  put '/users/:id/avatar', to: 'accounts#update_avatar', as: 'update_avatar'  # Update avatar
  get '/users/:id/avatar', to: 'accounts#get_upload_avatar', as: 'get_upload_avatar'  #Get upload avatar

end
