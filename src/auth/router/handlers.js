'use strict';

const {
  users
} = require('../../models-connections');

const { v4: uuidv4 } = require('uuid');
async function handleSignup(req, res, next) {
  // empty username/pssword 400
  // username already used 409
  try {
    const user = req.body
    if (Object.keys(user).length === 0) {}
    let x = user.username;
    // console.log({
    //   x
    // });
    if (x.length === 0) {
      res.status(403).send('no data entered')
    }
        let UuCode=uuidv4();
    console.log({UuCode});
    var hashed = await users.beforeCreate(user);
    let userRecord = await users.create({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
      role: req.body.role,
      uuCode:UuCode
    });

    let mailed = await users.sendEmail(user);
    const output = {
      username: userRecord.username,
      email:userRecord.email,
      isVerify:userRecord.isVerify,
      role:userRecord.role,
      createdAt:userRecord.createdAt,
      updatedAt:userRecord.updatedAt
    };
    res.status(201).json(output);
  } catch (e) {
    // console.error(e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  // console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuu',req.user);
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    let x=req.user.isVerify;
    console.log({x});
    if(x===true){
      console.log("yesssssss");
      res.status(200).json(user);
    }else{
      res.send('email did not verified please check your email')
    }

  } catch (e) {
    // console.error(e);
    next(e);
  }
}
const base64 = require('base-64');
const bcrypt = require('bcrypt');

async function handleGetUsers(req, res, next) {
  try {
    // let come = req.user;
    // console.log("kkkkkkkkkkkkkkkkkkkk",come);
    // console.log({come});
    const userRecords = await users.findAll();
    // console.log({userRecords});
    // const list = userRecords.map(user => req.user);
    res.status(200).json(userRecords);
  } catch (e) {
    console.error(e);
    next(e);
  }
}
async function handleDeleteAccount(req, res, next) {
  try {
    let id = req.params.id - '';
    console.log({
      id
    });
    let tokenId = req.user.id
    if (tokenId === id) {
      let deletedUser = await users.destroy({
        where: {
          id: id
        }
      });
      // let x=await users.findAll();
      res.send('account deleted')
      next();
    } else {
      next('you have entered valid id')
    }
  } catch (e) {
    console.log(e);
  }
}
async function handleDeleteAnyUser(req, res, next) {
  try {
    let id = req.params.id - ''; // params id
    console.log({
      id
    });
    let deletedUser = await users.destroy({
      where: {
        id: id
      }
    });
    // let x=await users.findAll();
    res.send('account deleted')
    next();
  } catch (e) {
    console.log(e);
  }
}

async function verifyCode(req, res, next) {
  try {
    let code = req.body.code;
    // console.log('verify',code);
    let user=await users.findOne({where:{uuCode:code}});
    // console.log({user});
    let y=user.isVerify;
    console.log({y});
    let usercode=user.uuCode;
    // console.log(usercode);
    if(code===usercode){
      console.log('ggggggggggggggggggg');
      // user.isVerify=true;
      let newUser=await user.update({ isVerify: true })
      let h=await users.findAll();
      res.send(newUser)
      next();
    }
  } catch (e) {
    console.log(e);
  }
}
// 7b3a21de-121a-44e1-83f4-8e89e530b09e
// 7b3a21de-121a-44e1-83f4-8e89e530b09e
module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleDeleteAccount,
  handleDeleteAnyUser,
  verifyCode
}