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
    dueDate: {
        type: Date,
        default: ()=> Date.now() + 14*24*60*60*10000
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref:"comments"
    }],
    costs:[{
        type: Schema.Types.ObjectId,
        ref: 'costs'
    }]
});

module.exports = Maintenance = mongoose.model('maintenances', MaintenanceSchema);