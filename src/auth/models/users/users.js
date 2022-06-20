'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
require('dotenv').config();
const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('zw1w2', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }, //new
    role: {
      type: DataTypes.ENUM('admin', 'writer', 'editor', 'user'),
      defaultValue: 'user',
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({
          username: this.username
        }, process.env.SECRET);
      }
    }, //new
    uuCode:{
      type: DataTypes.STRING,
      required: true,
    },
    isVerify:{
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    },
    actions: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = { // acces control list
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete'],
        }
        return acl[this.role];
      }
    }
  });
  model.beforeCreate=async function (user) {
    let hashedPass =await bcrypt.hash(user.password, 10);
    return hashedPass;
  };
  model.sendEmail=async function(user){
    const email = user.email;
    let userMail=await this.findOne({where:{email:email}})
    // console.log({userMail});
    let code=userMail.uuCode;
    console.log('email',{code});
    let transporter =nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS//dotenv
      },
      port:465,
      host:'stmp.gmail.com'
    })
    const msg={
      from: 'salehziad1999@gmail.com', // sender address
      to: `${email}`, // list of receivers
      subject: "Sign Up validation", // Subject line
      text: `Long time no see welcome to our server use this code ${code} to verify your email`, // plain text body
    }
    const info = await transporter.sendMail(msg);
  }
  model.authenticateBasic = async function (username, password) {
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',username,password);
    const user = await this.findOne({
      where: {
        username: username
      }
    });
    // console.log({user});
    // let x=user.password
    // console.log({password});
    const valid = await bcrypt.compare(password, user.password);
    // console.log({valid});
    if (valid) {
      return user;
    }
    throw new Error('Invalid User');
  }

  // Bearer AUTH: Validating a token
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      // console.log({parsedToken});
      const user = this.findOne({
        where: {
          username: parsedToken.username
        }
      });
      // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',{user});
      if (user) {
        return user;
      }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  }

  return model;
}

module.exports = userSchema;