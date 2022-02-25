require('dotenv/config');
const express = require('express');
const pg = require('pg');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');

const app = express();
const jsonMiddleware = express.json();
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
app.use(jsonMiddleware);

app.get('/api/meals', (req, res, next) => {
  const sql = `
    select *
      from "meals"
  `;
  db.query(sql)
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
  const sql = `
    select *
      from "exercises"
  `;
  db.query(sql)
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
  const sql = `
    select "dailyCalorie"
      from "users"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/calorie/add-Meal', (req, res, next) => {
  const { item, calories } = req.body;
  if (!item || !calories) {
    throw new ClientError(400, `Condition 1: name: ${item}, value: ${calories} are required fields`);
  }
  if ((item.length > 20) || (calories.toString().length > 5)) {
    throw new ClientError(400, `Your input ${item.length} characters. Your input ${calories.toString().length} characters.`);
  }
  const sql = `
        insert into "meals" ("mealName", "calories")
        values ($1, $2)
        returning *
      `;
  const params = [item, calories];
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
  if (!item || !calories) {
    throw new ClientError(400, `Condition 1: exercise: ${item}, value: ${calories} are required fields`);
  }
  if ((item.length > 20) || (calories.toString().length > 5)) {
    throw new ClientError(400, `Exercise name must be under 20 characters. Value must be under 6 digits. Your input ${item.length} characters. Your input ${calories.toString().length} characters.`);
  }
  const sql = `
        insert into "exercises" ("exerciseName", "calories")
        values ($1, $2)
        returning *
      `;
  const params = [item, calories];
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
app.put('/api/calorie/edit-Exercise/:exerciseId', (req, res, next) => {
  const exerciseId = Number(req.params.exerciseId);
  const { item, calories } = req.body;
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
        where "exerciseId" = $3
        RETURNING *
      `;
  const params = [item, calories, exerciseId];
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
  const mealId = Number(req.params.mealId);
  const { item, calories } = req.body;
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
        where "mealId" = $3
        RETURNING *
      `;
  const params = [item, calories, mealId];
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
  const sql = `
    select *
      from "meals"
  `;
  db.query(sql)
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
  const sql = `
    select *
      from "exercises"
  `;
  db.query(sql)
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
  const exerciseId = Number(req.params.exerciseId);
  const sql = `
     delete from "exercises"
     where "exerciseId" = $1
   `;
  const params = [exerciseId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});
app.delete('/api/delete-Meal/:mealId', (req, res, next) => {
  const mealId = Number(req.params.mealId);
  const sql = `
     delete from "meals"
     where "mealId" = $1
   `;
  const params = [mealId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.put('/api/calorie/get-calorie', (req, res, next) => {
  let { age, weight, height, goal, level, gender, metric } = req.body;
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
        where "userId" = 1
        returning *
      `;
  const params = [bmr];
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

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
