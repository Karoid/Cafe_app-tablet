var express = require('express'); // 웹서버 사용
var app = express();
var fs = require('fs'); // 파일 로드 사용.
var http = require('http');
var server = http.createServer(app);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
async = require("async");
mongoose.connect('mongodb://localhost:27017/test',function(err){
      if (err){
        console.log("connection failed")
        throw err;
      }
});
var conn = mongoose.connection;
var User = require('./models/like'); //모듈화 해놓은 like스키마 불러오기
var Page_data = require('./models/page_data');
var Item_data = require('./models/item_data');
var Page_count = require('./models/page_count');
var Item_count = require('./models/item_count');
var User = require('./models/user');
var multer = require('multer');
var path = require('path')
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log(req.body);
  next();
});
app.use(express.cookieParser());
app.use(express.session({
  key: 'sid', // 세션키
  secret: 'secret', // 비밀키
  cookie: {
    maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
  }
}));
// 포트 설정
app.listen(80, function () {
console.log('Server Start http://localhost/test.html');
console.log('DB에 들어가고 싶다면 ./mongo를 이용');
});

// 라우팅 설정
<<<<<<< HEAD
app.get('/',function(req,res){
  fs.readFile('view/index.ejs','utf8',function(err,data){
    res.send(ejs.render(data,{data:null}))
  })
})
//테블릿 라우팅
=======
// 라우팅 설정
app.get('/',function(req,res){
  fs.readFile('view/index.html','utf8',function(err,data){
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
})

>>>>>>> c7d32ff6882b18792000fbfe601bb304128c7803
app.get('/index.html', function (req, res) { // 웹서버 기본주소로 접속 할 경우 실행 . ( 현재 설정은 localhost 에 3303 port 사용 : 127.0.0.1:3303 )
fs.readFile('index.html', function (error, data) { // index.html 파일 로드 .
if (error) {
console.log(error);
} else {
res.writeHead(200, { 'Content-Type': 'text/html' }); // Head Type 설정 .
res.end(data); // 로드 html response .
}
});
});
app.get('/today.html', function (req, res) { // 웹서버 기본주소로 접속 할 경우 실행 . ( 현재 설정은 localhost 에 3303 port 사용 : 127.0.0.1:3303 )
fs.readFile('today.html', function (error, data) { // index.html 파일 로드 .
if (error) {
console.log(error);
} else {
res.writeHead(200, { 'Content-Type': 'text/html' }); // Head Type 설정 .
res.end(data); // 로드 html response .
}
});
});
app.get('/best.html', function (req, res) { // 웹서버 기본주소로 접속 할 경우 실행 . ( 현재 설정은 localhost 에 3303 port 사용 : 127.0.0.1:3303 )
fs.readFile('best.html', function (error, data) { // index.html 파일 로드 .
if (error) {
console.log(error);
} else {
res.writeHead(200, { 'Content-Type': 'text/html' }); // Head Type 설정 .
res.end(data); // 로드 html response .
}
});
});

app.get('/admin.html', function (req, res) { // 웹서버 기본주소로 접속 할 경우 실행 . ( 현재 설정은 localhost 에 3303 port 사용 : 127.0.0.1:3303 )
fs.readFile('admin.html', function (error, data) { // index.html 파일 로드 .
if (error) {
console.log(error);
} else {
res.writeHead(200, { 'Content-Type': 'text/html' }); // Head Type 설정 .
res.end(data); // 로드 html response .
}
});
});
app.use(express.static(__dirname + '/public'));
var storage_main = multer.diskStorage({
  destination: './public/img/main_img',
  filename: function (req, file, cb) {
       cb(null, Date.now() + path.extname(file.originalname))
  }
})

var upload_main = multer({ storage: storage_main })

app.use(express.static(__dirname + '/public'));
var storage_today = multer.diskStorage({
  destination: './public/img/item_img',
  filename: function (req, file, cb) {
       cb(null, Date.now() + path.extname(file.originalname))
  }
})

var upload_today = multer({ storage: storage_today })
/* Ajax call */
//크로스 오리진 문제 해결
app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});
//페이지 생성
app.post('/make_page', upload_main.single('file'), function(req,res){
      //console.log(req.body); //form fields
      //console.log(req.file); //form files
      //path.extname(req.file)
      var testable,todayable,bestable;
      if(req.body.testable=="true")
        testable = true;
      else
        testable = false;
      if(req.body.todayable=="true")
        todayable = true;
      else
        todayable = false;
      if(req.body.bestable=="true")
        bestable = true;
      else
        bestable = false;
      Page_data.find({todayable:"true"}).exec(function (err,doc){
        if(todayable==true)
        {
          for(var i=0;i<doc.length;i++){
            //console.log(doc[i]);
            doc[i].todayable="false";
            doc[i].save();
          }
        }
      })
      var count;
      Page_count.find().lean().exec(function (err,doc){
      //console.log(doc[0].value)
      count=doc[0].value;
      //console.log("testable:"+testable+"todayable:"+todayable+"bestable"+bestable+"page_index:"+count+"page_info:"+req.body.page_info+"item_name:"+req.body.item_name+"img_dir:"+req.file.path.split('public')[1]);
      try{
             conn.collection('Page_data').insert({page_index:count,page_info:req.body.page_info,item_name:req.body.item_name,img_dir:req.file.path.split('public')[1],testable:testable,todayable:todayable,bestable:bestable});
      conn.collection('page_count').update({value:count},{value:count+1});
      }
      catch(err){}
      res.end("done");
      })



});

