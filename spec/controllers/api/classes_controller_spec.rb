# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::ClassesController, type: :controller do

  describe 'GET #get_classes' do
    subject { get :get_classes }
    it 'returns a json content type' do
      expect(subject).to have_attributes(content_type: include('application/json'))
    end
    it 'responds with a valid json object' do
      expect { JSON.parse(subject.body) }.not_to raise_error
    end
    it 'returns a 200 OK status' do
      expect(subject).to have_http_status(:ok)
    end
  end

  describe 'GET #get_new_classes' do
    subject { get :get_new_classes }
    it 'returns a json content type' do
      expect(subject).to have_attributes(content_type: include('application/json'))
    end
    it 'responds with a valid json object' do
      expect { JSON.parse(subject.body) }.not_to raise_error
    end
    it 'returns a 401 unauthorized status' do
      expect(subject).to have_http_status(:unauthorized)
    end
  end

end