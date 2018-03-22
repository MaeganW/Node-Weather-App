const request = require('request');

const getWeather = (lat, lng) => {
  const url = `https://api.darksky.net/forecast/1c80bf92aadd3db44c05ce1c48912649/${lat},${lng}`;
  request({
    url,
    json: true
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      console.log(body.currently.temperature);
    } else {
      console.log('Unable to connect to servers.');
    }
  })
}

module.exports = {
  getWeather
}