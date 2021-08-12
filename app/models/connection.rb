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
class Connection < ApplicationRecord
  belongs_to :match, class_name: 'MatchRequest', foreign_key: 'match_id'

  has_many :reviews

  # class status [in progress, given, cancelled]
  enum class_status: {
    in_progress: 0,
    given: 1,
    cancelled: 2,
  }

  # person_closed_connection [class_open, student closed, teacher closed]
  enum person_closed_connection: {
    class_open: 0,
    student_closed: 1,
    teacher_closed: 2,
  }

end
