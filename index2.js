const { nextISSTimesForMyLocation_promise } = require('./iss_promised');

const formattedResults = (data) => {
  for (object of data) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(object.risetime);
    const duration = object.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}

nextISSTimesForMyLocation_promise()
  .then((passTimes) => {
    formattedResults(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  })