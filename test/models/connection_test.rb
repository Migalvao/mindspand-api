# == Schema Information
#
# Table name: connections
#
#  id                       :bigint           not null, primary key
#  ended_at                 :datetime
#  class_status             :integer          default("class_open")
#  person_closed_connection :integer          default(0)
#  match_id                 :bigint           not null
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#
require "test_helper"

class ConnectionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
