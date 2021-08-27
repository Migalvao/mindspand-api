require 'rails_helper'
require_relative 'helper'
include Helper

RSpec.describe 'Class', type: :request do
    let!(:skill) { create_skill }
    let!(:user) { 
        user = create_default_user 
        default_login
        user
    }

    describe 'creating a new class' do
        subject(:create_class) do
            post post_class_path(user), params: class_data
        end
        
        context 'correctly' do

            let!(:class_data) { { skill_id: 1, title: 'Example class', description: 'Very normal class.', 
                no_classes: 2, class_duration: 90, method: "asynchronous", 
                difficulty: "beginner", regime: "remote"} }

            it 'returns success status code' do

                create_class
                expect(response).to have_http_status(200) 

            end

            it 'creates class object' do

                create_class
                expect(SkillClass.all.length).to eq(1) 

            end
        end
    end

    describe 'fetching classes' do
        before(:each) do
            create_default_class
        end

        context 'from single user' do
            subject(:fetch_classes) do
                get get_user_classes_path(user)
            end

            it 'returns a single class' do

                fetch_classes
                classes = JSON.parse(response.body)
                expect(classes.length).to eq(1) # check that there is 1 class created

            end
        end
        
        context 'without filters' do
            subject(:fetch_classes) do
                get get_classes_path
            end

            it 'returns a single class' do

                fetch_classes
                classes = JSON.parse(response.body)
                expect(classes.length).to eq(1) # check that there is 1 class created

            end
        end

        context 'with difficulty filter' do
            subject(:fetch_classes) do
                get get_classes_path, params: query_params
            end
            
            let!(:query_params){ {} }

            it 'returns single beginner class' do
                query_params[:difficulty] = 'beginner'

                fetch_classes
                classes = JSON.parse(response.body) 
                expect(classes.length).to eq(1) # check that there is 1 beginner class

            end

            it 'returns no intermediate classes' do
                query_params[:difficulty] = 'intermediate'

                fetch_classes

                classes = JSON.parse(response.body)
                expect(classes.length).to eq(0) # check that there are no intermediate classes

            end
        end

    end

end