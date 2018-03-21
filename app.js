const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=208%20Johnny%20Bench%20Dr%20Suite%20C',
  json: true
}, (error, response, body) => {
  console.log(body);
});