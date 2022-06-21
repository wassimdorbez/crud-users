const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
Email:String,
FirstName:String,
LastName:String,
Age:String,


},{timestamps: true})

module.exports=mongoose.model('users', UserSchema)