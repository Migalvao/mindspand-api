# frozen_string_literal: true

class ApiController < ActionController::API
  private

  def check_authenticated_user
    unless @current_user
      error = { "error": 'User must be authenticated' }
      render(json: error, status: 401)
    end
  end

  private
  def render_json_400(message)
      error = {"error": message}
      render(json: error, status: 400)
  end

  private
  def render_json_500(message)
      error = {"error": message}
      render(json: error, status: 500)
  end
end
