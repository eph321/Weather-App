var mongoose = require('mongoose');


var cityListSchema = mongoose.Schema(
    {
name : String,
desc: String,
img: String,
temp_min: String,
temp_max: String,
coord_lon : String,
coord_lat : String,
}
);

var cityListModel = mongoose.model("cities", cityListSchema);

module.exports = cityListModel;