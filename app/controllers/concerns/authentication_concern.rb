# frozen_string_literal: true

module AuthenticationConcern
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user
  end

  def set_current_user
    if session['user_id'] && (user = User.find_by(id: session['user_id']))
      @current_user = user
    end
  end
end
