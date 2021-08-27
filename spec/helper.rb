module Helper

    TEST_USERNAME = 'whitesmith'
    TEST_PASSWORD = 'password'
    TEST_EMAIL = 'whitesmith@whitesmith.co'
    TEST_NAME = 'Whitesmith'

    TEST_USER_DATA = {
        username: TEST_USERNAME,
        password: TEST_PASSWORD,
        email: TEST_EMAIL,
        name: TEST_NAME
    }

    TEST_CLASS_DATA = { skill_id: 1, title: 'Example class', description: 'Very normal class.', 
        no_classes: 2, class_duration: 90, method: "asynchronous", 
        difficulty: "beginner", regime: "remote", teacher_id: 1}

    def default_login
        log_in(TEST_USERNAME, TEST_PASSWORD)
    end

    def log_in(username, password)
        data = {username: username, password: password}
        post '/login', params: data

        unless response.status == 302
            puts "\nLOGIN FAILED FOR USER #{username}!\n"
        end
    end

    def create_default_user
        create_user(TEST_USER_DATA)
    end

    def create_user(data)
        user = User.create!(data)
    end

    def create_skill
        c = Category.create({ name: 'Example category', color: '#FFFFFF' })
        Skill.create({ name: 'Example skill', category: c })
    end

    def create_default_class
        TEST_CLASS_DATA[:teacher_id] = User.first.id
        SkillClass.create!(TEST_CLASS_DATA)
    end

end