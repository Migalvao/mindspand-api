# == Schema Information
#
# Table name: reviews
#
#  id              :bigint           not null, primary key
#  rating          :integer
#  comment         :text
#  student_teacher :boolean
#  connection_id   :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Review < ApplicationRecord
  MINIMUM_REVIEW_VALUE = 1
  MAXIMUM_REVIEW_VALUE = 5
  belongs_to :connection

  validates :student_teacher, presence: true #(TRUE IS STUDENT AND FALSE IS TEACHER)
  validates :rating, presence: true, numericality: { greater_than_or_equal_to: MINIMUM_REVIEW_VALUE, less_than_or_equal_to: MAXIMUM_REVIEW_VALUE }
end
