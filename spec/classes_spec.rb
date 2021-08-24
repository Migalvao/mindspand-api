require 'rails_helper'
require_relative 'helper'
include Helper

RSpec.describe 'Class', type: :request do
    before(:all) { default_login; create_skill }

    it 'create' do
        class_data = { skill_id: 1, title: 'Example class', description: 'Very normal class.', 
            no_classes: 2, class_duration: 90, method: "asynchronous", 
            difficulty: "beginner", regime: "remote"}

        post '/api/users/1/classes', params: class_data

        expect(response).to have_http_status(200) 

    end

    it 'fetch from single user' do

        get '/api/users/1/classes'
        
        expect(response).to have_http_status(200) 
        classes = JSON.parse(response.body)
        
        expect(classes.length).to eq(1) # check that there is 1 class created

    end
    
    it 'fetch without filters' do

        get '/api/classes/'
        
        expect(response).to have_http_status(200) 
        classes = JSON.parse(response.body)
        
        expect(classes.length).to eq(1) # check that there is 1 class created

    end

    it 'fetch all with filters' do

        get '/api/classes?difficulty=beginner'
        
        expect(response).to have_http_status(200) 
        classes = JSON.parse(response.body)
        
        expect(classes.length).to eq(1) # check that there is 1 beginner class

        get '/api/classes?difficulty=intermediate'
        
        expect(response).to have_http_status(200) 
        classes = JSON.parse(response.body)
        
        expect(classes.length).to eq(0) # check that there are no intermediate classes

    end

end