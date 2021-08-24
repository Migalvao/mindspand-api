require 'rails_helper'
require_relative 'helper'
include Helper

RSpec.describe 'User ', type: :request do
    it 'signup' do
        post '/signup', params: { username: TEST_USERNAME, password: TEST_PASSWORD, email: TEST_EMAIL, name:TEST_NAME }

        expect(response).to redirect_to('/home')
        expect(response).to have_http_status(302)   # signup redirects to home 
    end
end

RSpec.describe 'User access', type: :request do
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

RSpec.describe 'Profile', type: :request do
    before(:all) { default_login }

    it 'access' do
        get "/users/1"
        expect(response).to have_http_status(200)

    end

    it 'update' do
        new_name = 'Whitesmith User'
        put '/users/1', params: { name: new_name }
        expect(response).to redirect_to("/users/1")

        # check if object is updated
        user = User.find(1)
        expect(user.name).to eq(new_name)

    end

end
