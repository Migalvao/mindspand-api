# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  name            :string
#  username        :string
#  email           :string
#  description     :text             default("")
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  avatar          :string
#
class User < ApplicationRecord
  has_many :skill_classes, foreign_key: 'teacher_id'
  has_many :match_requests, foreign_key: 'student_id'
  has_many :notifications, foreign_key: 'person_id'

  has_secure_password

  has_one_attached :avatar

  attr_accessor :avatar

  mount_uploader :avatar, AvatarUploader

  validates :name, presence: true
  validates :username, presence: true, uniqueness: true

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'invalid' }

  DEFAULT_AVATAR_URL = 'https://ik.imagekit.io/skillx/default_HQ9dhWQdf.jpg?updatedAt=1628589479298'

  def avatar_url
    if avatar.url != ''
      avatar.url
    else
      DEFAULT_AVATAR_URL
    end
  end

  def rating
    student_reviews = Review.where(student_teacher: true,
      connection_id: Connection.where(match_id: MatchRequest.where(student_id: id)))
    teacher_reviews = Review.where(student_teacher: false,
          connection_id: Connection.where(match_id: MatchRequest.where(skill_class_id: SkillClass.where(teacher_id: id))))

    # student_reviews = Review.joins(connections: {matches: {student_id: id}})
    # teacher_reviews = Review.joins(connections: {matches: {skill_classes: {teacher_id: id}}})

    total_reviews = student_reviews.or(teacher_reviews)
    avg_rating = total_reviews.average(:rating).to_f.round(1) # only one decimal case
  end
end
