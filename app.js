const yargs = require('yargs');
const geocode = require('./util/geocode');
const weather = require('./util/weather');

const argv = yargs
  .options({
    address: {
      alias: 'a',
      demand: true,
      describe: "The address to query weather for",
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

// Using Callback on getWeather and a Promise on geocodeAddress
// geocode.geocodeAddress(argv.address).then((res) => {
//   const lat = res.latitude;
//   const lng = res.longitude;
//   weather.getWeather(lat, lng, (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(`Current temperature is ${res.temperature}, and it feels like ${res.apparentTemperature}`);
//     }
//   });
// }, err => {
//   console.log(err);
// });

// Chaining promises
geocode.geocodeAddress(argv.address).then((res) => {
  const lat = res.latitude;
  const lng = res.longitude;
  return weather.getWeather(lat, lng);
}).then((res) => {
  console.log(`Current temperature is ${res.temperature}, and it feels like ${res.apparentTemperature}`);
}).catch(err => {
  console.log(err);
});
