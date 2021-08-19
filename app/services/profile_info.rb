# frozen_string_literal: true

class ProfileInfo < ApplicationService
  def initialize(user)
    @user = user
  end

  def get
    student_reviews = Review.where(student_teacher: true,
                                   connection_id: Connection.where(match_id: MatchRequest.where(student_id: @user.id)))
    teacher_reviews = Review.where(student_teacher: false,
                                   connection_id: Connection.where(match_id: MatchRequest.where(skill_class_id: SkillClass.where(teacher_id: @user.id))))

    # student_reviews = Review.joins(connections: {matches: {student_id: @user.id}})
    # teacher_reviews = Review.joins(connections: {matches: {skill_classes: {teacher_id: @user.id}}})

    total_reviews = student_reviews.or(teacher_reviews)
    avg_rating = total_reviews.average(:rating).to_f.round(1) # only one decimal case

    user_json = @user.as_json(only: %i[id name username description avatar])

    user_json['rating'] = avg_rating

    user_json
  end
end
