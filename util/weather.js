const request = require('request');

// Callback Version
// const getWeather = (lat, lng, callback) => {
//   const url = `https://api.darksky.net/forecast/1c80bf92aadd3db44c05ce1c48912649/${lat},${lng}`;
//   request({
//     url,
//     json: true
//   }, (err, res, body) => {
//     if (!err && res.statusCode === 200) {
//       callback(undefined, {
//         temperature: body.currently.temperature,
//         apparentTemperature: body.currently.apparentTemperature
//       });
//     } else {
//       callback('Unable to connect to servers.');
//     }
//   })
// }

const getWeather = (lat, lng) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.darksky.net/forecast/1c80bf92aadd3db44c05ce1c48912649/${lat},${lng}`;
    request({
      url,
      json: true
    }, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        resolve({
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        reject('Unable to connect to servers.');
      }
    })
  });
}

module.exports = {
  getWeather
}