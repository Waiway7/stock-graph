import StockPrices from './stock_prices';
import StockInformation from './stock_information';
import {startDate} from "../date/start_date";
import {drawChart} from "../graph/line_chart"
import {companiesModal} from "../modals/companies"

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

    var companyAPI = new intrinioSDK.CompanyApi();

    var t = { 
        'latestFilingDate': null, // Date | Return companies whose latest 10-Q or 10-K was filed on or after this date
        'sic': null, // String | Return companies with the given Standard Industrial Classification code
        'template': null, // String | Return companies with the given financial statement template
        'sector': null, // String | Return companies in the given industry sector
        'industryCategory': null, // String | Return companies in the given industry category
        'industryGroup': null, // String | Return companies in the given industry group
        'hasFundamentals': true, // Boolean | Return only companies that have fundamentals when true
        'hasStockPrices': true, // Boolean | Return only companies that have stock prices when true
        'pageSize': 100, // Number | The number of results to return
        'nextPage': null // String | Gets the next page of data from a previous API call
    };

    companyAPI.getAllCompanies(t).then((data) => {
        companiesModal(data);
    })
    securityAPI.getSecurityStockPrices(identifier, opts)
        .then(data => {
        const security = new StockInformation(data.security)
        // const stock_prices = new StockPrices(data.stock_prices, frequency, duration)
        drawChart(data);
        
        // console.log(data)
        // const stockPrices = new StockPrices(data)
    })

}