
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
    firstname: {
        type: String,
        required: 'Prénom'
    },
    lastname: {
        type: String,
        required: 'Nom'
    },
    email: {
        type: String,
        required: 'Adresse mail'
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('User', User);