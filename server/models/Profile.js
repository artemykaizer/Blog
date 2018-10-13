const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String
    },
    middlename: {
        type: String
    },
    surname: {
        type: String,
    },
    bio: {
        type: String,
    },
    interests: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    } 
})

module.exports = mongoose.model('Profile', ProfileSchema)