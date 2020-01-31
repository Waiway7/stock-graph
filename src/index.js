import "./styles/index.scss";
// import yodaStitch from "./images/yoda-stitch.jpg";
// require('dotenv').config();

const apiKey = process.env.API_KEY

var intrinioSDK = require('intrinio-sdk');
intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey = `${apiKey}`;

var securityAPI = new intrinioSDK.SecurityApi();

var identifier = "AAPL"; // String | A Security identifier (Ticker, FIGI, ISIN, CUSIP, Intrinio ID)

var opts = { 
  'startDate': new Date("2018-01-01"), // Date | Return prices on or after the date
  'endDate': new Date("2019-01-01"), // Date | Return prices on or before the date
  'frequency': "daily", // String | Return stock prices in the given frequency
  'pageSize': 365, // Number | The number of results to return
  'nextPage': null // String | Gets the next page of data from a previous API call
};

securityAPI.getSecurityStockPrices(identifier, opts).then(function(data) {
  console.log(data);
}, function(error) {
  console.error(error);
});

const testObj = {
  key1: "hi",
  key2: {
    key3: "Hello"
  }
};



const greeting = testObj?.key2?.key3 || testObj.key1;
window.addEventListener("DOMContentLoaded", () => {
  console.log(process.env.API_KEY)
  document.body.classList.add("center");
  const card = document.createElement("div");
  card.classList.add("card", "center");
  card.innerHTML = `<h2>${greeting} World!</h2>`;
  document.body.append(card);
  const imgCard = document.createElement("div");
  imgCard.classList.add("card", "center", "image-card");
  document.body.appendChild(imgCard);
});
