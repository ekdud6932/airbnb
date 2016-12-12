var express = require('express'),
     Host = require('../models/Host'),
     Book = require('../models/Book'),
     Request = require('../models/Request');
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
  Book.find({}, function(err, result) {
    if (err) {
      return next(err);
    }
    res.render('requests', {requests:result});
  });
});



//db를 만들어서 숙소정보를 저장
router.post('/', function(req, res,next){
    //console.log(req.body);
    var request = new Request();
    request.userName = req.user.name;
    request.hostTitle = req.host.title;
    request.save(function(err, result){
        if(err){
            next(err);
        }
        res.render('requests/index', {requests: result});
    });
});



module.exports = router;