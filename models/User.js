const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    role:{
      type: String, 
      enum:['Employee', 'Admin'],
      required:true , 
      default: 'Employee'
    },
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = Users = mongoose.model('users', UserSchema);