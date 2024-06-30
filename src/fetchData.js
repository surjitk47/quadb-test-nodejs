const axios = require('axios');
const { Ticker } = require('./models');

async function fetchAndStoreData() {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = response.data;
    const top10 = Object.values(tickers).slice(0, 10);

    await Ticker.sync({ force: true }); 
    
    await Ticker.bulkCreate(
        top10.map(ticker => ({
        name: ticker.name,
        last: ticker.last,  
        buy: ticker.buy,
        sell: ticker.sell,
        volume: ticker.volume,
        base_unit: ticker.base_unit,
      }))
    );

    console.log('Data fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchAndStoreData();
