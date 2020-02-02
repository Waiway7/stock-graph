
class StockPrices{
    constructor(stock_prices, frequency){
        this.stock_prices = stock_prices;
        this.length = stock_prices.length;
    }

    // filterData(){
    //     //filters the data into date, open, high, low, close, volume and returns it
    //     const stock_information = []
    //     for (let i = this.length - 1; i >= 0; i--){
    //         const currData = this.stock_prices[i];

    //         //parses the data in D/M/Y 
    //         const date = new Date(currData.date);
    //         const month = date.getMonth() + 1;
    //         const day = date.getDay() + 1;
    //         const year = date.getFullYear();
    //         const parsedDate = `${day}/${month}/${year}`;

    //         //data of current price and date is put into an obj then pushed into the array
    //         const data = {
    //             "date": parsedDate,
    //             "open": currData.open,
    //             "high":currData.high,
    //             "low": currData.low,
    //             "close": currData.close,
    //             "volume": currData.volume
    //         }

    //         stock_information.push(data)
    //     }
       
    //     return stock_information
    // }


}

export default StockPrices
