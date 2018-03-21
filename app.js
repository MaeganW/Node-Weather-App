const yargs = require('yargs');
const request = require('request');
const geocode = require('./util/geocode');

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
    console.log(JSON.stringify(res, undefined, 2));
    const lat = res.latitude;
    const lng = res.longitude;

    getWeather(lat, lng);
  }
});

const getWeather = (lat, lng) => {
  const url = `https://api.darksky.net/forecast/1c80bf92aadd3db44c05ce1c48912649/${lat},${lng}`;
  request({
    url,
    json: true
  }, (err, res, body) => {
    console.log(body.currently.temperature);
  })
}