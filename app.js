const request = require('request');
const yargs = require('yargs');

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

const address = encodeURIComponent(argv.address);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCpn6XdMEP2oCEAuzp8-S-CdOLxCqwwOM8`,
  json: true
}, (error, response, body) => {
  //this pretty prints
  // console.log(JSON.stringify(body, undefined, 2));

  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});