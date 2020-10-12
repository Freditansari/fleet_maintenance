const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CostSchema = new Schema({
  
    date: {
      type: Date,
      default: Date.now
    },
    description:{
        type: String, 
        required: true
    },
    cost: {
        type: Number,
        required:true,
        default:0
    },
    Maintenance:{
        type: Schema.Types.ObjectId,
        ref: 'maintenances'
    }
});

module.exports = Costs = mongoose.model('costs', CostSchema);