# SkillX

SkillX is a web application used to connect people to learn skills from each other, using Ruby On Rails. Endpoint documentation available [here](https://documenter.getpostman.com/view/10665400/TzmBDE1W). UML diagram of the the data models available [here](https://drive.google.com/file/d/1ZuopBsgD1IhwJFE2EYyJPaqq7YtLXxPj/view?usp=sharing).

Requirements:

- Postgresql 13.2
- Ruby 2.7.3
- Rails 6.1.4

## To run

To start the server, open a terminal window in the project's main directory and run:

```bash
rails server
```

To enable fast reload, open another terminal window in the same directory and run:

```bash
ruby bin/webpack-dev-server
```

## To deploy

To deploy the current version to heroku, open a terminal window in the project's main directory and run:

```bash
git push heroku master
```

And then you can check the live version [here](https://whitesmith-skillx.herokuapp.com/).

## To install

After cloning this repository, open a terminal window in the project's main directory and install ruby dependencies with:

```bash
bundle install
```

If there's an error installing the mimemagic gem, make sure you have shared-mime-info first, by running

```bash
brew install shared-mime-info
```

on MacOS,

```bash
sudo apt-get install -y shared-mime-info
```

on Linux

or by following [this](https://stackoverflow.com/questions/66808927/error-installing-ruby-on-rails-on-windows-10) guide on Windows.

Then, to install the JavaScript dependencies, run:

```bash
yarn install
```

Then, to configure the database, open the file /app/config/database.yml and enter the following information for the development, test and production databases (depending on which mode you'll want to run the project):

- database - database name
- username - username of user to connect to the database
- host - address of the database server (defaults to localhost)
- port - port in which the database server is running (defaults to 5432)

To set the database user's password, create a .env file inside the /app directory with:

```bash
DB_PASSWORD='your password'
```

Finally, to create the necessary database tables, go back to the terminal window and run:

```bash
rails db:schema:load
```

To load the default categories and skills and default user (username: 'whitesmith' and password: 'password'), run:

```bash
rails db:seed
```

To setup the ImageKit remote storage, you'll also need to insert your public key and url_endpoint in the configs at the bottom of the config/environments/development.rb and config/environments/production.rb files, as well as inserting your private key in the .env file as

```bash
IMAGEKIT_PRIV_KEY='your private key'
```
