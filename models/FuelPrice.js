const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FuelPriceSchema = new Schema({
 
    date: {
      type: Date,
      default: Date.now
    },
    FuelPrice: {
        type: Number, 
        default: 10000
    }
});

module.exports = FuelPrices = mongoose.model('fuelprice', FuelPriceSchema);