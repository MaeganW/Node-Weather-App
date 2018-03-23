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
  console.log(res.data);
}).catch((err) => {
  if(err.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(err.message);
  }
});