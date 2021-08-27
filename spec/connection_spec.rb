require 'rails_helper'
require_relative 'helper'
include Helper

RSpec.describe 'Connection', type: :request do
    let!(:skill) { create_skill }
    let!(:skill_class) { 
        create_skill
        user = create_default_user 
        default_login
        create_default_class
    }

    describe 'requesting match for a class' do
        subject(:request_match) do
            post request_match_path(skill_class)
        end

        before(:each) do
            
            new_user = create_user(SECOND_USER_DATA)
            log_in(SECOND_USER_DATA[:username], SECOND_USER_DATA[:password])
        end

        it 'returns a success status code' do

            request_match
            
            expect(response).to have_http_status(200) 
        end

    end

    describe 'fetching notifications' do
        subject(:fetch_notifications) do
            get api_get_notifications_path
        end

        context 'after a match request' do
            before(:each) do
                new_user = create_user(SECOND_USER_DATA)
                log_in(SECOND_USER_DATA[:username], SECOND_USER_DATA[:password])

                post request_match_path(skill_class)
            end

            it 'returns a single unread notification' do

                default_login

                fetch_notifications

                notifications = JSON.parse(response.body)

                expect(notifications['unread'].length).to eq(1) # check that there is 1 notification

            end

            it 'returns a notification of type \'received_request\'' do

                default_login

                fetch_notifications

                notifications = JSON.parse(response.body)

                expect(notifications['unread'].first['notification_type']).to eq('received_request')

            end
        end
    end

    describe 'answering match request' do
        subject(:answer_match_request) {
            put update_match_path(match_id), params: data
        }

        let!(:match_id) do
            new_user = create_user(SECOND_USER_DATA)
            log_in(SECOND_USER_DATA[:username], SECOND_USER_DATA[:password])

            post request_match_path(skill_class)
            match = JSON.parse(response.body)

            default_login

            match['request']['id']
        end


        context 'with an accepted status' do
            let!(:data){ { status: 'accepted' } }

            it 'returns a success status code' do

                answer_match_request
                
                expect(response).to have_http_status(200)
        
            end

            it 'creates a new connection' do
                
                answer_match_request

                connections = Connection.all
        
                expect(connections.length).to eq(1) # check that there is 1 connection
        
            end

        end

    end

    describe 'ending existing connection' do
        subject(:end_connection){
            put update_connection_path(connection), params: data
            connection.reload
        }

        let!(:connection) do
            new_user = create_user(SECOND_USER_DATA)

            match = MatchRequest.create!({ skill_class_id: skill_class.id, student_id: new_user.id })
            connection = Connection.create!({ match_id: match.id })

        end

        context 'by the teacher' do
            before(:each) { default_login }

            context 'with a \'given\' status' do

                let!(:data) { { status: 'given' } }

                it 'updates the class status' do

                    expect { end_connection }.to change(connection, :class_status).to('given')

                end

                it 'registers who closed the connection' do

                    expect { end_connection }.to change(connection, :person_closed_connection).to('teacher_closed')

                end

            end
            

        end

    end

    describe 'reviewing a connection' do
        subject(:review_conection){
            post rate_class_path(connection), params: data
        }

        let!(:connection) do
            new_user = create_user(SECOND_USER_DATA)

            match = MatchRequest.create!({ skill_class_id: skill_class.id, student_id: new_user.id })
            connection = Connection.create!({ match_id: match.id, class_status: 'given' })

        end


        context 'correctly' do
            let!(:data){ { rating: 5, comment: 'Sample text' } }

            it 'returns a success status code' do
                review_conection

                expect(response).to have_http_status(200) 

            end

            it 'creates a review object' do
                review_conection

                review = Review.first

                expect(review.rating).to eq(5) 
                expect(review.comment).to eq('Sample text') 
            end

        end

    end

end