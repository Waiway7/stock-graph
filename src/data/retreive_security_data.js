import StockPrices from './stock_prices';
import StockInformation from './stock_information';

export const retreiveSecurityData = () => {
    const intrinioSDK = require('intrinio-sdk');
    intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey = process.env.API_KEY;
    const securityAPI = new intrinioSDK.SecurityApi();
    const identifier = "AAPL"; // String | A Security identifier (Ticker, FIGI, ISIN, CUSIP, Intrinio ID)
    const opts = { 
    // 'startDate': new Date("2018-01-01"), // Date | Return prices on or after the date
    // 'endDate': new Date("2019-01-01"), // Date | Return prices on or before the date
    'frequency': "daily", // String | Return stock prices in the given frequency
    'pageSize': 100, // Number | The number of results to return
    'nextPage': null // String | Gets the next page of data from a previous API call
    };

    securityAPI.getSecurityStockPrices(identifier, opts)
        .then(data => {
        const security = new StockInformation(data.security)
        const stock_prices = new StockPrices(data.stock_prices)
        // console.log(data)
        // const stockPrices = new StockPrices(data)
    })

}