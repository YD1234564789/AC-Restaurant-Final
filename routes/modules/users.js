const express = require('express')
const router = express.Router()
const passport = require('passport')
// const bcrypt = require('bcryptjs')
// const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})



module.exports = router