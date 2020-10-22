const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const app= express();


const db = require('./config/mongodb').mongoURI;
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());

mongoose.connect(db, { useFindAndModify: false, useNewUrlParser:true ,useUnifiedTopology: true}).then(()=>console.log('Monggo db connected')).catch(err=>console.log(err));

const users = require('./routes/usersRoute');

const vehicle = require('./routes/vehiclesRoute');
const issues = require('./routes/issuesRoute');
const comments = require('./routes/commentsRoute');
const maintenances = require('./routes/maintenanceRoute')
const costs = require('./routes/costsRoute')
const fuels = require('./routes/FuelLogsroute')

//path is used for production build
const path = require('path');

app.use('/api/users', users);
app.use('/api/vehicle', vehicle);
app.use('/api/issues', issues);
app.use('/api/comments', comments);
app.use('/api/maintenance', maintenances)
app.use('/api/costs', costs)
app.use('/api/fuels', fuels)

require('./config/passport')(passport);

app.use(passport.initialize());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));









