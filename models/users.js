var mongoose = require('mongoose');

var accountSchema = mongoose.Schema(
    {
name : String,
email: String,
password: String,
});

var accountModel = mongoose.model("users", accountSchema);

module.exports = accountModel;