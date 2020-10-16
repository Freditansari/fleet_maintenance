const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MachineHourSchema = new Schema({
    date: {
      type: Date,
      default: Date.now
    },
    machineHourUsed: {
        type: Number,
        default: 0
    },
    totalMachineHour: {
        type: Number,
        default: 0
    },
    Descriptions: {
        type: String, 

    },
    isBillable: {
        type: Boolean,
        default:true
    },
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: "vehicles"
    }
});

module.exports = MachineHours = mongoose.model('machinehours', MachineHourSchema);