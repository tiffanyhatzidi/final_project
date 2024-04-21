const express = require('express');
const router = express.Router();
const User = require('../models/user');
const helpers = require('./helpers');
const recipeUser = require('../models/recipe_user');
const recipe = require('../models/recipe');

/* Register */
router.get('/register', async (req, res, next) => {
    if (helpers.isLoggedIn(req, res)) {return}
    res.render('users/register', { title: 'HalfBaked || Registration' });
  });

router.post('/register', async (req, res, next) => {
    console.log('Register: ' + JSON.stringify(req.body));
    if (helpers.isLoggedIn(req, res)) {return}
    const user = await User.getByEmail(req.body.email)
    if (user) {
      res.render('users/register', {
        title: 'HalfBaked || Login',
        flash: {
          type: 'danger',
          intro: 'Error!',
          message: `A user with this email already exists`}
      });
    } else {
      await User.add(req.body);
      req.session.currentUser = await User.login(req.body); 
      req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `the user has been created!`,
      };
      res.redirect(303, '/');
    }
  });


 /* Login */ 
router.get('/login', async (req, res, next) => {
    res.render('users/login', { title: 'HalfBaked || Login' });
  });

router.post('/login', async (req, res, next) => {
    if (helpers.isLoggedIn(req, res)) {return}
    console.log('Login: ' + JSON.stringify(req.body));
    const user = await User.login(req.body)
    if (user) {
      req.session.currentUser = user
      req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'You are now logged in',
      };
      res.redirect(303, '/');
    } else {
      res.render('users/login', {
        title: 'HalfBaked || Login',
        flash: {
          type: 'danger',
          intro: 'Error!',
          message: `Wrong email and password combination or the user could not be found`}
      });
    }
  });


  /* Logout */
router.post('/logout', async (req, res, next) => {
    delete req.session.currentUser
    req.session.flash = {
      type: 'info',
      intro: 'Success!',
      message: 'You are now logged out',
    };
    res.redirect(303, '/');
  }); 

/* Profile */
router.get('/profile', async (req, res, next) => {
    if (helpers.isNotLoggedIn(req, res)) {
      return
    }
    //recipes-users
    const recipesUser = await recipeUser.AllForUser(req.session.currentUser);
    recipesUser.forEach((recipeUser) => {
        recipeUser.recipe = recipe.get(recipeUser.recipeId)
    })
    res.render('users/profile',
      { title: 'HalfBaked || Profile',
        user: req.session.currentUser,
        recipesUsers: recipesUser });
  });

 module.exports = router;
  