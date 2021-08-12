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

    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: "invalid" }

    DEFAULT_AVATAR_URL = "https://ik.imagekit.io/skillx/default_HQ9dhWQdf.jpg?updatedAt=1628589479298"

    def avatar_url
        if self.avatar.url != ""
            return self.avatar.url
        else
            return DEFAULT_AVATAR_URL
        end
    end
end
