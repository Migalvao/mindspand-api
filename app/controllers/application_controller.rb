# frozen_string_literal: true

class ApplicationController < ActionController::Base
  private

  def check_authenticated_user
    redirect_to '/login' unless @current_user
  end
end
