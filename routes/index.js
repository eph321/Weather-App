var express = require('express');
var router = express.Router();
var request = require('sync-request');

var cityListModel = require('../models/cities');

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('login', { title: 'Express' });
});


router.get('/weather', async function (req, res, next) {

if (req.session.user == null) {
  res.redirect('/')
} else {
  var cityList = await cityListModel.find()

  res.render('weather', { cityList }) 
}
})


router.post('/add-city', async function (req, res, next) {

  var data = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity}&units=metric&lang=fr&appid=0c815b9455235455a301668a56c67b18`)
  var dataAPI = JSON.parse(data.body)

  var alreadyExist = await cityListModel.findOne({ name: req.body.newcity });

  if (alreadyExist == null && dataAPI.name) {

    var newcityList = new cityListModel(
      {
        name: req.body.newcity,
        desc: dataAPI.weather[0].description,
        img: "http://openweathermap.org/img/wn/" + dataAPI.weather[0].icon + ".png",
        temp_min: dataAPI.main.temp_min,
        temp_max: dataAPI.main.temp_max,
        coord_lon : dataAPI.coord.lon,
        coord_lat : dataAPI.coord.lat,
      }
    )

    await newcityList.save();
  }
  cityList = await cityListModel.find()

  res.render('weather', { cityList })
})


router.get('/delete-city', async function (req, res, next) {

  await cityListModel.deleteOne({ _id: req.query.id });
  cityList = await cityListModel.find();

  res.render('weather', { cityList })
})


router.get('/update-data', async function (req, res, next) {

  cityList = await cityListModel.find()

  for (let i = 0; i < cityList.length; i++) {

    var data = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&units=metric&lang=fr&appid=0c815b9455235455a301668a56c67b18`)
    var dataAPI = JSON.parse(data.body)

    await cityListModel.updateOne(
      { _id: cityList[i].id }, // filtre -> paramètre, puis valeurs à changer (voir syntax de updateOne)
      {
        name: cityList[i].name,
        desc: dataAPI.weather[0].description,
        img: "http://openweathermap.org/img/wn/" + dataAPI.weather[0].icon + ".png",
        temp_min: dataAPI.main.temp_min,
        temp_max: dataAPI.main.temp_max,
      }
    )
  }

  cityList = await cityListModel.find()

  res.render('weather', { cityList })

})



module.exports = router;
