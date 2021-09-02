# frozen_string_literal: true

class UserNotifications < ApplicationService
    def initialize(user)
      @current_user = user
    end
  
    def get
      request_notifications = Notification.where(person_id: @current_user.id, notification_type: "received_request", read: false).order(created_at: :desc)
      requests_json = request_notifications.as_json(only: %i[id text notification_type created_at],
                                                    include: { match: {
                                                      only: %i[id status], include: { connection: { only: %i[id class_status] } , student: { only: %i[id avatar username] },
                                                      skill_class: { only: %i[title], include: { teacher: {only: %i[id avatar] } } } }
                                                    } })
  
      other_notifications = Notification.where(person_id: @current_user.id).where.not(notification_type: "received_request")
      past_request_notifications = Notification.where(person_id: @current_user.id, notification_type: "received_request", read: true)
  
      regular_notifications = other_notifications.or(past_request_notifications).order(created_at: :desc).as_json(
          only: %i[id text notification_type
                  created_at], include: { match: { only: %i[id student_id status], include: { connection: { only: %i[id class_status person_closed_connection] }, 
                                                                                            student: { only: %i[id avatar username] }, 
                                                                                            skill_class: { only: %i[title], include: { teacher: {only: %i[id avatar] } } }
                                                                                            } } }
        )
  
      notifications = { "regular": regular_notifications, "requests": requests_json }
    end
  end
  