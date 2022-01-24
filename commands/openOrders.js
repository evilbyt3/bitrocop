const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

// Connect to Binanance API
const Binance = require('node-binance-api');
const { BinKey, BSecret } = require('../config.json');
const bClient = new Binance().options({
  APIKEY: BinKey,
  APISECRET: BSecret
});


// Setup table
const { Table } = require('embed-table');
const table = new Table({
  titles: ['Coin', 'Type', 'Amount', 'Entry', 'Exit', 'Profit'],
  titleIndexes: genIndex(20),
  rowIndexes: genIndex(11),
  start: '`',
  end: '`',
  padEnd: 10
});


// ------ FUNCTIONS ------
function genIndex(factor){
  const tIdx = []
  for (let i = 0; i < 6; i++) {
    let sum = i * factor
    tIdx.push(sum)
  }

  return tIdx
}

async function buildField(order) {
  let field = []
  field.push(order.symbol)

  type = order.type.slice(0, -2)
  if (order.side === "SELL") {
    type += "🔻"
  } else {
    type += "🔺"
  }
  field.push(type)
  field.push(parseFloat(order.origQty).toFixed(2))

  const lastBuy = await getLastBuy(order.symbol)
  field.push(`$${lastBuy}`)

  const sell = parseFloat(order.price).toFixed(2)
  field.push(`$${sell}`)

  // calculate profit (in % and in eur)
  field.push(`${calcMarkup(lastBuy, sell)}%`)

  return field
}


// retrieve last buy on the specified symbol
async function getLastBuy(symbol) {
  const resp  = await bClient.trades(symbol)
  let lastBuy = resp.at(-1).price
  return parseFloat(lastBuy).toFixed(2)
}


// gross profit         = profit / sell price * 100
// gross margin %       = 100 * (sell price - buy price) / price cost
// markup %             = 100 * (sell price - buy price) / buy price
// more here: https://www.bluecart.com/blog/markup-vs-margin
function calcMarkup(buy, sell) {
  const markup = 100 * (sell - buy) / buy 
  return markup.toFixed(2)
}

// -------------------------------------------------------------






module.exports = {
  data: new SlashCommandBuilder()
    .setName('openorders')      // needs to be lowercase
    .setDescription('See your open orders from Binance'),
  async execute(interaction) {

    // Retrieve open orders
    const orders = await bClient.openOrders();
    orderCount = orders.length

    // Build fields (rows)
    for (let order of orders) {
      const field = await buildField(order)
      table.addRow(field, {override: 4})
    }

    // Build embed & send it
    const fields = table.field(true)
    const exampleEmbed = {
      title: 'Order List',
      url: 'https://www.binance.com/',
      description: 'Audit of open orders',
      color: 0x4df0af,
      fields: fields,
      // timestamp: new Date(),
      footer: {
        // TODO: add total profit as well
        text: `Total: ${orderCount}`,
      }
    }

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};






// table.addRow(['EGLDBUSD', 'LIM 🔻', '1.65', '$180', '$200', '7% 💵100'], {override: 4});
// const fields = table.field(true)


























    // const exampleEmbed = {
    //   color: 0x0099ff,
    //   title: 'Order List',
    //   url: 'https://www.binance.com/',
    //   description: 'Audit of open orders',
    //   fields: [
    //     {name: '`Coin`', value: 'LPTBUSD', inline: true},
    //     {name: '`Type`', value: 'Limit', inline: true},
    //     {name: '`Entry/Exit`', value: '33/36', inline: true},
    //     {name: '`Profit`', value: '6% _(10 💶 )_', inline: true},
    //     {name: '\u200b', value: '\u200b', inline: false,},
    //     {name: '`Coin`', value: 'LPTBUSD', inline: true},
    //     {name: '`Type`', value: 'Limit', inline: true},
    //     {name: '`Entry/Exit`', value: '34/36', inline: true},
    //     {name: '`Profit`', value: '4% (6 💶 )', inline: true},
    //   ],
    //   image: {
    //     url: 'https://imgur.com/LHZeymv'
    //   },
    //   timestamp: new Date(),
    //   footer: {
    //     text: `**Total: ${orderCount} | x% (50 💶 )**`,
    //     // text: "\u2800".repeat(2000/*any big number works too*/)+"|"
    //   },
    // };



// client.openOrders({ symbol: 'SOLBUSD' })
//   .then(response => client.logger.log(response.data))
//   .catch(error => client.logger.error(error))

