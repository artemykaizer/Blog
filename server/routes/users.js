const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User')
const validateRegistration = require('../validation/validateRegistration')
const validateLogin = require('../validation/validateLogin')
const bcrypt = require('bcryptjs');
const secretKey = require('../passportKey').secret
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.get('/', (req, res) => {
    User.find().then(users => {
        res.send(users.map(user => {
            return {
                _id: user._id,
                name: user.name
            }
        }))
    })
})

router.post('/register', (req, res) => {
    const errors = validateRegistration(req.body.email, req.body.password, req.body.name); 
    if(Object.keys(errors).length > 0) {
        return res.status(500).send(errors)
    }

    console.log(req.body)
    User.findOne({email: req.body.email}, function (err, user) {
        if(!user) {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, pass) => {
                    newUser.password = pass
                    newUser.save((err, suc) => {
                        if(err) res.send(err)
                        res.send(suc)
                    })
                })
            })
        } else {//PROBLEM
            errors.email = "Email is already taken"
            res.status(500)
            res.send(errors)
        }
    })
})

router.post('/login', (req, res) => {
    const errors = validateLogin(req.body.email, req.body.password); 
    if(Object.keys(errors).length > 0) {
        return res.status(500).send(errors)
    }
    
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) {
            res.status(404).send({"email": "There is no users with this email"})
        } else {
            console.log(req.body.password, user.password)
            bcrypt.compare(req.body.password, user.password)
                .then(isValid => {
                    if(isValid) {
                        const userData = {
                            id: user._id,
                            name: user.name
                        }
    
                        jwt.sign(userData, secretKey, (error, token) => {
                            res.send({"success": true, "token": 'Bearer '+ token, id: userData.id});
                        });
                    } else {
                        res.status(500).send({"password": "Password incorrect"})
                    }
                })
        }
    })
})

router.get('/user/:id', (req, res) => {
    //req.params.id
    User.findById(req.params.id, (err, user) => {
        if(!user) {
            res.status(404).send({"user": "User not exist"})
        } else {
            res.send({
                name: user.name,
                email: user.email
            })
        }
    })
})

module.exports = router