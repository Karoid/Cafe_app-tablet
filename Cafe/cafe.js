var express = require('express');
var fs = require('fs');
var router = express.Router();

// middleware that is specific to this router
//router.use(function timeLog(req, res, next) {});
// define the home page route
router.get('/index', function(req, res) {
  fs.readFile('./Cafe/index.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    }else {
      res.end(data)
    }
  })
});
router.get('/introduce.html', function(req, res) {
  fs.readFile('./Cafe/introduce.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    }else {
      res.end(data)
    }
  })
});
router.get('/main.html', function(req, res) {
  fs.readFile('./Cafe/main.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    }else {
      res.end(data)
    }
  })
});
router.get('/menu_page.html', function(req, res) {
  fs.readFile('./Cafe/menu_page.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    }else {
      res.end(data)
    }
  })
});
router.get('/order_check.html', function(req, res) {
  fs.readFile('./Cafe/order_check.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    }else {
      res.end(data)
    }
  })
});
router.get('/order_page.html', function(req, res) {
  fs.readFile('./Cafe/order_page.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    }else {
      res.end(data)
    }
  })
});
router.get('/QnA.html', function(req, res) {
  fs.readFile('./Cafe/QnA.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    }else {
      res.end(data)
    }
  })
});

module.exports = router;
