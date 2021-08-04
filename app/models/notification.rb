# == Schema Information
#
# Table name: notifications
#
#  id                :bigint           not null, primary key
#  text              :text
#  read              :boolean          default(FALSE)
#  notification_type :integer
#  person_id         :bigint           not null
#  match_id          :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class Notification < ApplicationRecord
    belongs_to :person, class_name: 'User', foreign_key: 'person_id'
    belongs_to :match, class_name: 'MatchRequest', foreign_key: 'match_id'

    # notification_type [received request, match accepted, match denied, connection closed]
    enum notification_type: {
        received_request: 0,
        match_accepted: 1,
        match_denied: 2,
        connection_closed: 3
    }
    
    validates :notification_type, :text, presence: true

end
