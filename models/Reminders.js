const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReminderSchema = new Schema({
    Descriptions: {
        type: String, 
        required: true
    },
    dueDate :{
        type: Date,
        default: Date.now + 14*24*60*60*10000
    },
    createdBy : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: "vehicles"
    }
});

module.exports = Reminders = mongoose.model('reminders', ReminderSchema);