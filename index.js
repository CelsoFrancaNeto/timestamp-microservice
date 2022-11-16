// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
//{"unix":1668608520697,"utc":"Wed, 16 Nov 2022 14:22:00 GMT"}
app.get("/api", (req,res)=>{
  let currentDate = new Date();
  res.json({unix:currentDate.getTime(),utc:currentDate.toUTCString()});
});

app.get("/api/:date?", (req,res) =>{
  let currentDate = isNaN(req.params.date)? new Date(req.params.date) :new Date(parseInt(req.params.date));
  currentDate == "Invalid Date"?res.json({error:currentDate.toUTCString()}) :   
  res.json({unix:currentDate.getTime(),utc:currentDate.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
