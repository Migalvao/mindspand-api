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

  def get_single_class

    c = SkillClass.visible_to_all.find_by(id: params[:id])

    if c

      most_recent_request = MatchRequest.where(student_id: @current_user.id,
        skill_class_id: params[:id]).order(created_at: :desc).first

      if most_recent_request && most_recent_request.status_is_pending?
        request = { 'status': 'pending', 'match_id': most_recent_request.id }

      elsif most_recent_request && connection = Connection.find_by(match_id: most_recent_request.id, class_status: 'in_progress')
        request = { 'status': 'accepted' }

      else
        request = {}

      end
  

      class_json = c.as_json(
        only: %i[id title description no_classes class_duration method regime difficulty
                  location], include: { skill: { only: %i[id name], include: { category: { only: %i[id name color] } } }, teacher: { only: %i[id username name avatar], methods: :rating } }
      )
      render(inertia: 'SingleClass', props: { "current_user": @current_user.as_json, "class": class_json, "request": request })
    else

      error = { "error": 'Class not found' }
      render(inertia: 'NotFound', status: 404)
    end
  end
end
