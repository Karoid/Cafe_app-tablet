var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var conn = mongoose.connection;
var User = require('../models/user');
var Order_count = require('../models/order_count')
var Order_data = require('../models/order_data')
var user = require('../models/user')
var Qna = require('../models/qna');
var Item_data = require('../models/item_data');
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
router.get('/index', function (req, res) {
    fs.readFile('./Cafe/index.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            if (req.session.username) {
                var user = req.session.username
                console.log(user + "is logged on");
            }
            res.end(ejs.render(data, {data: user}))
        }
    })
});
router.get('/introduce.html', function (req, res) {
    fs.readFile('./Cafe/introduce.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            if (req.session.username) {
                var user = req.session.username
                console.log(user + "is logged on");
            }
            res.end(ejs.render(data, {data: user}))
        }
    })
});
router.get('/main.html/:redirect_url?', function (req, res) {
    fs.readFile('./Cafe/main.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            if (req.session.username) {
                var user = req.session.username
                console.log(user + "is logged on");
            }
            res.end(ejs.render(data, {data: user, redirect: req.params.redirect_url}))
        }
    })
});
router.get('/menu_page.html', function (req, res) {
    fs.readFile('./Cafe/menu_page.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            if (req.session.username) {
                var user = req.session.username
                console.log(user + "is logged on");
            }
            res.end(ejs.render(data, {data: user}))
        }
    })
});
router.post('/order_check.html', function (req, res) {
    fs.readFile('./Cafe/order_check.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.end(ejs.render(data, {userdata: req.body.userdata, orderdata: req.body.orderdata}))
        }
    })
});
router.get('/order_page.html', function (req, res) {
    fs.readFile('./Cafe/order_page.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var user = req.session.username
            if (user) {
                console.log(user + "is logged on");
                res.end(ejs.render(data, {data: null}))
            }
        }
    })
});
router.post('/order_page.html', function (req, res) {
    fs.readFile('./Cafe/order_page.html', 'utf8', function (err, data) {
        res.end(ejs.render(data, {data: req.body.password}))
    })
});
router.get('/order_check/:order_id?', function (req, res) {
    fs.readFile('./Cafe/order_check.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var user = req.session.username
            if (user) {
                console.log(user + "is logged on");
            }
            res.end(ejs.render(data, {data: user}))
        }
    })
});
router.get('/sign_up.html', function (req, res) {
    fs.readFile('./Cafe/sign_up.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.end(ejs.render(data))
        }
    })
});
router.get('/QnA.html/:page?', function (req, res) {
    fs.readFile('./Cafe/QnA.html', 'utf8', function (err, data) {
        try {
            if (req.params.page) {
                var page_num = req.params.page;
            } else {
                var page_num = 1;
            }
            Qna.paginate({}, {page: page_num, limit: 5}, function (err, documents) {
                var seen_button = new Array()
                for (var i = 0; i < documents.docs.length; i++) {
                    var saved_user = documents.docs[i].username;
                    var logged_in_user = req.session.username
                    var not_logged_in = saved_user == "nonuser" && !logged_in_user;
                    var logged_inNits_my_article = logged_in_user == saved_user && logged_in_user != "nonuser";
                    seen_button.push(not_logged_in || logged_inNits_my_article)
                }
                return res.end(ejs.render(data, {data: documents, seen_button: seen_button}))
            })
        } catch (e) {
            console.log(e);
        }
    })
});

