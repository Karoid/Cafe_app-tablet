var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var User = require('../models/user');
var router = express.Router();
//middleware
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
// define the home page route
router.get('/',function(req,res){
  fs.readFile('./User/index.html','utf8',function(err,data){
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
})
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
