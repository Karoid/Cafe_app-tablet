var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var conn = mongoose.connection;
var User = require('../models/user');
var Qna = require('../models/Qna');
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
      try {
        if (true) { //req.session.username
          //var user = req.session.username
          //console.log(user + "is logged on");
          Qna.find({}, function (err, documents){
            return res.end(ejs.render(data,{data:documents})) //왜 안되는 거지?
          })
          //res.end(ejs.render(data,{data}))
        }else {
          res.end("로그인 해주세요")
        }
      } catch (e){
        console.log(e);
      }
  })
});

//Qna CRUD 라우팅
router.get('/QnA_cu', function(req, res) {
  fs.readFile('./Cafe/QnA_cu.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    }else {
      if (req.session.username) {
        var user = req.session.username
        console.log(user + "is logged on");
      }
      res.end(ejs.render(data,{data:user}))
    }
  })
});
router.post('/QnA_write', function(req, res) {
  try {
    conn.collection('Qna').insert({username:req.body.username,
      title:req.body.title,
      content:req.body.content});
    res.redirect("Qna.html")
  } catch (e) {
    console.log(e);
    res.end(e)
  }
});
router.get('/QnA_d', function(req, res) {

});

//User 로그인
// create a user a new user
router.post("/login",function(req,res){
  console.log(req.body+"login attempt");
  // attempt to authenticate user
  User.getAuthenticated(req.body.username ,req.body.password , function(err, user, reason) {
    if (err) return res.end(JSON.stringify(err))
      // login was successful if we have a user
    if (user) {
      // handle login success
      console.log(user.username+'login success');
      req.session.username = req.body.username
      return res.end(JSON.stringify(user));
    }
    // otherwise we can determine why we failed
    var reasons = User.failedLogin;
    switch (reason) {
      case reasons.NOT_FOUND:
      return res.end('{"err":"아이디가 없습니다"}')
      break;
      case reasons.PASSWORD_INCORRECT:
      return res.end('{"err":"비밀번호가 틀립니다"}')
      break;
      case reasons.MAX_ATTEMPTS:
      return res.end('{"err":"로그인 요청 횟수를 초과하였습니다."}')
      break;
    }
  });
});
router.get("/logout",function(req,res){
  console.log(req.session.username+" is logged out");
  req.session.destroy();  // 세션 삭제
  res.clearCookie('sid'); // 세션 쿠키 삭제
  return res.end()
})
//User 회원가입
router.post("/sign_up",function(req,res){
  console.log(req.body+"sign_up attempt");
  var testUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  // save user to database
  return testUser.save(function(err) {
    if (err) {
      console.log(req.body.username+"log on failed");
      if (err.code == 11000) return res.end('{"err":"'+testUser.username+'은 이미 사용중입니다"}')
      return res.end(JSON.stringify(err))
    }else {
      console.log(req.body+"sign_up success");
      return res.end('{"err":"'+testUser.username+' 가입완료"}')
    }

  })
})


module.exports = router;
