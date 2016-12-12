var express = require('express'),
     Host = require('../models/Host'),
     User = require('../models/User');
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
  Host.find({}, function(err, hosts) {
    if (err) {
      return next(err);
    }
    res.render('hosts', {hosts: hosts});
    
    // var hostArr = [];
    // User.find({}, function(err, users){
    //   if(err){
    //     return next(err);
    //   }
      
    //   for(var i = 0; i<hosts.length; i++){
        
    //     for(var j = 0; j<users.length; j++){
          
    //       console.log("host : " + hosts[i].user);
    //       console.log("user : " + users[j].id);
    //       console.log(hosts[i].user == users[j].id);
    //       if(hosts[i].user == users[j].id){
    //         console.log("찾음");
    //         var hostTemp = {
    //           name : users[j].name,
    //           id : hosts[i].id,
    //           title : hosts[i].title,
    //           read : hosts[i].read,
    //           createdAt : hosts[i].createdAt
    //         }
    //         hostArr.push(hostTemp);
    //         // hosts.userName = users.name;
            
    //         // console.log(hosts.userName);
    //         // break;
    //       }
    //     }
    //   }
    //   console.log(hostArr);
    //   res.render('hosts', {hosts: hostArr});
    // });
    
  });
});

router.get('/new', function(req, res, next) {
    res.render('hosts/edit', {host : {}});
});
//db를 만들어서 숙소정보를 저장
router.post('/', function(req, res,next){
    //console.log(req.body);
    var host = new Host();
    console.log(req.user.id);
    host.city = req.body.city;
    host.charge = req.body.charge;
    host.facility = req.body.facility;
    host.address = req.body.address;
    host.rule = req.body.rule;
    host.title = req.body.title;
    host.password = req.body.password;
    host.content = req.body.content;
    host.user = req.user.id;
    host.userName = req.user.name;
    host.save(function(err, result){
        if(err){
            next(err);
        }
        res.render('hosts/show', {host: result});
    });
});
//삭제 
//params 로 id받고 찾아서 삭제
router.delete('/:id', function(req, res, next) {
  Host.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/hosts');
  });
});
//수정 
//params로 id 받고 검색.
// password가 일치하면 수정되고 일치하지 않으면 수정되지 않는다.
router.get('/:id/edit', function(req, res, next) {
  Host.findById(req.params.id, function(err, result) {
    if (err) {
      return next(err);
    }
    res.render('hosts/edit', {host: result});
  });
});

router.put('/:id', function(req, res, next) {
  Host.findById(req.params.id, function(err, host) {
      if(err) {
          return next(err);
      }

      if(host.password !== req.body.password){
          return res.redirect('back');
      }

      host.city = req.body.city;
      host.charge = req.body.charge;
      host.facility = req.body.facility;
      host.address = req.body.address;
      host.rule = req.body.rule;
      host.title = req.body.title;
      host.content = req.body.content;
      host.title = req.body.title;
      host.content = req.body.content;
      if(req.body.password) {
          host.password = req.body.password;
      }

     host.save(function(err) {
          if(err){
              return next(err);
          }
          res.render('hosts/show', {host : host});
      });
  });
});
//조회수 
//상세보기를 하면 조회수가 1씩 늘어난다.
router.get('/:id', function(req, res, next) {
  Host.findById(req.params.id, function(err, result) {
    if (err) {
      return next(err);
    }
    result.read = result.read + 1;
    result.save();
    res.render('hosts/show', {host: result});
  });
});


module.exports = router;