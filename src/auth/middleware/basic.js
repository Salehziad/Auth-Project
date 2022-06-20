'use strict';

const base64 = require('base-64');
const { users } = require('../../models-connections');

module.exports = async (req, res, next) => {
  // console.log("hhhhhhhhh");

   if (!req.headers.authorization) {
    // console.log("hhhhhhhhh");
    next()
     return _authError(); }

  let basic = req.headers.authorization.split(' ').pop();
  // console.log({basic});
  // let encodedBasic=basic.pop();
  // console.log({encodedBasic});
  // let decodedValue = base64.decode(encodedBasic);
  // console.log({decodedValue});
  let [username, pass] =base64.decode(basic).split(':');
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',username,pass);
  try {
    // if(req.header===null){
    //   next('no usernama and password');
    // }
    // req.user = await users.authenticateBasic(username, pass).then((x)=>{
      // console.log({x});

    req.user=await users.authenticateBasic(username, pass);
      // console.log('????????????',req.user);
      next();
    // })
    // .catch((e) => {
    //   // console.error(e);
    //   res.status(403).send('Invalid Login');
    // });

  } catch (e) {
    // console.error(e);
    res.status(403).send('Invalid Login');
    // next('Invalid Login')
  }

}

