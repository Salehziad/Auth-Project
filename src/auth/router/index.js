'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const acl=require('../middleware/aci-actions');
// console.log(basicAuth);

const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleDeleteAccount,
  handleDeleteAnyUser,
  verifyCode,
  editAccount
} = require('./handlers.js');


authRouter.post('/signup', handleSignup);
authRouter.post('/verify',verifyCode)
authRouter.post('/signin', basicAuth, handleSignin);
authRouter.post('/users',  handleGetUsers);
authRouter.delete('/delete/:id',bearerAuth,acl('read'),handleDeleteAccount);
authRouter.delete('/deleteAny/:id',bearerAuth,acl('delete'),handleDeleteAnyUser)
authRouter.put("/change/:id",bearerAuth,editAccount)


authRouter.get('/img', bearerAuth, acl('read'), (req, res) => {
  res.send('you can read this image');
});
authRouter.post('/img', bearerAuth, acl('create'), (req, res) => {
  res.send('new image was created');
});
authRouter.put('/img', bearerAuth, acl('update'), (req, res) => {
  res.send('image updated');
});
authRouter.delete('/img', bearerAuth, acl('delete'), (req, res) => {
  res.send('image deleted');
});






module.exports = authRouter;
