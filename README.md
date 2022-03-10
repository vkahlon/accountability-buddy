# Accountability-Buddy

A full stack web application for fitness enthusiasts to track calories.

## Technologies Used
- React
- Node.Js
- Bootstrap 5
- JavaScript
- Express.js
- Babel
- Webpack
- Argon2
- JSON webtoken
- Dotenv
- HTML5
- CSS3
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)
- [Styled Components](https://github.com/styled-components/styled-components)

## Live Demo

[Try out Accountability Buddy](https://accountability--buddy.herokuapp.com/)

## Features

- Users can discover the number of calories that they can eat, based on their activity level and goal.
- Users can create meals, which tracks its total calorie count
- Users can create exercises, which tracks the total calories burned
- Users can edit or delete their meals or exercises.
- Users can drag and drop their meals or exercises, to quickly calculate their calorie count for the day.
- Users can register to Accountability Buddy
- Users can sign-in to their Accountability Buddy account.
- Users can sign-out off their Accountability Buddy account.

## Stretch Features

- Users can share either their meals or exercises with other Accountability Users.
- Users can upload an image of their meal or exercise.
- Users can comment on a shared meal or item.


## Preview

![Meal-Calculator ](https://user-images.githubusercontent.com/47346471/157588615-113662ee-c485-43bd-893c-f944c7acce9c.gif)
![Codex-Demo](https://user-images.githubusercontent.com/47346471/157588854-2d24a23b-beb9-43a5-99bf-f5437980f23f.gif)


## Development

### System Requirements

- Node.js 16 or higher
- NPM 6 or higher
- Postgres

### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/vkahlon/Accountability-Buddy.git
    cd accountability-buddy
    ```

2. Install all dependencies with NPM.

    ```shell
    npm install
    ```
    
3. Fill in the empty values of the .env.example file and copy it.


4. Start PostgreSQL.

    ```shell
    sudo service postgresql start
    ```
5. Create a database (make sure it matches .env.example)
    ```shell
    createDb yourDatabaseName
    ```
6. Import your database into Postgres.
    ```shell
    npm run db:import
    ```   
7.  Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```

8. View your database through Pgweb.
    ```shell
    pgweb --db=yourDatabaseName
    ```
