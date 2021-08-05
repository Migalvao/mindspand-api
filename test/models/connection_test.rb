# == Schema Information
#
# Table name: connections
#
#  id                       :bigint           not null, primary key
#  ended_at                 :datetime
#  class_status             :integer          default("in_progress")
#  person_closed_connection :integer          default("class_open")
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
