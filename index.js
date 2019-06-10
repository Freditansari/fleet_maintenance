const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const app= express();


const db = require('./config/mongodb').mongoURI;
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());

mongoose.connect(db, { useFindAndModify: false, useNewUrlParser:true }).then(()=>console.log('Monggo db connected')).catch(err=>console.log(err));

const users = require('./routes/usersRoute');
const vehicle = require('./routes/VehiclesRoute')
const repairOrder = require('./routes/RepairOrderRoutes');
const breakDowns = require('./routes/BreakDownsRoutes');

//path is used for production build
const path = require('path');

app.use('/api/users', users);
app.use('/api/vehicle', vehicle);
app.use('/api/repairorders',repairOrder);
app.use('/api/breakdowns',breakDowns);

require('./config/passport')(passport);

app.use(passport.initialize());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));









