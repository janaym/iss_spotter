
const request = require('request');


const fetchMyIP = (callback) => {
  console.log('requesting...');
  request('https://api64.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      console.log(response);
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(error, ip);
  });
};

// fetchMyIP((error, ip) => {
//   console.log(ip);
// });

module.exports = { fetchMyIP };