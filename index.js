// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);

//   fetchCoordsByIP(ip, (error, data) => {
//     if (error) {
//       console.log("It didn't work!" , error);
//       return;
//     }
//     console.log("Coordinates are: ", data)
//     fetchISSFlyOverTimes(data, (error, data) => {
//       if (error) {
//         console.log("It didn't work!" , error);
//         return;
//       }
//       console.log("Flyover times: ", data)
//     })
//   });
// });


const { nextISSTimesForMyLocation } = require('./iss');

const formattedResults = (data) => {
  for (object of data) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(object.risetime);
    const duration = object.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  
  if (error) {
    console.log("It didn't even work!", error);
  }
  // success, print out the deets!
  formattedResults(passTimes)
});



