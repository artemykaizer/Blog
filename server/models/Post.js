const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            authorId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            authorName: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

module.exports = mongoose.model('Post', PostSchema)