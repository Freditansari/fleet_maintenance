const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FuelSchema = new Schema({
    date:{
        type: Date,
        default:Date.now
    },
    FuelPrice: {
        type: Number,
        required: true
    }
 
});

module.exports = Fuels = mongoose.model('fuels', FuelSchema);