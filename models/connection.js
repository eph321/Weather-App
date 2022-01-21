var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://franck:lacapsule@cluster0.u2ixh.mongodb.net/weatherapp?retryWrites=true&w=majority', options,        
    function(err) {
        if(err) {
      console.log("erreur", err);
    } else {
        console.log("base de donnée OK")
    }
});
