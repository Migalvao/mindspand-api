# frozen_string_literal: true

class AccountsController < ApplicationController
  # protect_from_forgery with: :null_session
  include AuthenticationConcern

  before_action :check_authenticated_user, only: %i[get_upload_avatar update_avatar get_profile]

  def get_signup
    render(inertia: 'Signup')
  end

  def post_signup
    user = User.new(signup_params)

    if user.save
      redirect_to index
    else
      res = { 'errors' => user.errors }
      render(json: res)
    end
  end

  def get_login
    if @current_user
      redirect_to '/home'
    else
      render(inertia: 'Login')
    end
  end

  def post_login
    user = User.find_by(username: params['username'])

    user ||= User.find_by(email: params['username'])

    if user
      if user.authenticate(params['password'])
        # sucess
        session['user_id'] = user.id
        redirect_to '/home'

      else
        error = { 'error' => 'Wrong password' }
        render(inertia: 'Login', props: error, status: 401)
      end

    else
      # User not found
      error = { 'error' => 'User not found' }
      render(inertia: 'Login', props: error, status: 404)
    end
  end

  def logout
    session['user_id'] = nil
    redirect_to '/login'
  end

  def get_profile
    user = User.find_by(id: params[:id].to_i)

    unless user
      render(inertia: 'NotFound')
      return
    end

    user_json = ProfileInfo.new(user).get

    res = { "can_edit": @current_user.id == user.id, "user": user_json }

    render(inertia: 'Profile', props: res)
  end

  def get_edit_profile
    if @current_user
      user = User.find_by(id: params[:id].to_i)

      unless user
        render(inertia: 'NotFound')
        return
      end

      if @current_user.id == user.id
        # own profile, can edit
        user_json = user.as_json(only: %i[id name username email description])
        render(inertia: 'EditProfile', props: { "user": user_json })

      else
        # not own profile, can't edit
        user_json = user.as_json(only: %i[id name username description])
        res = { "can_edit": false, "user": user_json }

        redirect_to("/users/#{user.id}")
      end

    else
      render(inertia: 'Login')
    end
  end

  def get_upload_avatar
    user_json = @current_user.as_json(only: %i[id name username description])
    render(inertia: 'AvatarUpload', props: { "user": user_json, "curent_avatar": @current_user.avatar_url })
  end

  def update_avatar
    begin
      @current_user.update(avatar: params[:avatar])
    rescue StandardError
    end

    redirect_to "/users/#{@current_user.id}/avatar"
  end

  def update_profile
    if @current_user
      user = User.find_by(id: params[:id].to_i)

      unless user
        render(inertia: 'NotFound')
        return
      end

      puts params

      if @current_user.id == user.id
        # own profile, can edit

        if user.update(signup_params)

          redirect_to("/users/#{user.id}")

        else

          user_json = user.as_json(only: %i[id name username email description])
          render(inertia: 'EditProfile', props: { "error": user.errors.full_messages, "user": user_json })

        end

      else
        # not own profile, can't edit
        user_json = user.as_json(only: %i[id name username description])
        res = { "can_edit": false, "user": user }

        redirect_to("/users/#{user.id}")
      end
    else
      render(inertia: 'Login')
    end
  end

  private

  def signup_params
    # filters parameters
    params.permit(:name, :username, :email, :password, :description)
  end

  def check_authenticated_user
    unless @current_user
      redirect_to '/login'
      nil
    end
  end
end
