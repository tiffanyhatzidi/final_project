const express = require('express');
const router = express.Router();
const ingredient = require('../models/ingredient');

router.get('/', async (req, res, next) => {
    let ingredients = await ingredient.all();
    res.render('ingredients/index', {title: 'HalfBaked || Ingredients', ingredients: ingredients});
});


router.get('/form', async (req, res, next) => {
  let templateVars = { title: 'HalfBaked || Ingredients' }
  if (req.query.id) {
    let ingredient = await ingredient.get(req.query.id)
    if (ingredient) {templateVars['ingredients'] = ingredient}
  }
  res.render('ingredients/form', templateVars);
});

router.post('/upsert', async (req, res, next) => {
    console.log('upsert body: ' + JSON.stringify(req.body))
    await ingredient.upsert(req.body);
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'the ingredient has been created!',
      };
      res.redirect(303, '/ingredients')
})


module.exports = router;