const yargs = require('yargs');
const axios = require('axios');

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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCpn6XdMEP2oCEAuzp8-S-CdOLxCqwwOM8`;

axios.get(geocodeUrl).then((res) => {
  if(res.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }
  const lat = res.data.results[0].geometry.location.lat;
  const lng = res.data.results[0].geometry.location.lng;
  const weatherUrl = `https://api.darksky.net/forecast/1c80bf92aadd3db44c05ce1c48912649/${lat},${lng}`;
  console.log(res.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then(res => {
  const temperature = res.data.currently.temperature;
  const apparentTemperature = res.data.currently.apparentTemperature;
  console.log(`Current temperature is ${temperature}, and it feels like ${apparentTemperature}`);
}).catch((err) => {
  if(err.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(err.message);
  }
});