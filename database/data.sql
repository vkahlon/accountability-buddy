insert into
  "users" ("userName", "dailyCalorie", "hashedPassword")
values
  ('Guest', 2000, '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA');

insert into
  "meals" ("userId", "calories", "mealName")
values
  ('1', 655, 'Bison & Rice'),
  ('1', 200, 'Protein Bar'),
  ('1', 955, 'Burger'),
  ('1', 422, 'Breakfeast');

insert into
  "exercises" ("userId", "calories", "exerciseName")
values
  ('1', 122, 'Leg Day'),
  ('1', 200, 'Cardio 20min'),
  ('1', 22, 'Push Day'),
  ('1', 12, 'Pull Day');
