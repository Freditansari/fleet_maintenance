//model to store roles options

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RolesSchema = new Schema({
    Role:{
        type: String
    }
});

module.exports = Roles = mongoose.model('roles', RolesSchema);