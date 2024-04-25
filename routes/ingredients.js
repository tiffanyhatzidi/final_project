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
    let ingredient_ = await ingredient.get(req.query.id)
    if (ingredient_) {templateVars['ingredient'] = ingredient_}
  }
  res.render('ingredients/form', templateVars);
});

router.post('/upsert', async (req, res, next) => {
    console.log('upsert body: ' + JSON.stringify(req.body))
    let tempBody = {
      ingredient: req.body.ingredient,
      id: req.body.id
    }
    console.log(JSON.stringify(tempBody));
    await ingredient.upsert(tempBody);
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'the ingredient has been created!',
      };
      res.redirect(303, '/ingredients')
})

//edit ingredients?

module.exports = router;