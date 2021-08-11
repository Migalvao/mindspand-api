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
    
    validates :name, presence: true
    validates :username, presence: true, uniqueness: true

    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: "invalid" }

end
