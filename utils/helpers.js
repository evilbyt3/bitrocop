// Connect to Binanance API
const Binance = require('node-binance-api');
const { BinKey, BSecret } = require('../config.json');
const bClient = new Binance().options({
  APIKEY: BinKey,
  APISECRET: BSecret
});

module.exports = {
  // Retrieve the last buy order on the specified symbol
  getLastBuy: async function(symbol) {
    const resp  = await bClient.trades(symbol)
    let lastBuy = resp.at(-1).price
    return parseFloat(lastBuy).toFixed(2)
  },


  // gross profit         = profit / sell price * 100
  // gross margin %       = 100 * (sell price - buy price) / price cost
  // markup %             = 100 * (sell price - buy price) / buy price
  // more here: https://www.bluecart.com/blog/markup-vs-margin
  calcMarkup: async function(buy, sell) {
    const markup = 100 * (sell - buy) / buy 
    return markup.toFixed(2)
  },

  bClient: bClient

}


