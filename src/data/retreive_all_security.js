import {companiesModal} from "../modals/companies";

export const retreiveAllSecurity = () => {
    const intrinioSDK = require('intrinio-sdk');
    intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey = process.env.API_KEY;

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
}