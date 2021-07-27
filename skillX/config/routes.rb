Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "test#index"

  #API
  get '/username/:username', to: 'api/accounts#check_username', as: 'check_username'  #Check username

  
  #FRONTEND

  #Signup
  get '/signup', to: 'accounts#get_signup', as: 'get_signup'
  post '/signup', to: 'accounts#post_signup', as: 'post_signup'

end
