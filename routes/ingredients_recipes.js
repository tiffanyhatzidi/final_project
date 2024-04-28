const express = require('express');
const router = express.Router();
const ingredient = require('../models/ingredient');
const recipe = require('../models/recipe');
const ingredientRecipe = require('../models/ingredient_recipe');

// router.get('/form', async(req, res, next) => {
//     let recipeId = req.res.id;
//     res.render('ingredients_recipes/form', 
//         {title: 'HalfBaked || Ingredients_Recipes',
//         recipe: await recipe.get(recipeId),
//         ingredient: await ingredient.all()});
// });

router.post('/upsert', async (req, res, next) => {
    console.log('In_Res upsert: ' + JSON.stringify(req.body))
    let recipeId = req.body.recipeId;
    let csrf = req.body.csrf;
    let redirect = `/ingredients_recipes/form?id=${recipeId}&csrf=${csrf}`;
    let tempBody = {
        recipeId: req.body.recipeId,
        ingredientId: req.body.ingredientId,
        measurement: req.body.measurement
    }
    console.log("temp body: " + JSON.stringify(tempBody));
    await ingredientRecipe.upsert(tempBody);
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'Your status has been stored',
    };
    res.redirect(303, redirect)
});

router.get('/form', async(req, res, next) => {
    let recipeId = req.query.id;
    let recipe_ = await recipe.get(recipeId);
    let ingredientsRecipe = await ingredientRecipe.allForRecipe(recipe_);
    let ingredients = await ingredient.all();
    res.render('ingredients_recipes/form', 
        {title: 'HalfBaked || Ingredients_Recipes',
        recipe: recipe_,
        ingredients: ingredients,
        ingredientsRecipe: ingredientsRecipe})
})

router.get('/delete', async(req, res, next) => {
    console.log(JSON.stringify(req.query))
    let ingRecId = req.query.id;
    let recipeId = req.query.recipeId;
    let ingredientsRecipe = await ingredientRecipe.getConnect(recipeId, ingRecId); 
    console.log("ing rec await: " + JSON.stringify(ingredientsRecipe))
    res.render('ingredients_recipes/delete', {
        title: 'HalfBaked || Delete?',
        ingredientsRecipe: ingredientsRecipe
    })
})

router.post('/deleteIR/:id', async(req, res, next) => {
   let ingResId = req.params.id
   await ingredientRecipe.delete(ingResId);
   let recipeId = req.body.recipeId;
   let csrf = req.body._csrf;
   let redirect = `/ingredients_recipes/form?id=${recipeId}&csrf=${csrf}`;
   res.redirect(303, redirect);
});

module.exports = router;