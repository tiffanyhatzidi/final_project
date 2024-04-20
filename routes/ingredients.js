const express = require('express');
const router = express.Router();
const ingredient = require('../models/ingredient');

router.get('/', async (req, res, next) => {
    let ingredients = await ingredient.all();
    res.render('ingredients/index', {title: 'HalfBaked || Ingredients', ingredients: ingredients});
});

//TODO: get.form, post.upsert

module.exports = router;