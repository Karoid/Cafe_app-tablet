var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var conn = mongoose.connection;
var User = require('../models/user');
var Qna = require('../models/qna');
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
    } else {
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
    } else {
      if (req.session.username) {
        var user = req.session.username
        console.log(user + "is logged on");
      }
      res.end(ejs.render(data,{data:user}))
    }
  })
});
router.get('/main.html/:redirect_url?', function(req, res) {
  fs.readFile('./Cafe/main.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    } else {
      if (req.session.username) {
        var user = req.session.username
        console.log(user + "is logged on");
      }
      res.end(ejs.render(data,{data:user, redirect:req.params.redirect_url}))
    }
  })
});
router.get('/menu_page.html', function(req, res) {
  fs.readFile('./Cafe/menu_page.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    } else {
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
    } else {
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
    } else {
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
        needtologin(res,req,"QnA.html")
        //var user = req.session.username
        //console.log(user + "is logged on");
        Qna.find({}, function (err, documents){
          return res.end(ejs.render(data,{data:documents})) //왜 안되는 거지?
        })
        //res.end(ejs.render(data,{data}))
      } catch (e){
        console.log(e);
      }
  })
});

//Qna CRUD 라우팅
router.get('/QnA_cu/:id?', function(req, res) {
  fs.readFile('./Cafe/QnA_cu.html','utf8',function(err,data){
    if (err) {
      console.log(err);
    } else {
      needtologin(res,req,"QnA.html")
      var user = req.session.username
      console.log(user + "is logged on");
      if (req.params.id) {
        //업데이트 하러 왔을때
        Qna.find({_id:req.params.id}, function (err, documents){
          return res.end(ejs.render(data,{data:documents[0], user:req.session.username})) //왜 안되는 거지?
        })
      }else{
      res.end(ejs.render(data,{data:{}, user:req.session.username}))
      }
    }
  })
});
router.post('/QnA_write/:id?', function(req, res) {
  try {
    needtologin(res,req,"QnA.html")
    if (req.params.id) {
      Qna.findOne({ _id: req.params.id }, function (err, doc){
        doc.username = req.body.username;
        doc.title = req.body.title;
        doc.content = req.body.content;
        doc.save();
      });
      res.redirect("/cafe/Qna.html")
    }else{
      conn.collection('Qna').insert({username:req.body.username,
        title:req.body.title,
        content:req.body.content});
        res.redirect("/cafe/Qna.html")
    }
  } catch (e) {
    console.log(e);
    res.end(e)
  }
});
router.get('/QnA_d/:id', function(req, res) {
  try {
    needtologin(res,req,"QnA.html")
    Qna.find({_id:req.params.id }, function(err, documents){
      console.log(documents[0].username,req.session.username,req.session.username != documents[0].username);
      if (req.session.username != documents[0].username) {
        return res.end("글쓴이와 로그인 정보가 다릅니다")
      }else{
        Qna.find({_id:req.params.id }).remove().exec();
        res.redirect("back")
      }
    })
  } catch (e) {
    console.log(e);
    res.end(e)
  }
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
router.post("/nonuserlogin",function(req,res){
  req.session.username = "non_user"
  console.log(req.session.username+"login attempt");
  res.end('{"err":"nonuser 로그인."}')
});

module.exports = router;


function needtologin(res,req,redirect_url){
  if (!req.session.username) {
    res.redirect("main.html/"+redirect_url)
  }
}
function usernameMustMatch(err,req,res, documents){
  console.log(documents);
  if (req.params.username != documents[0].username) {
    return res.end("글쓴이와 로그인 정보가 다릅니다")
  }
}
