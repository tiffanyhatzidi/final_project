const db = require('../database');

exports.all = async () => {
    const { rows } = await db.getPool().query("select * from ingredients order by id");
    return db.camelize(rows);
}

exports.get = async (id) => {
    const {rows} = await db.getPool().query("select * from ingredients where id = $1", [id])
    return db.camelize(rows)[0]
}

exports.create = async (ingredient) => {
    return db.getPool().query("insert into ingredients(ingredient) values($1) returning *", [ingredient]);
}

exports.update = async (ingredient, id) => {
    return db.getPool().query("update ingredients set ingredient = $1 where id = $2 returning *", [ingredient, id]);
}

exports.upsert = async (ingredient) => {
    if(ingredient.id) {
        return exports.update(ingredient.ingredient, ingredient.id)
    }
    return exports.create(ingredient.ingredient)
}

