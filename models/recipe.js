const db = require('../database');

exports.all = async () => {
    const {rows} = await db.getPool().query("select * from recipes order by id");
    return db.camelize(rows);
}

exports.add = async (recipe) => {
    const {rows} = await db.getPool()
    .query("insert into recipes(recipe_name, time_taken, instructions) values($1, $2, $3) returning *", 
    [recipe.recipe_name, recipe.time_taken, recipe.instructions]);
    //may need to call upsert to ingredients_recipes depending
    return db.camelize(rows);
}

exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from recipes where id = $1", [id])
    return db.camelize(rows)[0]
  }

  exports.update = async (recipe) => {
    const {rows} =  await db.getPool()
      .query("update recipes set recipe_name = $1, time_taken = $2, instructions = $3 where id = $4 returning *",
      [recipe.recipe_name, recipe.time_taken, recipe.instructions, recipe.id]);
      //update ingrecients-recipes 
      return db.camelize(rows)[0]
  }

  exports.upsert = async (recipe) => {
    if (recipe.id) {
      return exports.update(recipe);
    } else {
      return exports.add(recipe);
    }
  }
  