
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductionSchema = new Schema({
    Date:{
        type: Date,
        default: Date.now
    },
    Overburden: {
        type: Number,
        required: true
    },
    Coals: {
        type: Number, 
        required: true
    },
    StrippingRatio: {
        type: Number, 
        required: true
    }
});

module.exports = Production = mongoose.model('productions', ProductionSchema);