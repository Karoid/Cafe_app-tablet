var express = require('express'); // 웹서버 사용
var app = express();
var fs = require('fs'); // 파일 로드 사용.
var http = require('http');
var server = http.createServer(app);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
async = require("async");
var os = require("os");
if (os.type() == "Linux") {
    console.log("server is on AWS");
    mongoose.connect('mongodb://localhost:27017/test', function (err) {
        mongoose.Promise = global.Promise;
        if (err) {
            console.log("connection failed");
            console.log(os.hostname());
            console.log(os.type());
            console.log(os.platform());
            throw err;
        }
    });
} else {
    mongoose.connect('mongodb://52.78.68.136:27017/test', function (err) {
        mongoose.Promise = global.Promise;
        console.log("server is on LOCAL");
        if (err) {
            console.log("connection failed");
            console.log(os.hostname());
            console.log(os.type());
            console.log(os.platform());
            throw err;
        }
    });
}
var conn = mongoose.connection;
var User = require('./models/like'); //모듈화 해놓은 like스키마 불러오기
var Page_data = require('./models/page_data');
var Item_data = require('./models/item_data');
var Page_count = require('./models/page_count');
var Item_count = require('./models/item_count');
var Order_data = require('./models/order_data');
var Order_count = require('./models/order_count');
var User_data = require('./models/user');
var multer = require('multer');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/user', require('./User/user')); //로그인 라우팅 연결
app.use('/cafe', require('./Cafe/cafe')); //카페 사이트 라우팅 연결
// 포트 설정
app.listen(80, function () {
    console.log('Server Start http://localhost/test.html');
    console.log('DB에 들어가고 싶다면 ./mongo를 이용');
});

//***** 라우팅 설정 *****//
app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'}); // Head Type 설정 .
    res.end('<html>' +
        '<head><meta http-equiv="content-type" content="text/html; charset=utf-8"></head>' +
        '<body>' +
        '<a href="/cafe/index">카페 사이트</a><br><a href="/index.html">테블릿 사이트</a><br><a href="/user">로그인 사이트</a><br><a href="/admin.html">어드민 사이트</a>' +
        '</body>' +
        '</html>'
    )
});
//테블릿 라우팅
app.get('/index.html', function (req, res) { // 웹서버 기본주소로 접속 할 경우 실행 . ( 현재 설정은 localhost 에 3303 port 사용 : 127.0.0.1:3303 )
    fs.readFile('index.html', function (error, data) { // index.html 파일 로드 .
        if (error) {
            console.log(error);
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'}); // Head Type 설정 .
            res.end(data); // 로드 html response .
        }
    });
});
app.get('/today.html', function (req, res) { // 웹서버 기본주소로 접속 할 경우 실행 . ( 현재 설정은 localhost 에 3303 port 사용 : 127.0.0.1:3303 )
    fs.readFile('today.html', function (error, data) { // index.html 파일 로드 .
        if (error) {
            console.log(error);
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'}); // Head Type 설정 .
            res.end(data); // 로드 html response .
        }
    });
});
app.get('/best.html', function (req, res) { // 웹서버 기본주소로 접속 할 경우 실행 . ( 현재 설정은 localhost 에 3303 port 사용 : 127.0.0.1:3303 )
    fs.readFile('best.html', function (error, data) { // index.html 파일 로드 .
        if (error) {
            console.log(error);
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'}); // Head Type 설정 .
            res.end(data); // 로드 html response .
        }
    });
});

