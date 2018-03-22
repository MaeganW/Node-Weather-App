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

geocode.geocodeAddress(argv.address, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    // console.log(JSON.stringify(res, undefined, 2));
    const lat = res.latitude;
    const lng = res.longitude;
    weather.getWeather(lat, lng);
  }
});
