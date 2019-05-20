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

//path is used for production build
const path = require('path');

app.use('/api/users', users);
app.use('/api/vehicle', vehicle);

require('./config/passport')(passport);

app.use(passport.initialize());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));









