const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    email : {type: String, required: true, unique},
    password : {type: String , required: true}
});

userSchema.plugin(uniqueValidator);

module.exports= mongoose.model('User',userSchema);