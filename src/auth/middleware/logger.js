'use strict';

const { application } = require("express");

const logger = (req, res, next) => {
  console.log('REQUEST:', req.method, req.path);
  next();
};

module.exports = logger;

// 1-auth login signup token 
// 2-clothes food >> routes 
