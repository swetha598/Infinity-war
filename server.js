var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/avengers');
var db=mongoose.connection;
db.on('error',function(err)
	{	console.log('connection error',err);
	})
db.on('open',function()
	{	console.log("Connected")
	})
var user=require('./models')


var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/process_post', urlencodedParser, function (req, res) {
   response = new user({
      name:req.body.nm,
      email:req.body.email,
      pass:req.body.pass,

   });
   response.save(function(err,data)
	{	if(err) console.log(err);
		else console.log("success",data);
	})
   console.log(response);
   res.end("Signed in successfully");
})


var server = app.listen(9000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)

})