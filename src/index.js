import "./styles/index.scss";
// import yodaStitch from "./images/yoda-stitch.jpg";
// require('dotenv').config();

const apiKey = process.env.API_KEY

var intrinioSDK = require('intrinio-sdk');
intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey = `${apiKey}`;

var stockExchangeAPI = new intrinioSDK.StockExchangeApi();

var identifier = "USCOMP"; // String | A Stock Exchange identifier (MIC or Intrinio ID)


stockExchangeAPI.getStockExchangeById(identifier).then(function(data) {
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
