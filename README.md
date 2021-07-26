# SkillX

SkillX is a web application used to connect people to learn skills from each other, using Ruby On Rails. Endpoint documentation available [here](https://documenter.getpostman.com/view/10665400/TzmBDE1W). UML diagram of the the data models available [here](https://drive.google.com/file/d/1ZuopBsgD1IhwJFE2EYyJPaqq7YtLXxPj/view?usp=sharing).

Requirements:

- Postgresql 13.2
- Ruby 2.7.3
- Rails 6.1.4

## To run

To start the server, open a terminal window in the /api directory and run:

```bash
rails server
```

## To install

After cloning this repository, open a terminal window in the project's /api directory and install dependencies with:

```bash
bundle install
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
