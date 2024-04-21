const db = require('../database');

exports.add = async (ingredientRecipe) => {
    return db.getPool()
    .query('insert into ingredients_recipes(recipe_id, ingredient_id, measurement values ($1, $2, $3) returing *',
    [ingredientRecipe.recipeId, ingredientRecipe.ingredientId, ingredientRecipe.measurement]);
}

exports.get = async (recipe) => {
    const {rows} = await db.getPool().query(
        `select ingredients.ingredient, ingredients_recipes.measurement
        from ingredients_recipes 
        join ingredients on ingredients_recipes.ingredient_id = ingredients.id
        where ingredients_recipes.recipe_id = $1;`,
        [recipe.id]);
        return db.camelize(rows);
}

//all for user

exports.update = async (ingredientRecipe) => {
    return await db.getPool()
    .query(
        `
        update ingredients_recipes 
        set measurement = $1 where id = $2
        returing *
        `,
        [ingredientRecipe.measurement, ingredientRecipe.id]
    );
}

exports.upsert = (ingredientRecipe) => {
    if(ingredientRecipe.id) {
        return exports.update(ingredientRecipe);
    } else {
        return exports.add(ingredientRecipe);
    }
}