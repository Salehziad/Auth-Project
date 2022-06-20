'use strict';

// Start up DB Server
const { db } = require('./src/models-connections');
db.sync()
  .then(() => {

    // Start the web server
    require('./src/server.js').start(process.env.PORT);
  });

