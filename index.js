const mongoose = require('mongoose')

const db = require('./config/mongodb').mongoURI;
mongoose.connect(db, { useFindAndModify: false, useNewUrlParser:true }).then(()=>console.log('Monggo db connected')).catch(err=>console.log(err));