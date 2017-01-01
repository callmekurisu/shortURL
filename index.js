var fs = require("fs")
var express = require('express')
var app = express()
var http = require('http')
var request = require('request')
var path = require('path')


var html = (fs.readFileSync('shortURL.html').toString())
var begin = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" src="main.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><script>$(document).ready(function() {window.alert("redirecting..."); window.open("https://'
var end = '");});</script></html>'
    
app.set('port', (process.env.PORT || 5000));

  app.get('/',function (req, res) {
     res.send(html)
})
  
  app.get('/api/:longurl/',function (req, res) {
     var long = req.params.longurl
     var slong  = '"'+long+'"'
     var short = Math.floor(Math.random()*9999)
     var tmp = '{"longURL": '+'"'+long+'"'+", "+'"shortURL": '+'"'+short+'"}' 
     var err = '{"longURL": "error"}'
     var m = long[long.length-1]
     var o = long[long.length-2]
     var c = long[long.length-3]
     var dot = long[long.length-4]&&long[3]
     fs.writeFileSync('tmpLong.txt',long)
     fs.writeFileSync('tmpShort.txt',short)
     var w = long[0]&&long[1]&&long[2]
     if(w!="w"||m!="m"||o!="o"||c!="c"||dot!="."){
       res.send(err)
    }
    else
     res.send(tmp)
})
  
  app.get('/short/:shorturl/',function (req, res) {
      var readShort = (fs.readFileSync('tmpShort.txt').toString())
      var long = (fs.readFileSync('tmpLong.txt').toString())
      var matchShort = req.params.shorturl
      fs.writeFileSync('transfer.html', begin+long+end)
      var transfer = (fs.readFileSync('transfer.html').toString())
      if(readShort==matchShort){
	res.send(transfer)
      }
      else
	console.log(readShort)
	console.log(long)
	console.log(matchShort)
     
})
  
  
     comment out to run local
    app.listen(process.env.PORT, '0.0.0.0', function(err) {
  console.log("Started listening on %s", app.url);
});
  
  /*uncomment out for running on localhost
    app.listen(5000, function(err) {
  console.log("Started listening on port 5000...");
});*/