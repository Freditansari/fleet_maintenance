const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MaintenanceSchema = new Schema({
 
    date: {
      type: Date,
      default: Date.now
    },
    descriptions:{
        type: String,
        required: true

    },
    isClosed: {
        type: Boolean,
        default: false
    },
    vehicle:{
        type: Schema.Types.ObjectId,
        ref: "vehicles"
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref:"comments"
    }]
});

module.exports = Maintenance = mongoose.model('maintenances', MaintenanceSchema);