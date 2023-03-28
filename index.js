// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// --------------CHALLENGE--------------

// Response object
let response = {
  unix: String,
  utc: String
};

// Timestamp API endpoint
app.get("/api/:date", (req, res) => {
  let date = req.params.date;

  // To check if the passed paramater is of date format ([project url]/api/2015-12-25)
  if (date.includes("-")) {
    response.unix = new Date(date).getTime();    // Returns date in milliseconds (UNIX)
    response.utc = new Date(date).toUTCString(); // Returns date in UTC format
  }
  // Isn't a date, check for timestamp ([project url]/api/1451001600000)
  else {
    date = parseInt(date);
    response.unix = new Date(date).getTime();    // Converts parsed milliseconds date into date and then converts it into milliseconds (UNIX)
    response.utc = new Date(date).toUTCString(); // Converts parsed milliseconds date into date and then converts it into UTC format
  }

  // If the passed parameter is of invalid timestamp or date format ([project url]/api/lol)
  if (!response.unix || !response.utc) return res.json({ error: "Invalid Date" });

  res.json(response);
})

// Current Time API endpoint
app.get("/api", (req, res) => {
  response.unix = new Date().getTime();    // Returns current date in milliseconds (UNIX)
  response.utc = new Date().toUTCString(); // Returns current date in UTC format

  res.json(response);
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
