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
  let { age, weight, height, goal, actLevel, gender, isMetric } = req.body;
  if ((!age) || (!weight) || (!height) || (!isMetric) || (!goal) || (!actLevel) || (!gender)) {
    throw new ClientError(400, 'age, weight, height, goal, activity level, isMetric and gender are required fields');
  }
  let bmr = 0;
  if (isMetric === 'no') {
    height = Math.round(height * 2.54);
    weight = Math.round(weight / 2.2);
  }
  if (gender === 'male') {
    age = age * 6.8;
    weight = 13.7 * weight;
    height = 5 * height;
    const hbe = 655;
    bmr = Math.round(hbe + height + weight + age);
  } else if (gender === 'female') {
    age = age * 4.7;
    weight = 9.6 * weight;
    height = 1.8 * height;
    const hbe = 655;
    bmr = Math.round(hbe + height + weight + age);
  }
  if (goal === 'bulk') {
    bmr = Math.round(bmr + 600);
  } else if (goal === 'cut') {
    bmr = Math.round(bmr - 600);
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
