drop database if exists my_recipe_db;

create database my_recipe_db;

\c my_recipe_db

CREATE TABLE "users" (
  "id" serial,
  "email" varchar,
  "password" varchar,
  "salt" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "recipe" (
  "id" serial,
  "recipe_name" varchar,
  "instructions" varchar,
  "time_taken" interval,
  PRIMARY KEY ("id")
);

CREATE TABLE "recipes_users" (
  "id" serial,
  "user_id" int,
  "recipe_id" int,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_recipes_users.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "users"("id"),
  CONSTRAINT "FK_recipes_users.recipe_id"
    FOREIGN KEY ("recipe_id")
      REFERENCES "recipe"("id")
);

CREATE TABLE "ingredients" (
  "id" serial,
  "ingredient" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "ingredients_recipes" (
  "id" serial,
  "recipe_id" int,
  "ingredient_id" int,
  "measurement" varchar,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_ingredients_recipes.ingredient_id"
    FOREIGN KEY ("ingredient_id")
      REFERENCES "ingredients"("id"),
  CONSTRAINT "FK_ingredients_recipes.recipe_id"
    FOREIGN KEY ("recipe_id")
      REFERENCES "recipe"("id")
);

