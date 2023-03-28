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

// Timestamp API endpoint
app.get("/api/:date", (req, res) => {
  let response = {
    unix: String,
    utc: String
  };
  let date = req.params.date;

  // To check if the passed paramater is of date format (2003-12-31)
  if (date.includes("-")) {
    response.unix = new Date(date).getTime();    // Returns date in milliseconds
    response.utc = new Date(date).toUTCString(); // Returns date in UTC format
  }
  // Isn't a date, check for timestamp (1451001600000)
  else {
    date = parseInt(date);
    response.unix = new Date(date).getTime();    // Converts parsed milliseconds date into date and then converts it into milliseconds
    response.utc = new Date(date).toUTCString(); // Converts parsed milliseconds date into date and then converts it into UTC format
  }

  res.json(response);
})


// listen for requests :)
var listener = app.listen(process.env.PORT || 3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
