var express = require('express'),
     Host = require('../models/Host'),
     Book = require('../models/Book');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

router.get('/', needAuth, function(req, res, next) {
  Host.find({}, function(err, result) {
    if (err) {
      return next(err);
    }
    res.render('books', {hosts:result});
  });
});

router.get('/search',function(req, res,next){
  console.log(req.query.city);
  Host.find({city: req.query.city}, function(err,result){
    if (err){
      return next(err);
    }
    console.log(result);
    res.render('books/search',{hosts: result});
  });
});

router.get('/new:host_id', function(req, res, next) {
    res.render('books/edit', {book : {}, host_id: req.params.host_id});
});


//db를 만들어서 숙소정보를 저장
router.post('/', function(req, res,next){
    //console.log(req.body);
    var book = new Book();
    book.num_person = req.body.num_person;
    book.check_in = req.body.check_in;
    book.check_out = req.body.check_out;
    book.bookedAt = req.body.bookedAt;
    book.user = req.user.id;
    book.host = req.host.id;
    book.save(function(err, result){
        if(err){
            next(err);
        }
        res.render('books/show', {book: result});
    });
});



module.exports = router;