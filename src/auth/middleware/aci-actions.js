'use strict';
module.exports=(action)=>(req,res,next)=>{
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
    try {
        if (req.user.actions.includes(action)) {
            next();
        } else {
            next('access denied')
        }
    } catch (e) {

    }
}
