# == Schema Information
#
# Table name: skill_classes
#
#  id             :bigint           not null, primary key
#  title          :string
#  description    :text
#  no_classes     :integer
#  class_duration :integer
#  method         :integer
#  difficulty     :integer
#  regime         :integer
#  location       :string
#  archived       :boolean          default(FALSE)
#  teacher_id     :bigint           not null
#  skill_id       :bigint           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  deleted        :boolean          default(FALSE)
#
class SkillClass < ApplicationRecord
  belongs_to :teacher, class_name: 'User', foreign_key: 'teacher_id'
  belongs_to :skill
  has_many :match_requests, foreign_key: 'class_id'

  scope :visible_to_all, -> { where(deleted: false, archived: false) }
  scope :visible_to_own_user, -> { where(deleted: false) }
  
  # method [synchronous, asynchronous, both]
  enum method: {
    synchronous: 0,
    asynchronous: 1,
    both: 2
  }

  # difficulty [beginner, intermediate, advanced]
  enum difficulty: {
    beginner: 0,
    intermediate: 1,
    advanced: 2
  }

  # regime [physical, remote, hybrid]
  enum regime: {
    physical: 0,
    remote: 1,
    hybrid: 2
  }

  validates :title, :no_classes, :class_duration, :method, :difficulty, :regime, presence: true
  validates :location, presence: true, unless: :method_is_remote?


  def method_is_remote?
    return regime == :remote.to_s
  end
end
