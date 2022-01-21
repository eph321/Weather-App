var express = require('express');
var router = express.Router();

var accountModel = require('../models/users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('/login');
});

// SIGN-UP
router.post('/sign-up', async function (req, res, next) {

  let alreadyExist = await accountModel.findOne({ email: req.body.email });

  if (alreadyExist == null && req.body.name != "" && req.body.email != "" && req.body.password != "") {

    let account = new accountModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    let accountSaved = await account.save();

    req.session.user =
    {
      name: req.body.name,
      _id: accountSaved._id,
    }

    res.redirect('/weather')
  } else {
    res.redirect('/')
  };
})

//SIGN-IN
router.post('/sign-in', async function (req, res, next) {

  let accountList = await accountModel.findOne({ email: req.body.email })


  if (accountList != null && req.body.email === accountList.email && req.body.password === accountList.password) {
    req.session.user =
    {
      name: accountList.name,
      _id: accountList._id,
    };
    res.redirect('/weather')

  } else {
    res.redirect('/')
  };
})


// Logout

router.get('/logout', function (req, res, next) {

  req.session.destroy();

  res.redirect('/')
})


module.exports = router;
