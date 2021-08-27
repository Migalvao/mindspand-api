require 'rails_helper'
require_relative 'helper'
include Helper

RSpec.describe 'Accounts', type: :request do
    describe 'signing up' do
        context 'correctly' do
            it 'redirects to home' do
                post post_signup_path, params: TEST_USER_DATA

                expect(response).to redirect_to('/home')
                expect(response).to have_http_status(302)   # signup redirects to home 
            end
        end
    end

    describe 'fetching user classes' do

        subject(:get_user_classes) do
            get get_user_classes_path(user)
        end

        let!(:user) { create_default_user}
        

        context 'when user is not authenticated' do
            it 'returns unauthorized status code' do
                get_user_classes
                expect(response).to have_http_status(401)
            end
        end
    
        context 'when user is authenticated' do
            before(:each) { default_login }

            it 'returns success status code' do
                get_user_classes
                expect(response).to have_http_status(200)
            end
        end
    end

    describe 'accessing user profile' do
        subject(:get_profile) do
            get get_profile_path(user)
        end

        let!(:user) { create_default_user }

        context 'when user is authenticated' do
            before(:each) { default_login }
        
            it 'returns success status code' do
                get_profile
                expect(response).to have_http_status(200)
        
            end

        end
    end

    describe 'updating user profile' do    
        subject(:update_profile) do
            default_login
            put update_profile_path(user), params: { name: new_name }
            user.reload
        end
        
        let!(:user) { create_default_user }

        context 'correctly' do
            let!(:new_name) { 'Whitesmith User' }

            it 'updates the user object' do
                update_profile
                expect(user.name).to eq(new_name)
        
            end

            it 'redirects to the profile' do
                update_profile
                expect(response).to redirect_to(get_profile_path(user))
            end
        end
    end
end
