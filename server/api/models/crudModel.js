
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var Comment = new Schema({
    film: {
        type: String,
        unique: true,
        required: true
    },
    content: {
        type: String
    }
});

var Favorite = new Schema({
    user_id: {
        type: Number,
        unique: true,
        required: true
    },
    film: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('User', User);
module.exports = mongoose.model('Favorite', Favorite);
module.exports = mongoose.model('Comment', Comment);