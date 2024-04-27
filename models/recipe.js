const db = require('../database');

exports.all = async () => {
    const {rows} = await db.getPool().query("select * from recipes order by id");
    return db.camelize(rows);
}

exports.add = async (recipe) => {
    const {rows} = await db.getPool()
    .query("insert into recipes(recipe_name, time_taken, instructions, category) values($1, $2, $3, $4) returning *", 
    [recipe.recipeName, recipe.timeTaken, recipe.instructions, recipe.category]);
    return db.camelize(rows);
}

exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from recipes where id = $1", [id])
    return db.camelize(rows)[0];
  }

  exports.update = async (recipe) => {
    const {rows} =  await db.getPool()
      .query("update recipes set recipe_name = $1, time_taken = $2, instructions = $3, category = $4 where id = $5 returning *",
      [recipe.recipeName, recipe.timeTaken, recipe.instructions, recipe.category, recipe.id]);
      //update ingrecients-recipes 
      return db.camelize(rows)[0]
  }

  exports.upsert = async (recipe) => {
    if (recipe.timeTaken) {
      recipe.timeTaken = `${recipe.timeTaken} minutes`
    }

    console.log("=======", recipe)

    if (recipe.id) {
      return exports.update(recipe);
    } else {
      return exports.add(recipe);
    }
  }
  