require('dotenv/config');
const express = require('express');
const pg = require('pg');
const argon2 = require('argon2');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const ClientError = require('./client-error');
const jwt = require('jsonwebtoken');

const app = express();
const jsonMiddleware = express.json();
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
app.use(jsonMiddleware);
app.use(staticMiddleware);

app.post('/api/auth/Register', (req, res, next) => {
  const { userName, password } = req.body;
  const standardCalorie = 2000;
  if (!userName || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  if (password.length < 8) {
    throw new ClientError(400, `Password must be greater than 8 characters. Your password length ${password.length}`);
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
    insert into "users" ("userName", "dailyCalorie", "hashedPassword")
    values ($1, $2, $3)
    returning "userId", "userName", "dailyCalorie"
  `;
      const params = [userName, standardCalorie, hashedPassword];
      db.query(sql, params)
        .then(result => {
          const [newUser] = result.rows;
          newUser.purpose = 'Register';
          res.status(201).json(newUser);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/auth/Sign-In', (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "userName" = $1
  `;
  const params = [userName];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, userName };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});
app.use(authorizationMiddleware);
app.get('/api/meals', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select *
      from "meals"
    where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const mealList = [];
      const mealData = result.rows;
      for (let i = 0; i < mealData.length; i++) {
        const idString = (`meal-${mealData[i].mealId}`);
        mealList.push({ id: idString, content: mealData[i].mealName, calories: -mealData[i].calories, icon: './images/fork.png' });
      }
      res.json(mealList);
    })
    .catch(err => next(err));
});
app.get('/api/exercises', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select *
      from "exercises"
    where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const exerciseList = [];
      const exerciseData = result.rows;
      for (let i = 0; i < exerciseData.length; i++) {
        const idString = (`exercise-${exerciseData[i].exerciseId}`);
        exerciseList.push({ id: idString, content: exerciseData[i].exerciseName, calories: exerciseData[i].calories, icon: './images/dumbell.png' });
      }
      res.json(exerciseList);
    })
    .catch(err => next(err));
});
app.get('/api/user', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select "dailyCalorie"
      from "users"
    where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/calorie/add-Meal', (req, res, next) => {
  const { item, calories } = req.body;
  const { userId } = req.user;
  if (!item || !calories) {
    throw new ClientError(400, `Condition 1: name: ${item}, value: ${calories} are required fields`);
  }
  if ((item.length > 20) || (calories.toString().length > 5)) {
    throw new ClientError(400, `Your input ${item.length} characters. Your input ${calories.toString().length} characters.`);
  }
  const sql = `
        insert into "meals" ("mealName", "calories", "userId")
        values ($1, $2, $3)
        returning *
      `;
  const params = [item, calories, userId];
  db.query(sql, params)
    .then(result => {
      const [newMeal] = result.rows;
      if (!newMeal) {
        throw new ClientError(404, 'cannot find user with userId of 1');
      } else {
        res.json(newMeal);
      }
    })
    .catch(err => next(err));
});
app.post('/api/calorie/add-Exercise', (req, res, next) => {
  const { item, calories } = req.body;
  const { userId } = req.user;
  if (!item || !calories) {
    throw new ClientError(400, `Condition 1: exercise: ${item}, value: ${calories} are required fields`);
  }
  if ((item.length > 20) || (calories.toString().length > 5)) {
    throw new ClientError(400, `Exercise name must be under 15 characters. Value must be under 6 digits. Your input ${item.length} characters. Your input ${calories.toString().length} characters.`);
  }
  const sql = `
        insert into "exercises" ("exerciseName", "calories", "userId")
        values ($1, $2, $3)
        returning *
      `;
  const params = [item, calories, userId];
  db.query(sql, params)
    .then(result => {
      const [newExercise] = result.rows;
      if (!newExercise) {
        throw new ClientError(404, `cannot find user with userId of ${userId}`);
      } else {
        res.json(newExercise);
      }
    })
    .catch(err => next(err));
});
app.put('/api/calorie/edit-Exercise/:exerciseId', (req, res, next) => {
  const { exerciseId } = req.params;
  const { item, calories } = req.body;
  const { userId } = req.user;
  if (!item || !calories) {
    throw new ClientError(400, `Condition 1: exercise: ${item}, value: ${calories} are required fields`);
  }
  if ((item.length > 20) || (calories.toString().length > 5)) {
    throw new ClientError(400, `Exercise name must be under 20 characters. Value must be under 6 digits. Your input ${item.length} characters. Your input ${calories.toString().length} characters.`);
  }
  const sql = `
        update "exercises"
        set "exerciseName" = $1,
            "calories" = $2
        where "exerciseId" = $3 AND "userId" = $4
        RETURNING *
      `;
  const params = [item, calories, exerciseId, userId];
  db.query(sql, params)
    .then(result => {
      const [newExercise] = result.rows;
      if (!newExercise) {
        throw new ClientError(404, 'cannot find user with userId of 1');
      } else {
        res.json(newExercise);
      }
    })
    .catch(err => next(err));
});
app.put('/api/calorie/edit-Meal/:mealId', (req, res, next) => {
  const { mealId } = req.params;
  const { item, calories } = req.body;
  const { userId } = req.user;
  if (!item || !calories) {
    throw new ClientError(400, `Condition 1: meal: ${item}, value: ${calories} are required fields`);
  }
  if ((item.length > 20) || (calories.toString().length > 5)) {
    throw new ClientError(400, `Meal name must be under 20 characters. Value must be under 6 digits. Your input ${item.length} characters. Your input ${calories.toString().length} characters.`);
  }
  const sql = `
        update "meals"
        set "mealName" = $1,
            "calories" = $2
        where "mealId" = $3 AND "userId" = $4
        RETURNING *
      `;
  const params = [item, calories, mealId, userId];
  db.query(sql, params)
    .then(result => {
      const [newMeal] = result.rows;
      if (!newMeal) {
        throw new ClientError(404, 'Something went Wrong');
      } else {
        res.json(newMeal);
      }
    })
    .catch(err => next(err));
});

