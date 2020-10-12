const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FuelLogSchema = new Schema({
    date: {
      type: Date,
      default: Date.now
    },
    FuelConsumed: {
        type: Number,
        required: true
    },
    FuelPrice:{
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

module.exports = FuelLogs = mongoose.model('fuellogs', FuelLogSchema);