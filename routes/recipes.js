const express = require('express');
const router = express.Router();
const recipe = require('../models/recipe');
const ingredientRecipe = require('../models/ingredient_recipe');
const recipeUser = require('../models/recipe_user');
const ingredient = require('../models/ingredient');



router.get('/', async(req, res, next) => {
    const recipes = await recipe.all();
    res.render('recipes/index', {title: 'HalfBaked || Recipes', recipes: recipes});
});


router.get('/form', async (req, res, next) => {
    let recipeId = req.query.id;
    res.render('recipes/form',
        {title: 'HalfBaked || Recipes', 
        recipeId: recipeId,
        ingredients: await ingredient.all()});
});

router.post('/upsert', async (req, res, next) => {
    console.log('upsert body: ' + JSON.stringify(req.body))
    //transaction?
    // let recipeBody = {
    //     recipe_name:req.body.recipe_name,
    //     time_taken: req.body.time_taken,
    //     category: req.body.category,
    //     instructions: req.body.instructions
    // }
    // let ingredientsBody = {
    //     ??
    // }
    await recipe.upsert(req.body);
    //await ingredient.upsert(req.body);
    //await ingredientRecipe.upsert(req.body);
    let createdOrupdated = req.body.id ? 'updated' : 'created';
    req.session.flash = {
      type: 'info',
      intro: 'Success!',
      message: `the Recipe has been ${createdOrupdated}!`,
    };
    res.redirect(303, '/recipes')
})

router.get('/edit', async(req, res, next) => {
    let recipeId = req.query.id;
    //TODO: if recipe, recipe.
    //let recipe = await recipe.get(recipeId);
    //TODO: get ingredients
    res.render('recipes/form', 
        {title: 'HalfBaked || Recipes',
        recipeId: recipeId})
})

router.get('/show/:id', async (req, res, next) => {
    const recipes = await recipe.get(req.params.id)
    let templateVars = {
        title: 'HalfBaked || Recipes',
        recipe: recipes,
        timeTaken: recipes.timeTaken,
        recipeId: req.params.id
    }
    recipes.ingredients = await ingredientRecipe.get(recipes);

    if(req.session.currentUser) {
        templateVars['recipeUser'] = await recipeUser.get(req.session.currentUser, recipes);
    }
    console.log("=========");
    console.log(templateVars);
    res.render('recipes/show', templateVars);
});





module.exports = router;