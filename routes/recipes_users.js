const express = require('express');
const router = express.Router();

const recipeUser = require('../models/recipe_user');

router.post('/upsert', async (req, res, next) => {
    console.log("RU upsert: " + JSON.stringify(req.body))
    let recipeId = req.body.recipeId;
    let redirect = `/recipes/show/${recipeId}`;
    await recipeUser.upsert(req.body);
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'Recipe status has been changed',
      };
      res.redirect(303, redirect)
});

module.exports = router;