app.post('/make_item', upload_today.single('file'), function(req,res){
      //console.log(req);
      //console.log(req.body);
      var count;
      Item_count.find().lean().exec(function (err,doc){
      //console.log(doc[0])
      count=doc[0].item_count;
      //console.log("page_index:"+count+"page_info:"+req.body.page_info+"item_name:"+req.body.item_name+"img_dir:"+req.file.path.split('public')[1]);
      try{
             conn.collection('Item_data').insert({item_index:count,item_name:req.body.item_name,item_price:req.body.item_price,img_dir:req.file.path.split('public')[1],like:req.body.like,item_discount:"False"});
      conn.collection('item_count').update({item_count:count},{item_count:count+1});
      }
      catch(err){
        console.log(err)
      }
      })
      res.end("good");
      //res.redirect("../admin.html#/item");
});

//페이지 삭제
app.post('/delete_page', function(req, res) {
    console.log("get");
    console.log(req.body.page_index);

    //페이지 하나남았을때 삭제하면 새로고침이 안됌 왜그럴까??
    Page_data.find({page_index:req.body.page_index}).exec(function (err,doc){
<<<<<<< HEAD
                        var filePath = doc[0].img_dir;
                        //console.log(filePath);

=======

                        var filePath = doc[0].img_dir;
                        console.log(filePath);
                        console.log(doc[0].img_dir);

>>>>>>> c7d32ff6882b18792000fbfe601bb304128c7803
                        fs.unlinkSync("./public"+filePath);
                        doc[0].remove();
                        res.end("asd");

                })
});
//제품 삭제
app.post('/delete_item', function(req, res) {
    Item_data.find({item_index:req.body.item_index}).exec(function (err,doc){
                        var filePath = doc[0].img_dir ;
                        fs.unlinkSync("./public"+filePath);
                        doc[0].remove();
                        res.end();
                })
});

//좋아요 기능
app.post('/liked', function(req, res) {
  console.log("liked 받음")
    Item_data.find({item_name:req.body.asd}).exec(function (err,doc){
      try
      {
        console.log(doc[0].like);
                        doc[0].like+=1;
                        doc[0].save();
                        //console.log(doc[0].like);
                        return res.end(doc[0].like+"");
      }
      catch(err){

      }

                })
});


//페이지 받아오기
app.post('/get_page_data', function(req, res) {
    function find (i,documents,cb)
    {
        Item_data.find({item_name:documents[i].item_name}).exec(function (err,asd){
                documents[i]["like"]=asd[0].like;
                if(i==documents.length-1) cb();


        })

    }
Page_data.find().lean().exec(function (err, documents) {
    var doc=documents;

async.series([
    // 1st
    function(done){
        for(var i=0;i<documents.length;i++)
    {
        find(i,doc,done);
    }
    },
    // 2nd
    function(done){
      return res.end(JSON.stringify(doc));
        done()
    }
]);


}
)});
app.post('/get_testable_page_data', function(req, res) {
    Page_data.find({testable:"true"}).lean().exec(function (err, documents){
      //console.log(documents);
      return res.end(JSON.stringify(documents));
    })
});
app.post('/get_todayable_page_data', function(req, res) {
    Page_data.find({todayable:"true"}).lean().exec(function (err, documents){
      try{
      Item_data.find({item_name:documents[0].item_name}).exec(function (err, doc){
        documents[0]["like"]=doc[0].like;
        return res.end(JSON.stringify(documents));
      })}
      catch(err)
      {
        console.log(err);
      }
      //console.log(documents);

    })
});
app.post('/get_bestable_page_data', function(req, res) {
    Page_data.find({bestable:"true"}).lean().exec(function (err, documents){
      //console.log(documents);
      return res.end(JSON.stringify(documents));
    })
});
//제품 목록 받아오기
app.post('/get_item_data', function(req, res) {
Item_data.find().lean().exec(function (err,documents){
  //console.log(JSON.stringify(documents));
                return res.end(JSON.stringify(documents));
        })
});

//제품 목록 like 순으로 소트해서 받아오기 이미지 링크 넣어줘야함
app.post('/get_item_data_sorted_by_liked', function(req, res) {
Page_data.find({bestable:"true"}).lean().exec(function (err, documents) {
  var itemlist = [];
  //console.log(documents);
    documents.forEach(function(doc)
      {
        //console.log(doc);
        itemlist.push(doc.item_name);
      })
      //console.log(itemlist);

        Item_data.find({item_name: { $in: itemlist}}).sort('-like').lean().exec(function (err, docs)
        {
          for(var i=0;i<3;i++)
          {
if(i==2)
{//console.log(JSON.stringify(documents));
                //console.log(docs);
            return res.end(JSON.stringify(docs));
          }}}



        )

})});
<<<<<<< HEAD
=======

//User
//User 로그인
// create a user a new user
app.post("/login",function(req,res){
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
app.get("/logout",function(req,res){
  console.log(req.session.username+" is logged out");
  req.session.destroy();  // 세션 삭제
  res.clearCookie('sid'); // 세션 쿠키 삭제
  return res.end()
})
//User 회원가입
app.post("/sign_up",function(req,res){
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
      return res.end(JSON.stringify(testUser.username))
    }

  })
})
>>>>>>> c7d32ff6882b18792000fbfe601bb304128c7803