app.get('/admin.html', function (req, res) { // 웹서버 기본주소로 접속 할 경우 실행 . ( 현재 설정은 localhost 에 3303 port 사용 : 127.0.0.1:3303 )
    fs.readFile('admin.html', function (error, data) { // index.html 파일 로드 .
        if (error) {
            console.log(error);
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'}); // Head Type 설정 .
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
});

var upload_main = multer({storage: storage_main});

app.use(express.static(__dirname + '/public'));
var storage_item = multer.diskStorage({
    destination: './public/img/item_img',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

var upload_item = multer({storage: storage_item});
/* Ajax call */
//크로스 오리진 문제 해결
app.use(function (req, res, next) {
    var oneof = false;
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if (req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if (req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if (oneof) {
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
//주문

app.post('/get_order_data', function (req, res) { //페이지 인덱스로 페이지 데이터 검색하기
    //console.log("get");
    //console.log(req.body.page_index);
    Order_data.find().lean().exec(function (err, doc) {
        //console.log(doc[0].value)
        res.end(JSON.stringify(doc));
    });
})

//페이지 생성
app.post('/make_page', upload_main.single('uploadFile'), function (req, res) {
    //console.log(req.body); //form fields
    //console.log(req.file); //form files
    //path.extname(req.file)
    var testable, todayable, bestable;
    if (req.body.testable == "true" || req.body.testable == "on")
        testable = true;
    else
        testable = false;
    if (req.body.todayable == "true" || req.body.todayable == "on")
        todayable = true;
    else
        todayable = false;
    if (req.body.bestable == "true" || req.body.bestable == "on")
        bestable = true;
    else
        bestable = false;
    Page_data.find({todayable: "true"}).exec(function (err, doc) {
        if (todayable == true) {
            for (var i = 0; i < doc.length; i++) {
                //console.log(doc[i]);
                doc[i].todayable = "false";
                doc[i].save();
            }
        }
    });
    var count;
    Page_count.find().lean().exec(function (err, doc) {
        //console.log(doc[0].value)
        count = doc[0].value;
        //console.log("testable:"+testable+"todayable:"+todayable+"bestable"+bestable+"page_index:"+count+"page_info:"+req.body.page_info+"item_name:"+req.body.item_name+"img_dir:"+req.file.path.split('public')[1]);
        try {
            conn.collection('Page_data').insert({
                page_index: count,
                page_info: req.body.page_info,
                item_name: req.body.item_name,
                img_dir: req.file.path.split('public')[1],
                testable: testable,
                todayable: todayable,
                bestable: bestable
            });
            conn.collection('page_count').update({value: count}, {value: count + 1});
        }
        catch (err) {
        }
        //res.end("done");
        res.redirect("../admin.html#/page");
    })


});
app.post('/edit_page', upload_main.single('uploadFile'), function (req, res) {
    //console.log(req.body); //form fields
    //console.log(req.file); //form files
    //path.extname(req.file)
    var testable, todayable, bestable;
    if (req.body.testable == "true" || req.body.testable == "on")
        testable = true;
    else
        testable = false;
    if (req.body.todayable == "true" || req.body.todayable == "on")
        todayable = true;
    else
        todayable = false;
    if (req.body.bestable == "true" || req.body.bestable == "on")
        bestable = true;
    else
        bestable = false;
    Page_data.find({todayable: "true"}).exec(function (err, doc) {
        if (todayable == true) {
            for (var i = 0; i < doc.length; i++) {
                //console.log(doc[i]);
                doc[i].todayable = "false";
                doc[i].save();
            }
        }
    });
    var dir;
    if (req.file != null) { //이미지 새로 업로드 했을때임.
        console.log("이미지" + req.file);
        Page_data.find({page_index: req.body.page_index}).exec(function (err, doc) {
            var filePath = doc[0].img_dir;
            console.log(doc[0].img_dir);
            try {
                fs.unlinkSync("./public" + filePath);
            } catch (e) {
            }
            dir = req.file.path.split('public')[1];
            console.log(dir);
            return edit();
        });
    }
    else {
        Page_data.find({page_index: req.body.page_index}).exec(function (err, doc) {
            dir = doc[0].img_dir;
            //console.log(doc[0].img_dir);
            return edit();
        });
    }
    function edit() {
        //console.log(req.body.page_index);
        Page_data.update(
            {page_index: req.body.page_index},
            {
                $set: {
                    page_info: req.body.page_info,
                    item_name: req.body.item_name,
                    img_dir: dir,
                    testable: testable,
                    todayable: todayable,
                    bestable: bestable
                }
            },
            function (err, numberAffected, rawResponse) {
                //console.log("에러:"+err+"영향"+numberAffected+"raw"+rawResponse);
                res.redirect("../admin.html#/page");
            })
    }


});
app.post('/edit_item', upload_item.single('uploadFile'), function (req, res) {
    // console.log(req.body); //form fields
    //  console.log(req.file); //form files
    //path.extname(req.file)
    var dir;
    var tempItem;
    if (req.file != null) { //이미지 새로 업로드 했을때임.
        console.log("이미지" + req.file);
        Item_data.find({item_index: req.body.item_index}).exec(function (err, doc) {
            var filePath = doc[0].img_dir;
            //console.log(doc[0].img_dir);
            console.log("hear" + doc[0].item_name);

            var tempItem = doc[0].item_name;
            try {
                fs.unlinkSync("./public" + filePath);
            } catch (e) {
            }
            dir = req.file.path.split('public')[1];
            //console.log(dir);
            return edit();
        });
    }
    else {
        Item_data.find({item_index: req.body.item_index}).exec(function (err, doc) {
            //console.log("hear"+doc[0].item_name);
            tempItem = doc[0].item_name;
            dir = doc[0].img_dir;
            //console.log(doc[0].img_dir);
            return edit();
        });
    }
    function edit() {

        Item_data.update(
            {item_index: req.body.item_index},
            {
                $set: {
                    item_name: req.body.item_name,
                    item_name_eng: req.body.item_name_eng,
                    item_price: req.body.item_price,
                    img_dir: dir,
                    like: req.body.like
                }
            },
            function (err, numberAffected, rawResponse) {
                console.log("에러2:" + err + "영향" + numberAffected + "raw" + rawResponse);

            })

        Page_data.update(
            {item_name: tempItem},
            {
                $set: {
                    item_name: req.body.item_name,

                }
            }, {multi: true},
            function (err, numberAffected, rawResponse) {
                console.log("에러:" + err + "영향" + numberAffected + "raw" + rawResponse);
                res.redirect("../admin.html#/item");
            })
    }


});
app.post('/make_item', upload_item.single('uploadFile'), function (req, res) {
    //console.log(req);
    //console.log(req.body);
    var count;
    Item_count.find().lean().exec(function (err, doc) {
        //console.log(doc[0])
        count = doc[0].item_count;
        //console.log("page_index:"+count+"page_info:"+req.body.page_info+"item_name:"+req.body.item_name+"img_dir:"+req.file.path.split('public')[1]);
        try {
            conn.collection('Item_data').insert({
                item_index: count,
                item_name: req.body.item_name,
                item_name_eng: req.body.item_name_eng,
                item_price: req.body.item_price,
                img_dir: req.file.path.split('public')[1].replace(/\\/g, "/"),
                like: req.body.like,
                order_count: 0,
                item_discount: "False"
            });
            conn.collection('item_count').update({item_count: count}, {item_count: count + 1});
        }
        catch (err) {
            console.log(err)
        }
    });
    //res.end("good");
    res.redirect("../admin.html#/item");
});

app.post('/get_page_data_by_page_index', function (req, res) { //페이지 인덱스로 페이지 데이터 검색하기
    //console.log("get");
    //console.log(req.body.page_index);

    Page_data.find({page_index: req.body.page_index}).exec(function (err, doc) {
        //console.log(doc);
        res.end(JSON.stringify(doc));

    })
});
app.post('/get_item_data_by_item_index', function (req, res) { //아이템 인덱스로 아이템 데이터 검색하기
    //console.log("get");
    //console.log(req.body.page_index);

    Item_data.find({item_index: req.body.item_index}).exec(function (err, doc) {
        //console.log(doc);
        res.end(JSON.stringify(doc));
    })
});

//페이지 삭제
app.post('/delete_page', function (req, res) {
    //console.log("get");
    //console.log(req.body.page_index);

    //페이지 하나남았을때 삭제하면 새로고침이 안됌 왜그럴까??
    Page_data.find({page_index: req.body.page_index}).exec(function (err, doc) {

        var filePath = doc[0].img_dir;
        console.log(filePath);
        console.log(doc[0].img_dir);
        try {
            fs.unlinkSync("./public" + filePath);
        }
        catch (err) {
        }
        doc[0].remove();
        res.end("asd");

    })
});
//제품 삭제
app.post('/delete_item', function (req, res) {
    Item_data.find({item_index: req.body.item_index}).exec(function (err, doc) {
        var filePath = doc[0].img_dir;
        try {
            fs.unlinkSync("./public" + filePath);
        } catch (e) {
        }

        doc[0].remove();
        res.end();
    })
});

//좋아요 기능
app.post('/liked', function (req, res) {
    console.log("liked 받음"); //이거 asd좀 바꾸자!!
    Item_data.find({item_name: req.body.asd}).exec(function (err, doc) {
        try {
            console.log(doc[0].like);
            doc[0].like += 1;
            doc[0].save();
            console.log(doc[0].like);
            return res.end(doc[0].like + "");
        }
        catch (err) {
            console.log(err);
        }

    })
});


//페이지 받아오기
app.post('/get_page_data', function (req, res) {
    function find(i, documents, cb) {
        Item_data.find({item_name: documents[i].item_name}).exec(function (err, doc) {
            //console.log(doc);
            try {
                documents[i]["like"] = doc[0].like;
            } catch (e) {
            }
            if (i == documents.length - 1) cb();


        })

    }

    Page_data.find().lean().exec(function (err, documents) {
        var doc = documents;
            async.series([
                // 1st
                function (done) {
                    for (var i = 0; i < documents.length; i++) {
                        find(i, doc, done);
                    }
                },
                // 2nd
                function (done) {
                    return res.end(JSON.stringify(doc));
                    done()
                }
            ]);


        }
    )
});

app.post('/get_testable_page_data', function (req, res) {
    Page_data.find({testable: "true"}).lean().exec(function (err, documents) {
        //console.log(documents);
        return res.end(JSON.stringify(documents));
    })
});
app.post('/get_todayable_page_data', function (req, res) {
    Page_data.find({todayable: "true"}).lean().exec(function (err, documents) {
        try {
            Item_data.find({item_name: documents[0].item_name}).exec(function (err, doc) {
                documents[0]["like"] = doc[0].like;
                return res.end(JSON.stringify(documents));
            })
        }
        catch (err) {
            console.log(err);
        }
        //console.log(documents);

    })
});
app.post('/get_bestable_page_data', function (req, res) {
    Page_data.find({bestable: "true"}).lean().exec(function (err, documents) {
        //console.log("test");
        //console.log(documents);
        return res.end(JSON.stringify(documents));
    })
});
//제품 목록 받아오기
app.post('/get_item_data', function (req, res) {
    Item_data.find().lean().exec(function (err, documents) {
        //console.log(JSON.stringify(documents));
        return res.end(JSON.stringify(documents));
    })
});
app.post('/get_face_page_data', function (req, res) {
    var itemlist = [];
    var itemlist2 = [];
    //console.log("test");
    Page_data.find({bestable: "true"}).lean().exec((function (err, documents) {
        documents.forEach(function (doc) {
            console.log("-a " + itemlist);
            itemlist.push(doc.item_name);
        });
        return mid();
    }))
    function mid() {
        Item_data.find({item_name: {$in: itemlist}}).sort('-like').lean().exec(function (err, docs) {
            console.log("-b " + itemlist);
            itemlist2.push(docs[0].item_name);
            return last();
        })
    }

    function last() {
        Page_data.find({todayable: "true"}).lean().exec((function (err, documents) {
            itemlist2.push(documents[0].item_name);
            console.log("a " + itemlist);
            Item_data.find({item_name: {$in: itemlist2}}).lean().exec(function (err, documents) {
                //console.log("b" + documents[0].item_name);
                console.log("b " + itemlist);
                return res.end(JSON.stringify(documents));
            })
        }));
    }
});
//제품 목록 like 순으로 소트해서 받아오기 이미지 링크 넣어줘야함
app.post('/get_item_data_sorted_by_liked', function (req, res) {
    Page_data.find({bestable: "true"}).lean().exec(function (err, documents) {
        var itemlist = [];
        //console.log(documents);
        documents.forEach(function (doc) {
            itemlist.push(doc.item_name);
            //console.log("a");
        });
        //console.log(itemlist);

        Item_data.find({item_name: {$in: itemlist}}).lean().sort("-like").exec(function (err, docs) {

            console.log("b ");
            var stringArray = "[";
            for (var i = 0; i < 3; i++) {
                //console.log(typeof(docs));
                stringArray += JSON.stringify(docs[i]);
                if (i != 2)
                    stringArray += ","
                }
            stringArray += "]"
            //stringArray = JSON.stringify(docs[2]);
            // console.log("stringArray:" + JSON.stringify(docs[0]));
            // console.log("stringArray:" + JSON.stringify(docs[1]));
            // console.log("stringArray:" + JSON.stringify(docs[2]));
            //console.log("stringArray:" + stringArray);
            //console.log("stringArray:" + JSON.parse(stringArray));
            //console.log("b " + itemlist);
            return res.end(stringArray);
            }
        )

    })
});
