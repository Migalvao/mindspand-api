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
require "test_helper"

class ReviewTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
