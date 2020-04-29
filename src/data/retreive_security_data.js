import {startDate} from "../date/start_date";
import {drawChart} from "../graph/line_chart"
import {companiesModal} from "../modals/companies"

export const retreiveSecurityData = (ticker = "AAPL", frequency = "daily", duration = 30) => {
    const intrinioSDK = require('intrinio-sdk');
    intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey = process.env.API_KEY;
    const securityAPI = new intrinioSDK.SecurityApi();
    let identifier = ticker; // String | A Security identifier (Ticker, FIGI, ISIN, CUSIP, Intrinio ID)
    const endDate = new Date();
    const beginDate = startDate(endDate, 90)
    const opts = { 
    'startDate': beginDate, // Date | Return prices on or after the date
    'endDate': endDate, // Date | Return prices on or before the date
    'frequency': "daily", // String | Return stock prices in the given frequency
    'pageSize': 100, // Number | The number of results to return
    'nextPage': null // String | Gets the next page of data from a previous API call
    };

    securityAPI.getSecurityStockPrices(identifier, opts)
    .then(data => {
        drawChart(data);
    })
}