app.get('/api/edit-Meal-items', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select *
      from "meals"
      where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const mealList = [];
      const mealData = result.rows;
      for (let i = 0; i < mealData.length; i++) {
        mealList.push({ id: mealData[i].mealId, content: mealData[i].mealName, calories: mealData[i].calories, icon: 'fa-solid fa-utensils' });
      }
      res.json(mealList);
    })
    .catch(err => next(err));
});
app.get('/api/edit-Exercise-items', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select *
      from "exercises"
      where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const exerciseList = [];
      const exerciseData = result.rows;
      for (let i = 0; i < exerciseData.length; i++) {
        exerciseList.push({ id: exerciseData[i].exerciseId, content: exerciseData[i].exerciseName, calories: exerciseData[i].calories, icon: 'fa-solid fa-dumbbell' });
      }
      res.json(exerciseList);
    })
    .catch(err => next(err));
});

app.delete('/api/delete-Exercise/:exerciseId', (req, res, next) => {
  const { exerciseId } = req.params;
  const { userId } = req.user;
  const sql = `
     delete from "exercises"
     where "exerciseId" = $1 AND "userId" = $2
     returning *
   `;
  const params = [exerciseId, userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});
app.delete('/api/delete-Meal/:mealId', (req, res, next) => {
  const { mealId } = req.params;
  const { userId } = req.user;
  const sql = `
     delete from "meals"
     where "mealId" = $1 AND "userId" = $2
     returning *
   `;
  const params = [mealId, userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.put('/api/calorie/get-calorie', (req, res, next) => {
  let { age, weight, height, goal, level, gender, metric } = req.body;
  const { userId } = req.user;
  if (!age || !weight || !height || !goal || !level || !gender || typeof metric === 'undefined') {
    throw new ClientError(400, `Condition 1: age: ${age}, weight: ${weight}, height: ${height}, goal: ${goal}, level: ${level}, metric: ${metric} and gender: ${gender} are required fields`);
  }
  age = parseInt(age);
  height = parseInt(height);
  weight = parseInt(weight);
  metric = String(metric);
  let bmr = 0;
  if (metric === 'false') {
    height = height * 2.54;
    weight = weight / 2.2;
  }
  if (gender === 'Male') {
    age = age * 6.755;
    weight = 13.75 * weight;
    height = 5.003 * height;
    bmr = 66.5 + height + weight - age;
  } else if (gender === 'Female') {
    age = age * 4.676;
    weight = 9.563 * weight;
    height = 1.85 * height;
    bmr = 655.1 + height + weight - age;
  }
  if (goal === 'Bulking') {
    bmr = bmr + 600;
  } else if (goal === 'Cutting') {
    bmr = bmr - 600;
  }
  if (level === 'Sedentary') {
    bmr = Math.round(bmr * 1.2);
  } else if (level === 'Lightly Active') {
    bmr = Math.round(bmr * 1.375);
  } else if (level === 'Moderately Active') {
    bmr = Math.round(bmr * 1.55);
  } else if (level === 'Very Active') {
    bmr = Math.round(bmr * 1.725);
  }
  const sql = `
        update "users"
        set "dailyCalorie" = $1
        where "userId" = $2
        returning *
      `;
  const params = [bmr, userId];
  db.query(sql, params)
    .then(result => {
      const [updatedCalorie] = result.rows;
      if (!updatedCalorie) {
        throw new ClientError(404, 'cannot find user with userId of 1');
      } else {
        res.json(updatedCalorie);
      }
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
