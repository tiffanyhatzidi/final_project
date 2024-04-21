const db = require('../database');

exports.add = async(recipeUser) => {
    return db.getPool()
    .query(`
    insert into
    recipes_users(user_id, recipe_id)
    values($1, $2) returning *`,
    [recipeUser.userId, recipeUser.recipeId]);
}

exports.get = async (user, recipe) => {
    const { rows } = await db.getPool().query(` 
        select *
        from recipes_users 
        where user_id = $1 and recipe_id = $2`,
    [user.id, recipe.id]);
    return db.camelize(rows)[0];
}

exports.AllForUser = async (user) => {
    const { rows } = await db.getPool().query(`
    select recipes.*
from recipes_users
join recipes on recipes_users.recipe_id = recipes.id
where recipes_users.user_id = $1`, 
[user.id]);
return db.camelize(rows);
}

exports.delete = async (recipeUser) => {
    return await db.getPool()
    .query("delete from recipes_users where id = $1 returning *",
    [recipeUser.id]);
}

exports.upsert = (recipeUser) => {
    if (recipeUser.id) {
        return exports.delete(recipeUser);
    } else {
        return exports.add(recipeUser);
    }
}
