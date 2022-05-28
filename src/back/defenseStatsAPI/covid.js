const bodyParser = require("body-parser");
const axios = require("axios");


var BASE_API_PATH="/api/v2/remoteAPIV4";
let ext2;

module.exports.register = (app) => {


const options = {
    method: 'GET',
    url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/europe',
    headers: {
      'X-RapidAPI-Host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
      'X-RapidAPI-Key': '35e7d72db0msh33cb58e69a57bc1p11d7cdjsn3166249aeb1f'
    }
  };
  
  axios.request(options).then(function (response) {
      ext2 = response.data;
//      console.log(response.data);
  }).catch(function (error) {
      console.error(error);
  });

  app.get(BASE_API_PATH, (req, res) => {
    res.send(JSON.stringify(ext2));
});

}