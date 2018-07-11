var express = require('express'),
    app = express(),
    cors = require('cors'),
    mongoose = require('mongoose'),
    ObjectId = require('mongoose').Types.ObjectId,
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:4200'
}));

mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/BlogManagementSystem');
var db = mongoose.connection;

db.on('error', function() {
    console.log('Error happened!');
});
    
db.on('open', function() {
    console.log('Mongoose Connected!');
});

app.post('/signup', function(req, res) {
    db.collection('users').insert(req.body, function (err) {
        if(!err) {
            res.send({
                flg: true
            });
        }
    });
});

app.post('/login', function(req, res) {
    console.log("login");
    var token = jwt.sign({'uname':req.body.username}, 'secret-key', {
        expiresIn: '2h'
    });
    if (req.body.username && req.body.password) {
        db.collection('users').find(req.body).toArray(function(err, docs) {
            if (err) {
                console.log(err);
            } else {
                if(docs.length != 0) {
                    res.send({
                        isLoggedIn: true,
                        token: token
                    });
                } else {
                    res.send({
                        isLoggedIn: false
                    });
                }
            }
        })
    } else {
        res.send({
            isLoggedIn: false
        });
    }
})

app.use(function(req, res, next) {
    var token = req.body.authtoken || req.query.authtoken || req.headers['authtoken'];
    jwt.verify(token, 'secret-key', function(err, decoded) {
        if (err) {
            console.log(err);
            res.send({
                err: true,
                msg: 'Invalid request'
            })
        } else {
            req.decoded = decoded;
            next();
        }
    });

})

app.get('/getPosts', function (req, res) {
    var query = { username: req.decoded.uname };
    db.collection('posts').find(query).toArray(function (err, docs) {
        // console.log(docs);
        res.send(docs);
    })
})

app.post('/createPost', function (req, res) {
    // console.log(req.decoded);
    var request = JSON.parse(JSON.stringify(req.body));
    request.username = req.decoded.uname;
    console.log(request);
    db.collection('posts').insert(request, function (err) {
        if(!err) {
            res.send({
                flg: true
            });
        }
    });
})

app.get('/getComments/:postId', function (req, res) {
    console.log(req.params.postId);
    db.collection('comments').find({postId : req.params.postId}).toArray(function (err, docs) {
        console.log(docs);
        res.send(docs);
    })
})

app.post('/addComment', function (req, res) {
    var request = JSON.parse(JSON.stringify(req.body));
    request.username = req.decoded.uname;
    db.collection('comments').insert(request, function (err) {
        if(!err) {
            res.send({
                flg: true
            });
        }
    });
})

app.get('/like/:postId', function (req, res) {
    db.collection('likes').find({postId : req.params.postId}).toArray(function (err, docs) {
        if (docs.length !== 0) {
            console.log('match');
            var newCount = docs[0].count + 1;
            db.collection('likes').update({postId : req.params.postId}, {$and: [{$set: {count: newCount}}, {$push: {users: req.decoded.uname}}]}, function(err, results) {
                if (err) {
                    console.log(err);
                } else {
                    db.collection('likes').find({postId : req.params.postId}).toArray(function (err, documents) {
                        res.send(documents);
                    })
                };
            });
        }
        else {
            var request = {
                postId: req.params.postId,
                count: 1,
                users: [req.decoded.uname]
            };
            db.collection('likes').insert(request, function (err) {
                db.collection('likes').find({postId : req.params.postId}).toArray(function (err, documents) {
                    res.send(documents);
                })
            });
        }
    })
})

app.get('/countLike/:postId', function (req, res) {
    db.collection('likes').find({postId : req.params.postId}).toArray(function (error, docs) {
        res.send(docs);
    })
})

app.post('/editPost', function (req, res) {
    var query = { _id: new ObjectId(req.body.postId) };
    delete req.body.postId;
    db.collection('posts').update(query, {$set: req.body}, function (err) {
        if(!err) {
            res.send({
                flg: true
            });
        }
        else {
            console.log(err);
        }
    });
})

app.get('/deletePost/:postId', function (req, res) {
    console.log(req.params.postId);
    db.collection('posts').remove({_id : new ObjectId(req.params.postId)}, function (err, docs) {
        db.collection('comments').remove({postId : req.params.postId}, function(err, docs) {
            res.send({
                flg: true
            })
        })
    })
})

app.listen(3000, function () {
    console.log('Server running on 3000!');
})