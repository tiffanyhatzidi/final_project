const express = require('express');
const router = express.Router();

const ingredientRecipe = require('../models/ingredient_recipe');

router.post('/upsert', async (req, res, next) => {
    console.log('In_Res upsert: ' + JSON.stringify(req.body))
    let recipeId = req.body.recipeId;
    let redirect = `/recipes/show/${recipeId}`;
    await ingredientRecipe.upsert(req.body);
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'Your status has been stored',
    };
    res.redirect(303, redirect)
});

module.exports = router;