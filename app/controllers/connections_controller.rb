# frozen_string_literal: true

class ConnectionsController < ApplicationController
  include AuthenticationConcern
  before_action :check_authenticated_user
  after_action :update_unread_notifications, only: :get_notifications

  def get_connections
    # connections where user a student
    student_connections = Connection.where(match_id: MatchRequest.where(student_id: @current_user.id),
                                           class_status: 'in_progress').order(created_at: :desc)
    # connections where user is a teacher
    teacher_connections = Connection.where(
      match_id: MatchRequest.where(skill_class_id: SkillClass.visible_to_all.where(teacher_id: @current_user.id)), class_status: 'in_progress'
    ).order(created_at: :desc)

    # json payload should contain information about the other person, so should contain info about the user
    # when user is a student and vice-versa
    s_c_json = student_connections.as_json(only: %i[id created_at],
                                           include: { match: { only: %i[id status],
                                                               include: { skill_class: {
                                                                 only: [:id], include: { teacher: { only: %i[id
                                                                                                             username name] } }
                                                               } } } })
    t_c_json = teacher_connections.as_json(only: %i[id created_at],
                                           include: { match: {
                                             only: %i[id status], include: { student: { only: %i[id username name] } }
                                           } })

    user_json = @current_user.as_json(only: %i[id name username])

    render(inertia: 'Connections', props: { "current_user": user_json, "student": s_c_json, "teacher": t_c_json })
  end

  def get_notifications
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
    user_json = @current_user.as_json(only: %i[id name username])

    render(inertia: 'Notifications', props: { "current_user": user_json, "notifications": notifications })
  end

  private

  def update_unread_notifications
    # only informative notifications should be marked read
    # @unread_notifications.where(notification_type: %w[match_accepted match_denied]).update_all(read: true)
  end
end
