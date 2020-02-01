import "./styles/index.scss";
import {drawChart} from "./graph/line_chart.js";
import * as d3 from "d3";

// import yodaStitch from "./images/yoda-stitch.jpg";
// require('dotenv').config();

const apiKey = process.env.API_KEY

var intrinioSDK = require('intrinio-sdk');
// intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey = `${apiKey}`;

// var companyAPI = new intrinioSDK.CompanyApi();

// var opts = { 
//   'latestFilingDate': null, // Date | Return companies whose latest 10-Q or 10-K was filed on or after this date
//   'sic': null, // String | Return companies with the given Standard Industrial Classification code
//   'template': null, // String | Return companies with the given financial statement template
//   'sector': null, // String | Return companies in the given industry sector
//   'industryCategory': null, // String | Return companies in the given industry category
//   'industryGroup': null, // String | Return companies in the given industry group
//   'hasFundamentals': true, // Boolean | Return only companies that have fundamentals when true
//   'hasStockPrices': true, // Boolean | Return only companies that have stock prices when true
//   'pageSize': 100, // Number | The number of results to return
//   'nextPage': null // String | Gets the next page of data from a previous API call
// };

// companyAPI.getAllCompanies(opts).then(function(data) {
//   console.log(data);
// }, function(error) {
//   console.error(error);
// });



window.addEventListener("DOMContentLoaded", () => {
  console.log(process.env.API_KEY)
  drawChart();
});
