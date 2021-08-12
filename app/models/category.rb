# == Schema Information
#
# Table name: categories
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  color      :string           default("")
#
class Category < ApplicationRecord
    has_many :skills

    validates :name, presence: true, uniqueness: true
    validates :color, presence: true
end
