const db = require('../database');
const ingredient = require('./ingredient');

exports.add = async (ingredientRecipe) => {
    // if(!ingredientRecipe.ingredientId){
    //     let ingredientT = await ingredient.upsert(ingredientRecipe.ingredient) 
    //     console.log(JSON.stringify(ingredientRecipe.recipeId))
    //     console.log(JSON.stringify(ingredientT.rows[0].id));
    //     console.log(JSON.stringify(ingredientRecipe.measurement));
    //     return db.getPool()
    // .query(`
    //     insert into ingredients_recipes(recipe_id, ingredient_id, 
    //     measurement) values ($1, $2, $3) 
    //     returning *`,
    // [ingredientRecipe.recipeId, ingredientT.rows[0].id, ingredientRecipe.measurement]);
    // }

    return db.getPool()
    .query(`
        insert into ingredients_recipes(recipe_id, ingredient_id, 
        measurement) values ($1, $2, $3) 
        returning *`,
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


exports.allForRecipe = async (recipe) => {
    const {rows} = await db.getPool().query
    (`select ingredients.ingredient, ingredients_recipes.* 
    from ingredients 
    join ingredients_recipes on ingredients_recipes.ingredient_id = ingredients.id
    where ingredients_recipes.recipe_id = $1;`, 
    [recipe.id]);
    return db.camelize(rows);
}

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