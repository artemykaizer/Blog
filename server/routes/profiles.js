const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Profile = require('../models/Profile')
const passport = require('passport')
const isEmpty = require('../validation/isEmpty')


router.get('/', (req, res) => {
    Profile.find().then(profiles => res.send(profiles))
})


router.get('/:profile', (req, res) => {
    Profile.findOne({userId: req.params.profile }, (err, profile) => {
        if(!profile) {
            return res.status(404).send({"profile": "Profile is not exist"})
        } else {
            res.send(profile)
        }
    })
})



router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const userProfile = {};

    isEmpty(req.body.name)       ? null : userProfile.name = req.body.name
    isEmpty(req.body.surname)    ? null : userProfile.surname = req.body.surname
    isEmpty(req.body.middlename) ? null : userProfile.middlename = req.body.middlename
    isEmpty(req.body.bio)        ? null : userProfile.bio = req.body.bio
    isEmpty(req.body.interests)  ? null : userProfile.interests = req.body.interests

    if(Object.keys(userProfile).length === 0) {
        return res.status(500).send({"profile": "You need to provide at least 1 field"})
    } else {
        Profile.findOne({"userId": req.user.id}, (err, profile) => {
            if(!profile) {
                userProfile.userId = req.user.id
                const newUser = new Profile(userProfile)
                newUser.save((err, success) => {
                    return res.send(success)
                })
            } else {
                Profile.findOneAndUpdate({"userId": req.user.id}, userProfile, (err, profile) => {
                    if(!profile) {
                        return res.status(404).send({"error": "There is no profile"})
                    } else {
                        return res.send({...profile._doc, ...userProfile})
                    }
                })
            }
        })
    }
})

router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
   Profile.findOneAndRemove({"userId": req.user.id}, (err, success) => {
       if(success) {
            res.send({"deleted": "Profile is deleted"})
       } else {
           res.status(404).send({"error": "Profile is not exist"})
       }
   })
})

module.exports = router