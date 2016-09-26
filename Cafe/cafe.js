var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var router = express.Router();

// middleware that is specific to this router
router.use(cookieParser());
router.use(session({
  key: 'sid', // 세션키
  secret: 'secret', // 비밀키
  cookie: {
    maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
  },
  resave: false,
  saveUninitialized: true
}));
//router.use(function timeLog(req, res, next) {});
// define the home page route
router.get('/index', function(req, res) {
  fs.readFile('./Cafe/index.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    }else {
      console.log(req.session);
      if (req.session.username) {
        var user = req.session.username
        console.log(user + "is logged on");
      }
      res.end(ejs.render(data,{data:user}))
    }
  })
});
router.get('/introduce.html', function(req, res) {
  fs.readFile('./Cafe/introduce.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    }else {
      console.log(req.session);
      if (req.session.username) {
        var user = req.session.username
        console.log(user + "is logged on");
      }
      res.end(ejs.render(data,{data:user}))
    }
  })
});
router.get('/main.html', function(req, res) {
  fs.readFile('./Cafe/main.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    }else {
      console.log(req.session);
      if (req.session.username) {
        var user = req.session.username
        console.log(user + "is logged on");
      }
      res.end(ejs.render(data,{data:user}))
    }
  })
});
router.get('/menu_page.html', function(req, res) {
  fs.readFile('./Cafe/menu_page.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    }else {
      console.log(req.session);
      if (req.session.username) {
        var user = req.session.username
        console.log(user + "is logged on");
      }
      res.end(ejs.render(data,{data:user}))
    }
  })
});
router.get('/order_check.html', function(req, res) {
  fs.readFile('./Cafe/order_check.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    }else {
      console.log(req.session);
      if (req.session.username) {
        var user = req.session.username
        console.log(user + "is logged on");
      }
      res.end(ejs.render(data,{data:user}))
    }
  })
});
router.get('/order_page.html', function(req, res) {
  fs.readFile('./Cafe/order_page.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    }else {
      console.log(req.session);
      if (req.session.username) {
        var user = req.session.username
        console.log(user + "is logged on");
      }
      res.end(ejs.render(data,{data:user}))
    }
  })
});
router.get('/QnA.html', function(req, res) {
  fs.readFile('./Cafe/QnA.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    }else {
      console.log(req.session);
      if (req.session.username) {
        var user = req.session.username
        console.log(user + "is logged on");
      }
      res.end(ejs.render(data,{data:user}))
    }
  })
});

module.exports = router;
