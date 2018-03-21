const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=208%20Johnny%20Bench%20Dr%20Suite%20C&key=AIzaSyCpn6XdMEP2oCEAuzp8-S-CdOLxCqwwOM8',
  json: true
}, (error, response, body) => {
  //this pretty prints
  // console.log(JSON.stringify(body, undefined, 2));

  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});