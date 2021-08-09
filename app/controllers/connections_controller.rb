class ConnectionsController < ApplicationController
    include AuthenticationConcern
    before_action :check_authenticated_user
    after_action :update_unread_notifications, only: :get_notifications

    def get_connections
        
        # connections where user a student
        student_connections = Connection.where(match_id: MatchRequest.where(student_id: @current_user.id), class_status: "in_progress").order(created_at: :desc)
        # connections where user is a teacher
        teacher_connections = Connection.where(match_id: MatchRequest.where(skill_class_id: SkillClass.where(teacher_id: @current_user.id)), class_status: "in_progress").order(created_at: :desc)

        # json payload should contain information about the other person, so should contain info about the user
        # when user is a student and vice-versa
        s_c_json = student_connections.as_json(only: [:id, :created_at], include: { match: { only: [:id, :status], include: {skill_class: { only: [:id], include: {teacher: {only: [:id, :username, :name]}}}}}})
        t_c_json = teacher_connections.as_json(only: [:id, :created_at], include: { match: { only: [:id, :status], include: {student: { only: [:id, :username, :name]}}}})
    
        user_json = @current_user.as_json(only: [:id, :name, :username])

        render(inertia: 'Connections', props: {"current_user": user_json, "student": s_c_json, "teacher": t_c_json})

    end

    def get_notifications
        @unread_notifications = Notification.where(person_id: @current_user.id, read: false).order(created_at: :desc)
        u_n_json = @unread_notifications.as_json(only: [:id, :text, :notification_type, :created_at], include: {match: { only: [:id, :student_id, :status], include: {connection: {only: [:id, :class_status]}}}})
        read_notifications = Notification.where(person_id: @current_user.id, read: true).order(created_at: :desc).as_json(only: [:id, :text, :notification_type, :created_at], include: {match: { only: [:id, :student_id, :status], include: {connection: {only: [:id, :class_status]}}}})

        notifications = {"read": read_notifications, "unread": u_n_json}
        user_json = @current_user.as_json(only: [:id, :name, :username])

        render(inertia: 'Notifications', props: {"current_user": user_json, "notifications": notifications})
    end

    private 
    def check_authenticated_user
        unless @current_user
            redirect_to '/login'
        end
    end

    private
    def update_unread_notifications
        # only informative notifications should be marked read
        @unread_notifications.where(notification_type: ["match_accepted", "match_denied"]).update_all(read: true)

    end

end