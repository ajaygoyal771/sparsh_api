var express = require('express');
var sqlclient = require('../public/lib/mysqlconnection');
var home = require('../public/lib/home');
var router = express.Router();
var client = sqlclient.sqlClient()


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/test', function(req, res, next) {
  console.log("test")
  res.send("testing first api");
});


router.post('/signup', function(req, res, next) {
  home.signup(req, client, function onComplete(result) {
    return res.json(result);
  })
});

router.post('/login', function(req, res, next) {
  home.login(req, client, function onComplete(result) {
    return res.json(result);
  })
});

router.post('/getSchoolDetails', function(req, res, next) {
  home.getSchoolDetails(req, client, function onComplete(result) {
    return res.json(result);
  })
});


router.post('/enter_school', function(req, res, next) {
  home.insertschool(req, client, function onComplete(result) {
    return res.json(result);
  })
});


router.post('/get_schools', function(req, res, next) {
  home.getschools(req, client, function onComplete(result) {
    return res.json(result);
  })
});


router.post('/enter_class', function(req, res, next) {
  home.insertclass(req, client, function onComplete(result) {
    return res.json(result);
  })
});


router.post('/update_class_strength', function(req, res, next) {
  home.updateclass(req, client, function onComplete(result) {
    return res.json(result);
  })
});


router.post('/enter_item', function(req, res, next) {
  home.insertitem(req, client, function onComplete(result) {
    return res.json(result);
  })
});


router.post('/update_item_stock', function(req, res, next) {
  home.updateitemstock(req, client, function onComplete(result) {
    return res.json(result);
  })
});



router.post('/enter_order', function(req, res, next) {
  home.insertorder(req, client, function onComplete(result) {
    return res.json(result);
  })
});


router.post('/generate_order', function(req, res, next) {
  // console.log(req)
  home.generateorder(req, client, function onComplete(result) {
    return res.json(result);
  })
});




module.exports = router;
