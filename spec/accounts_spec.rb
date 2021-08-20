require 'rails_helper'

RSpec.describe 'User ', :type => :request do
    it 'signup' do
        post '/signup', params: { username: 'whitesmith', password: 'password', email: 'whitesmith@whitesmith.co', name: 'Whitesmith' }

        expect(response).to redirect_to('/home')
    end
end

RSpec.describe 'User access', :type => :request do
    context 'before login' do
        it 'is limited' do
            get "/api/users/1/classes"
            expect(response).to have_http_status(401)
        end
    end

    context 'after login' do
        it 'is allowed' do

            post '/login', params: { username: 'whitesmith', password: 'password' }
            expect(response).to redirect_to('/home')

            get "/api/users/1/classes"
            expect(response).to have_http_status(200)
        end
    end
end
