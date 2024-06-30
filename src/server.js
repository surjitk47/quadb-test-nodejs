const express = require('express');
const bodyParser = require('body-parser');
const { Ticker } = require('./models');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(express.static('src/views'));

app.get('/api/tickers', async (req, res) => {
  try {
    const tickers = await Ticker.findAll();
    res.json(tickers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
