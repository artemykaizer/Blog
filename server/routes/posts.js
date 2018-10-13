const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post')
const validatePost = require('../validation/validatePost')
const passport = require('passport')
const isEmpty = require('../validation/isEmpty')

//Get all posts
router.get('/', (req, res) => {
    Post.find().then(posts => res.send(posts))
})

//Create post
router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = validatePost(req.body.text, req.body.header)
    if(Object.keys(errors).length > 0) {
        return res.status(500).send(errors)
    }

    const newPost = new Post({
        authorId: req.user.id,
        authorName: req.user.name,
        text: req.body.text,
        header: req.body.header
    })
    newPost.save((err, post) => {
        res.send(post)
    })
})

//Get single post
router.get('/:id', (req, res) => {
    console.log(req.params)
    Post.findById(req.params.id, (err, post) => {
        if(!post) {
            res.status(404).send({"post": "Post is not exist"})
        } else {
            res.send(post)
        }
    })
})

//Delete post
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findByIdAndDelete(req.params.id, (err, post) => {
        if(!post) {
            res.status(404).send({"post": "Post is not exist"})
        } else {
            Post.find().then(posts => res.send(posts))
        }
    })
})

//Edit post
router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = validatePost(req.body.text, req.body.header)
    if(Object.keys(errors).length > 0) {
        return res.status(500).send(errors)
    }

    const editedPost = {
        text: req.body.text,
        header: req.body.header
    }

    Post.findByIdAndUpdate(req.params.id, editedPost, (err, post) => {
        if(!post) {
            res.status(404).send({"post": "Post is not exist"})
        } else {
            res.send({...post._doc, text: editedPost.text, header: editedPost.header })
        }
    })
})


//Add comment
router.post('/:id/comments', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log(req.body)
    if(isEmpty(req.body.text)) {
        res.status(500).send({"message": "Message required"})
    } 

    Post.findById(req.params.id, (err, post) => {
        const newComment = {
            authorId: req.user._id,
            authorName: req.user.name,
            text: req.body.text
        }

        post.comments.push(newComment)
        post.save((err, succes) => {
            res.send(succes) //PROBLEM
        })
    })
} )

//Delete comment
router.delete('/:id/comments/:comment', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if(post.comments.findIndex(comment => comment._id == req.params.comment) === -1) {
            return res.status(404).send({"comment": "There is no comments with that ID"})
        }
        const newComments = post.comments.filter(comment => comment._id != req.params.comment)
        post.comments = newComments
        post.save((err, succes) => {
            res.send(post)
        })
    })
} )


module.exports = router