//Qna CRUD 라우팅
router.get('/QnA_cu/:id?/:del?', function (req, res) {
    fs.readFile('./Cafe/QnA_cu.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var user = req.session.username
            console.log(user + "is logged on");
            if (req.params.id && !req.params.del) {
                //수정하기
                Qna.find({_id: req.params.id}, function (err, documents) {
                    var saved_user = documents[0].username;
                    var logged_in_user = req.session.username
                    var not_logged_in = saved_user == "nonuser" && !logged_in_user;
                    var logged_inNits_my_article = logged_in_user == saved_user && logged_in_user != "nonuser";

                    if (not_logged_in || logged_inNits_my_article) {
                        return res.end(ejs.render(data, {data: documents[0], user: req.session.username}))
                    } else {
                        return res.end("수정 권한이 없습니다") //warning
                    }
                })
            } else if (req.params.id && req.params.del) {
                //삭제 비밀번호 받기
                res.end(ejs.render(data, {data: ["del", req.params.id], user: req.session.username}))
            } else {
                //글쓰기
                res.end(ejs.render(data, {data: {}, user: req.session.username}))
            }
        }
    })
});
router.post('/QnA_write/:id?', function (req, res) {
    try {
        if (req.params.id) { //수정하기
            Qna.findOne({_id: req.params.id}, function (err, doc) {
                if (doc.username != "nonuser" && req.session.username == doc.username) {
                    //회원 수정하기
                    doc.title = req.body.title;
                    doc.content = req.body.content;
                    doc.save();
                    res.redirect("/cafe/Qna.html")
                } else if (doc.username == "nonuser" && req.body.password == doc.password && doc.password != "") {
                    //비회원 비밀번호 받았을때 수정하기
                    doc.title = req.body.title;
                    doc.content = req.body.content;
                    doc.save();
                    res.redirect("/cafe/Qna.html")
                } else {
                    //비회원 비밀번호 틀렸을 때
                    res.end("본인이 쓴 글이 아니거나 비밀번호가 틀렸습니다.") //warning
                }
            });
        } else {             //글쓰기
            conn.collection('Qna').insert({
                username: req.body.username,
                password: req.body.password,
                title: req.body.title,
                content: req.body.content
            });
            res.redirect("/cafe/Qna.html")
        }
    } catch (e) {
        console.log(e);
        res.end(e)
    }
});
router.get('/QnA_d/:id', function (req, res) {
    var user = req.session.username;
    try {
        Qna.find({_id: req.params.id}, function (err, documents) {
            var saved_user = documents[0].username;
            var logged_in_user = req.session.username
            var not_logged_in = saved_user == "nonuser" && !logged_in_user && req.query.password == documents[0].password;
            var logged_inNits_my_article = logged_in_user == saved_user && logged_in_user != "nonuser";
            if (logged_inNits_my_article || not_logged_in) {
                //회원, 비회원 삭제하기
                Qna.find({_id: req.params.id}).remove().exec();
                res.redirect("/cafe/QnA.html")
            } else if (documents[0].username == "nonuser") {
                //비회원 비밀번호 받으러 가기
                res.redirect("/cafe/QnA_cu/" + req.params.id + "/del")
            } else {
                return res.end("글쓴이와 로그인 정보가 다릅니다") //warning
            }
        })
    } catch (e) {
        console.log(e);
        res.end(e)
    }
});

//회원 주문
router.post('/user_order', function (req, res) {
    //console.log(req.session.username + "가 주문중");
    fs.readFile('./Cafe/order_check.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            if (req.session.username || 1) { //디버깅하게 편하게 로그인안해도 주문할수있도록 || 1 붙여놓음 후에 해제바람

                console.log(req.body.orderdata);
                var item = req.body.orderdata;
                var total_price = 0;
                var count;

                Order_count.find({}).lean().exec(function (err, doc) {

                    //console.log(doc[0])
                    count = doc[0].value;
                    // console.log(item.length);

                    conn.collection('order_count').update({value: count},
                        {value: count + 1});

                    //console.log(req.body.orderdata[0].item_name);
                    for (var i = 0; i < item.length; i++) { //보안 관련하여 db의 실제 제품가격으로 참조함
                        Item_data.find({item_name: req.body.orderdata[i].item_name}).lean().exec(function (err, doc) {
                            //console.log("제품가격:" + doc[0].item_price);
                            //console.log(doc[0].item_price);
                            //쿠폰 증가
                            user.find({username: req.session.username}).lean().exec(function (err, doc) {
                                count = doc[0].coupon;
                                conn.collection('order_count').update({value: count},
                                    {value: count + 1});

                            })
                            total_price = Number(total_price) + Number(doc[0].item_price);
                            if (i + 1 >= item.length)
                                insert();
                        })
                    }
                    function insert() {
                        // console.log("총가격:" + total_price);
                        for (i = 0; i < item.length; i++) {
                            var goitem = new Array();
                            goitem.push({name: item[i].item_name, option: item[i].option})
                        }

                        conn.collection('order_data').insert({
                            order_count: count,
                            order_count_today: 0,
                            order_date: Date.now(),
                            order_total_price: total_price,
                            order_state: "ready", //ready or done
                            order_id: req.session.username,
                            order_count: count,
                            order_item_index: goitem,
                            user_index: req.body.userdata
                        })
                    }


                });


            }
            res.end()
        }
    })
});
//비회원 주문

