# frozen_string_literal: true

class TestController < ApplicationController
  include AuthenticationConcern

  def home
    if @current_user
      render(inertia: 'Home', props: { "current_user": @current_user.as_json })
    else
      render(inertia: 'Home')
    end
  end

  def classes
    if @current_user
      render(inertia: 'Classes', props: { "current_user": @current_user.as_json })
    else
      redirect_to '/login'
    end
  end
end

class TestController < ApplicationController
  include AuthenticationConcern

  def home
    if @current_user
      render(inertia: 'Home', props: { "current_user": @current_user.as_json })
    else
      redirect_to '/login'
    end
  end

  def index
    puts SKILLS
    # puts SKILLS["1"]

    res = { 'success' => 'Article was successfully deleted' }
    render(json: res)
  end
end
