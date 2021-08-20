require 'rails_helper'

RSpec.describe 'User access', :type => :request do
    context 'before authentication' do
        it 'is limited' do
            get "/api/users/1/classes"
            expect(response).to have_http_status(401)
        end
    end
end
