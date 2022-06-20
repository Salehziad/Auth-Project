'use strict';

const express = require('express');
const dataModules = require('../../models-connections');
const bearerAuth = require('../../auth/middleware/bearer');
const acl = require('../../auth/middleware/aci-actions')
const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});
//user:read:get
//writer:read:get,create:post
//editor //////,//////,update:put
//admin //////,//////,update:put ,delete:delete

router.get('/:model', handleGetAll); //user
router.get('/:model/:id', handleGetOne); //user
router.post('/:model', handleCreate); // writer admin editor:update
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);
router.delete('/:model', handleDeleteAll)
// console.log(req);
async function handleGetAll(req, res) {
  console.log("hiiiiiiiiiiiiiii");
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  // let x=req.body.status;
  // console.log(x);
  if(req.body.status===true){
    let theRecord = await req.model.delete(id)
    res.status(200).send("goal is done");
  }else {
    console.log('falsssssss');
    res.send("goal didn't done ")
  }
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}

async function handleDeleteAll(req, res) {
  let deletedRecords = await req.model.delete();
  res.status(200).json(deletedRecords);
}

module.exports = router;