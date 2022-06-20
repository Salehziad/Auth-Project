'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const logger=require('./auth/middleware/logger');
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/router/index.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
  res.send("welcome heroku");
})
const router = require('./api.v2/router/v1');
const routerV2=require('./api.v2/router/v2')
// Routes
app.use('/users',authRoutes);
app.use('/api/v1',router);
app.use('/api/v2',routerV2);
// Catchalls
app.use(logger)
app.use(notFound);
app.use(errorHandler);




module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
