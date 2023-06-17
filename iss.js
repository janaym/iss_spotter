
const request = require('request');


const fetchMyIP = (callback) => {
  console.log('requesting IP ...');
  request('https://api64.ipify.org?format=json', (error, response, body) => {
    //handle errors
    if (error) {
      callback(error, null);
      return;
    }
    //handle non successful status codes
    if (response.statusCode !== 200) {
      console.log(response);
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //ip found!
    const ip = JSON.parse(body).ip;
    callback(error, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  console.log('requesting coordinates ...');
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
    }

    const bodyObj = JSON.parse(body);

    if (!bodyObj.success) {
      const message = `Success status was ${bodyObj.success}. Server message says: ${bodyObj.message} when fetching for IP ${bodyObj.ip}`;
      callback(Error(message), null);
      return;
    }



    const { latitude, longitude } = bodyObj;

    callback(error, { latitude, longitude });
  });



};

module.exports = { fetchMyIP, fetchCoordsByIP };