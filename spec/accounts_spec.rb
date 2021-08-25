require 'rails_helper'
require_relative 'helper'
include Helper

RSpec.describe 'Accounts', type: :request do
    describe 'signing up' do
        it 'redirects user to home page' do
            post post_signup_path, params: TEST_USER_DATA

            expect(response).to redirect_to('/home')
            expect(response).to have_http_status(302)   # signup redirects to home 
        end
    end

    describe 'fetching user profile' do
        let!(:user) { create_user }

        context 'when user is authenticated' do
            before { default_login }

            it 'returns a success status code' do
                get get_profile_path(user)
                expect(response).to have_http_status(200)
            end
        end
    end

    describe 'updating user profile' do
        new_name = 'Whitesmith User'

        subject(:update_profile) do
            put update_profile_path(user), params: { name: new_name }
            user.reload
        end

        let!(:user) { create_user }

        context 'when user is authenticated' do
            before { default_login }

            it 'redirects user to profile page' do
                update_profile
                expect(response).to redirect_to(get_profile_path)
            end

            it 'updates user data' do
                expect { update_profile }.to change(user, :name).to(new_name)
            end
        end
    end

    describe 'fetching user classes' do
        subject(:get_classes) do
            get get_user_classes_path(user)
        end

        let!(:user) { create_user }

        # You can replicate this for the other endpoints
        context 'when user is not authenticated' do
            it 'returns an unauthorized status code' do
                get_classes
                expect(response).to have_http_status(401)
            end
        end

        context 'when user is authenticated' do
            before { default_login }

            it 'returns a success status code' do
                get_classes
                expect(response).to have_http_status(200)
            end
        end
    end
end
