
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

const fetchISSFlyOverTimes = (coords, callback) => {
  
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
  
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

  const parsedBody = JSON.parse(body)
  
  callback(error, parsedBody.response)

  })
};




const nextISSTimesForMyLocation = (callback) => {
  //get ip
  fetchMyIP((error, ip) => {
  
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  //success!
  //get coordinates from ip
  fetchCoordsByIP(ip, (error, data) => {

    if (error) {
      console.log("It didn't work!" , error);
      return;
    }

    //success!
    //get flyover times from coordinates
    fetchISSFlyOverTimes(data, (error, data) => {

      if (error) {
        callback(error, null);
        return;
      }

      //success!!
      //send back info via callback
      callback(null, data)
    })
  });
});

}

module.exports = { nextISSTimesForMyLocation };