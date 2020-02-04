import StockPrices from './stock_prices';
import StockInformation from './stock_information';
import {startDate} from "../date/start_date";
import {drawChart} from "../graph/line_chart"

export const retreiveSecurityData = (frequency = "daily", ticker = "AAPL", duration = 30) => {
    const intrinioSDK = require('intrinio-sdk');
    intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey = process.env.API_KEY;
    const securityAPI = new intrinioSDK.SecurityApi();
    const identifier = ticker; // String | A Security identifier (Ticker, FIGI, ISIN, CUSIP, Intrinio ID)
    const endDate = new Date();
    const beginDate = startDate(endDate, 100)
    const opts = { 
    'startDate': beginDate, // Date | Return prices on or after the date
    'endDate': endDate, // Date | Return prices on or before the date
    'frequency': "daily", // String | Return stock prices in the given frequency
    'pageSize': 100, // Number | The number of results to return
    'nextPage': null // String | Gets the next page of data from a previous API call
    };

    securityAPI.getSecurityStockPrices(identifier, opts)
        .then(data => {
        const security = new StockInformation(data.security)
        console.log(data)
        // const stock_prices = new StockPrices(data.stock_prices, frequency, duration)
        drawChart(data.stock_prices);
        
        // console.log(data)
        // const stockPrices = new StockPrices(data)
    })

}