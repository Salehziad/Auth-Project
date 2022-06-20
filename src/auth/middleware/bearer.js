'use strict';

const { users } = require('../../models-connections');
// console.log({users});
module.exports = async(req, res, next) => {
  // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkk");

  try {

    if (!req.headers.authorization) { next('Invalid Login') }
    // console.log({token});
    const token = req.headers.authorization.split(' ').pop();
    // console.log({token});
    // console.log('passsssssssssssssssssssssssssssssssssssssssssssssssssss');
    let x = await users.authenticateToken(token);
    req.user=x;
    // let x=await users.authenticateToken(token);
    // console.log({x});
    next();
      // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>',{x});
      // req.user = x;
    //   // req.token = x.token;
    //   // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>',req.user);
    //   // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>',req.token);
    //   next();
    // })
    // .catch((e)=>{
    //   res.status(403).send('Invalid Login');
    // })
 



  } catch (e) {
    // console.error(e);
    res.status(403).send('Invalid Login');
  }
}
