# == Schema Information
#
# Table name: match_requests
#
#  id                :bigint           not null, primary key
#  response_datetime :datetime
#  status            :integer          default("pending")
#  student_id        :bigint           not null
#  class_id          :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
require "test_helper"

class MatchRequestTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
