const { SlashCommandBuilder } = require('@discordjs/builders');
const Utils = require('../utils/helpers.js')

// Setup table
const { Table } = require('embed-table');
const table = new Table({
  titles: ['Coin', 'CurrPrice', 'Status'],
  titleIndexes: Utils.genIndex(20, 3), 
  rowIndexes: Utils.genIndex(11, 3),  
  start: '`',
  end: '`',
  padEnd: 10
});



function calcAvg(prices) {
  let avg = 0
  for (let p of prices) {
    avg += p
  }
  avg /= prices.length
  return avg
}


async function buildFields(order) {
  let fields = []
  fields.push(order.symbol)

  var currPrice = await Utils.bClient.prices(order.symbol)
  currPrice = parseFloat(currPrice[order.symbol]).toFixed(2)
  fields.push(`$${currPrice}`)

  const lastBuy = await Utils.getLastBuy(order.symbol)
  const status  = await Utils.calcMarkup(currPrice, lastBuy)
  fields.push(`${status.toString()}%`)

  return fields
}


module.exports = {
  data: new SlashCommandBuilder()
    .setName('orderstatus')
    .setDescription('Display coin info according to your open orders'),
  async execute(interaction) {

    // Retriev open orders & build fields (rows)
    const openOrders = await Utils.bClient.openOrders();
    const percentages = [] // holds - or + % for each symbol
    for (let openOrder of openOrders) {
      const orderFields = await buildFields(openOrder)
      table.addRow(orderFields, {override: 4})
      percentages.push(orderFields[2].slice(0, -1))
    }
    var nrArr = percentages.map(Number)

    // Build embed & send it
    const rows = table.field(true)
    console.log(rows)
    const embed = {
      title: '🪙 Coin Status',
      description: `Avg %: \`${calcAvg(nrArr)}%\``,
      color: 0x4df0af,
      fields: rows,
      timestamp: new Date()
    }

    await interaction.reply({ embeds: [embed] });

  },
};
