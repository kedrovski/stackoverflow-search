const express = require('express');
const cors        = require('cors');
const app         = express();
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const router = require('./server/routes/router');
const config = require('./server/config/config');

// get our request parameters
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
 
// log to console. Disable it for Release.
app.use(morgan('dev'));
 
// Use the passport package in our application
app.use(passport.initialize());

// CORS Support
app.use(cors({credentials: true, origin: '*'}));

mongoose.connect('mongodb://localhost:27017/stackoverflow-search').then(() => console.log('Connected to MongoDB successfully'))
 .catch(err => {
     console.error('Could not connect to MongoDB:‌', err)
     throw err;
});

app.get('/', function(req, res) {
    res.sendFile("index.html", { root: __dirname + "/client" });
});

// pass passport for configuration
require('./server/config/passport')(passport);

// bundle our routes
var apiRoutes = express.Router();

// work with routes
router.route(passport, apiRoutes);

// connect AngularJS client
app.use(express.static(path.join(__dirname, 'client')));

// connect the API routes under /api/*
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.status(404).send(`<div style="width:100%;height:100vh;background-color:#f2f2f2;text-align:center;"><p style="text-align:center;padding-top:50px;font-size:18px;font-weight:600;text-transform:uppercase;"> - Страница не найдена, попробуйте вернуться на главную <a style="color:blue;" href="https://${config.host}">${config.host}</a></p></div>`);
});

// Start the server
app.listen(config.port);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //SKIP checking PC SSL certificate
console.log('Application listening on port: ' + config.port);
