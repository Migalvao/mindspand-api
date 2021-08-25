require 'rails_helper'
require_relative 'helper'
include Helper

RSpec.describe 'Connection', type: :request do
    before(:all) { default_login }

    it 'request' do
        user_data = { username: 'new_user', name: 'New User', email: 'new@whitesmith.co', password: 'password' }.as_json
        new_user = User.create(user_data)

        log_in(user_data["username"], user_data["password"])

        post '/api/classes/1/request'
        
        expect(response).to have_http_status(200) 
        body = JSON.parse(response.body)

        expect(body['request']).to be

    end

    it 'notification' do

        default_login

        get '/api/notifications'

        expect(response).to have_http_status(200) 
        notifications = JSON.parse(response.body)

        expect(notifications['unread'].length).to eq(1) # check that there is 1 notification
        expect(notifications['unread'].first['notification_type']).to eq('received_request')

    end

    it 'answer request' do

        data = { status: 'accepted' }
        put '/api/match_request/1/', params: data
        
        expect(response).to have_http_status(200) 
        body = JSON.parse(response.body)

        expect(body['request']).to be

    end

    it 'exists' do

        data = { status: 'accepted' }
        get '/connections'

        expect(response).to have_http_status(200) 
        connections = Connection.all

        expect(connections.length).to eq(1) # check that there is 1 connection

    end

    it 'end' do

        data = { status: 'given'}
        put '/api/connections/1/', params: data

        expect(response).to have_http_status(200) 
        connection = Connection.first

        expect(connection.class_status).to eq('given') # check that connection is closed
        expect(connection.person_closed_connection).to eq('teacher_closed') # check that connection was closed by the teacher

    end

    it 'review' do
        data = { rating: 5, comment: 'Sample text' }
        post '/api/connections/1/rate', params: data

        expect(response).to have_http_status(200) 
        review = Review.first

        expect(review.rating).to eq(5) 
        expect(review.comment).to eq('Sample text') 
    end

end