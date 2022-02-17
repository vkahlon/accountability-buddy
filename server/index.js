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

app.put('/api/calorie/get-calorie', (req, res, next) => {
  let { age, weight, height, goal, level, gender, metric } = req.body;
  if (!age || !weight || !height || !goal || !level || !gender || metric === 'undefined') {
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
    age = age * 6.8;
    weight = 13.7 * weight;
    height = 5 * height;
    const hbe = 655;
    bmr = hbe + height + weight + age;
  } else if (gender === 'Female') {
    age = age * 4.7;
    weight = 9.6 * weight;
    height = 1.8 * height;
    const hbe = 655;
    bmr = hbe + height + weight + age;
  }
  if (goal === 'Bulk') {
    bmr = bmr + 600;
  } else if (goal === 'Cut') {
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
