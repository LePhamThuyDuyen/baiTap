const router = require("express").Router();
var AWS = require("aws-sdk");
const uid = require('uuid');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

const tableName = 'SinhVien';
//const bucketName = 'baitapgiuaky';
const bucketUrl = 'https://baitapgiuaky.s3-ap-southeast-1.amazonaws.com/';
//const s3 = new AWS.S3();

let docClient = new AWS.DynamoDB.DocumentClient();
  
//Get all
router.get("/getall", async (req, res) => {
  var params = {
    TableName: tableName,
  };
  docClient.scan(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(
        data
      );
    }
  });
});

//Get with id
router.get("/getonce/:id", async (req, res) => {
  var params = {
    TableName: tableName,
    Key: {
      id: req.params.id
    },
  };
  docClient.get(params, function (err, data) {
    if (err) {
      res.send("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
    } else {
      res.redirect('/');
    }
  });
});

//Create Students
router.post("/create", async (req, res) => {
  var oid = uid.v4()
  var dngStudent = {
    'ten':req.body.ten,
    
    'id':oid,
    'maSV':req.body.maSV,
    'namsinh':req.body.namsinh
  };

  var params = {
      TableName: tableName,
      Item:  SinhVien
  };

  docClient.put(params, function (err, data) {

      if (err) {
        res.send("users::save::error - " + JSON.stringify(err, null, 2));                      
      } else {
        res.redirect('/');        
      }
  });

});

//Update Student
router.post("/update", async (req, res) => {

  var params = {
    TableName: tableName,
    Key: { "id": req.body.id },
    UpdateExpression: "set stname=:n,avatar=:a,mssv=:ms,birth=:b",
    ExpressionAttributeValues: {
      ':n':req.body.ten,
      
      ':ms':req.body.maSV,
      ':b':req.body.namsinh
    },
    ReturnValues: "UPDATED_NEW"
  };

  docClient.update(params, function (err, data) {
      if (err) {
        res.send("users::save::error - " + JSON.stringify(err, null, 2));                      
      } else {
        res.redirect('/');                      
      }
  });
});

//Delete Student
router.get("/delete/:id", async (req, res) => {
  var params = {
    TableName: tableName,
    Key: {
        "id": req.params.id
    }
  };

  docClient.delete(params, function (err, data) {

      if (err) {
        res.send("users::delete::error - " + JSON.stringify(err, null, 2));
      } else {
        res.redirect('/');
      }
  });
});

module.exports = router;
