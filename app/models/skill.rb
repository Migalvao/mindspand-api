# == Schema Information
#
# Table name: skills
#
#  id          :bigint           not null, primary key
#  name        :string
#  category_id :bigint
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Skill < ApplicationRecord
    belongs_to :category
    has_many :skill_classes
    
    validates :name, presence: true, uniqueness: true
end
