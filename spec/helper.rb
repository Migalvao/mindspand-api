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
        user = User.create(data)
        unless user
            puts "\nERROR CREATING USER"
            puts user.errors.full_messages
        end

        return user
    end

    def create_skill
        c = Category.create({ name: 'Example category' })
        Skill.create({ name: 'Example skill', category: c })
    end

end