const express = require('express');
const router = express.Router();
const recipe = require('../models/recipe');



router.get('/', async(req, res, next) => {
    const recipes = await recipe.all();
    res.render('recipes/index', {title: 'HalfBaked || Recipes', recipes: recipes});
});

//TODO: get.form, post.upsert, get.edit

router.get('/show/:id', async (req, res, next) => {
    const recipes = await recipe.get(req.params.id)
    let templateVars = {
        title: 'HalfBaked || Recipes',
        recipe: recipes,
        timeTaken: recipes.timeTaken,
        recipeId: req.params.id
        //category?
    }
    console.log("=========");
    console.log(templateVars);
    res.render('recipes/show', templateVars);
});





module.exports = router;