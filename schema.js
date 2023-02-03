const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {type:String , require: true},
    email: {type:String , require: true , unique: true},
    password: {type:String , require: true},
    quote: {type:String}
},{collection: 'userInformation'}
)

const model = mongoose.model('userInformation' , User);

module.exports = model;