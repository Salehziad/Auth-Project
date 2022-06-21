"use strict";
const bcrypt = require("bcrypt");
const User = require('../auth/models/users');
const bearer = require("../auth/middleware/bearer");



const edit=  (async(req, res,next) => {
    
   try{ 
        let ID = parseInt(req.params.id);
        const username = req.body.username;
      //   const usernames = req.body;

      //  if const valid = await bcrypt.compare(req.user.id,10 )
      //  console.log("................>>",req.user);

        const found = await  User.findOne({where:{id:ID}})

     if (found) {
      if(username){  // To change the username
         let updates = await found.update({
        username:username
      })
      res.status(201).send({"status":'Update username successfully!',
      "username updated to":updates.username})
      next()


      }else if( req.body.password){ // to change the password
      const password = await bcrypt.hash(req.body.password, 10);
      let updates = await found.update({
       password:password
     })
    res.status(201).send({"status":'Update password successfully!'})
              
     next()
   }
}else{
   res.status(500).send('Please enter valid id !')
}
    }
    catch(e){
res.status(500).send("error update")}

});


module.exports =edit;
