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
    //todo comments 
});

module.exports = Maintenance = mongoose.model('maintenances', MaintenanceSchema);