router.post('/nonuser_order', function (req, res) {
    fs.readFile('./Cafe/order_check.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {

            nonuser_signup();
            function nonuser_signup() {

                User.find({}, function (err, documents) {
                    global.username = "" + documents.length + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
                    var testUser = new User({
                        username: global.username,
                        password: req.body.pw
                    });
                    // save user to database
                    return testUser.save(function (err) {
                        if (err) {
                            console.log(req.body.username + "log on failed");
                            if (err.code == 11000) return res.end('{"err":"' + testUser.username + '은 이미 사용중입니다"}')
                            return res.end(JSON.stringify(err))
                        }

                        else {
                            console.log(req.body + "sign_up success");
                            return res.end('{"err":"id값이 ' + testUser.username + '로 비회원 가입되었습니다!"}')
                        }
                    })
                })
                return insert_order();
            }

            function insert_order() {

                console.log(req.body.orderdata);
                var item = req.body.orderdata;
                var total_price = 0;
                var count;

                Order_count.find({}).lean().exec(function (err, doc) {

                    //console.log(doc[0])
                    count = doc[0].value;
                    // console.log(item.length);


                    for (i = 0; i < item.length; i++) {
                        total_price = Number(total_price) + Number(item[i].item_price);
                    }
                    var goitem = new Array();
                    for (i = 0; i < item.length; i++) {
                        goitem.push({name: item[i].item_name, option: item[i].option})
                    }

                    // console.log(goitem);
                    conn.collection('order_data').insert({

                        order_count: count,
                        order_count_today: 0,
                        order_date: Date.now(),
                        order_total_price: total_price,
                        order_state: "ready", //ready or done
                        order_id: global.username,
                        order_count: count,
                        order_item_index: goitem,
                        user_index: req.body.userdata
                    });

                    conn.collection('order_count').update({value: count},
                        {value: count + 1});

                });
            }

            res.end(ejs.render(data, {data: null}))
        }
    })
});

// 최근 주문 
router.get('/recent_order', function (req, res) {
    console.log(req.session.username);
    if (req.session.username) {
        var recent_order;
        Order_data.find({order_id: req.session.username}, function (err, documents) {
            var goitem = new Array();
            for (i = 0; i < 3; i++) {
                goitem.push({order: documents[i].order_item_index})
            }
            return res.end(' ' + goitem);

        });
    }

    else
        res.end();
});

//User 로그인
// create a user a new user
router.post("/login", function (req, res) {
    console.log(req.body + "login attempt");
    // attempt to authenticate user
    User.getAuthenticated(req.body.username, req.body.password, function (err, user, reason) {
        if (err) return res.end(JSON.stringify(err))
        // login was successful if we have a user
        if (user) {
            // handle login success
            console.log(user.username + 'login success');
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
router.get("/logout", function (req, res) {
    console.log(req.session.username + " is logged out");
    req.session.destroy();  // 세션 삭제
    res.clearCookie('sid'); // 세션 쿠키 삭제
    return res.end()
})
//User 회원가입
router.post("/sign_up", function (req, res) {
    console.log(req.body + "sign_up attempt");
    var testUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    // save user to database 회원가입 부분 최초저장부분
    return testUser.save(function (err) {
        if (err) {
            console.log(req.body.username + "log on failed");
            if (err.code == 11000) return res.end('{"err":"' + testUser.username + '은 이미 사용중입니다"}')
            return res.end(JSON.stringify(err))
        } else {
            console.log(req.body + "sign_up success");
            return res.end('{"err":"' + testUser.username + ' 가입완료"}')
        }
    })
})
router.post("/nonusersign_up", function (req, res) {
    //NONUser 회원가입
    User.find({}, function (err, documents) {
        global.username = "" + documents.length + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
        var testUser = new User({
            username: global.username,
            password: req.body.password
        });
        // save user to database
        return testUser.save(function (err) {
            if (err) {
                console.log(req.body.username + "log on failed");
                if (err.code == 11000) return res.end('{"err":"' + testUser.username + '은 이미 사용중입니다"}')
                return res.end(JSON.stringify(err))
            } else {
                console.log(req.body + "sign_up success");
                return res.end('{"err":"id값이 ' + testUser.username + '로 비회원 가입되었습니다!"}')
            }
        })
    })
})

module.exports = router;


function needtologin(res, req, redirect_url) {
    if (!req.session.username) {
        res.redirect("/cafe/main.html/" + redirect_url)
    }
}
