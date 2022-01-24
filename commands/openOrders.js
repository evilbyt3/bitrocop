const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Utils = require('../utils/helpers.js')


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

// Build a discord embed's fields for an order
// returns an array in the following format
// [ 'BNBBUSD', 'LIM🔻', '0.35', '$443.60', '$450.00', '1.44%' ]
async function buildFields(order) {
  let fields = []
  fields.push(order.symbol)

  type = order.type.slice(0, -2)
  if (order.side === "SELL") {
    type += "🔻"
  } else {
    type += "🔺"
  }
  fields.push(type)
  fields.push(parseFloat(order.origQty).toFixed(2))

  const lastBuy = await Utils.getLastBuy(order.symbol)
  fields.push(`$${lastBuy}`)

  const sell = parseFloat(order.price).toFixed(2)
  fields.push(`$${sell}`)

  // calculate profit (in % and in eur)
  fields.push(`${await Utils.calcMarkup(lastBuy, sell)}%`)

  console.log(fields)
  return fields
}
// -------------------------------------------------------------


module.exports = {
  data: new SlashCommandBuilder()
    .setName('openorders')      // needs to be lowercase
    .setDescription('See your open orders from Binance'),
  async execute(interaction) {

    // Retrieve open orders
    const orders = await Utils.bClient.openOrders();
    orderCount = orders.length

    // Build fields (rows)
    for (let order of orders) {
      const orderFields = await buildFields(order)
      table.addRow(orderFields, {override: 4})
    }

    // Build embed & send it
    const rows = table.field(true)
    const exampleEmbed = {
      title: 'Order List',
      url: 'https://www.binance.com/',
      description: 'Audit of open orders',
      color: 0x4df0af,
      fields: rows,
      // timestamp: new Date(),
      footer: {
        // TODO: add total profit as well
        text: `Total: ${orderCount}`,
      }
    }

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
