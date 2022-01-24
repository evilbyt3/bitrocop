const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Utils = require('../utils/helpers.js')
const binance = Utils.bClient


// Converts cryptocurrency to the current price in usd
async function convertSymbolToUSD(symbol, amount) {
  try {
    const currPrice = await binance.prices(symbol)
    // console.log(symbol, currPrice, currPrice[symbol])
    return currPrice[symbol] * amount
  } catch (e) {
    throw e
  }
}

// Retrieve spot/fiat wallet information
async function getSpotBalance() {
  const spotBalance = await binance.balance()
  const result = {"balance": {}, "total": 0}

  for (const [key, val] of Object.entries(spotBalance)) {
    if (val.available != 0 || val.onOrder != 0) {
      const amount = parseFloat(val.available) + parseFloat(val.onOrder)
      result["balance"][key] = amount.toFixed(2)
      if (key === "BUSD") 
        result.total += amount
      else 
        result.total += await convertSymbolToUSD(key + "BUSD", amount)
    }
  }
  result.total = result.total.toFixed(2)
  return result
}


module.exports = {
  data: new SlashCommandBuilder()
    .setName('wallover')
    .setDescription('Display overview of binance wallet'),
  async execute(interaction) {
    // Retrieve balances of spot & savings wallets
    // NOTE: currently no support for retrieving staking balance
    const spotBal = await getSpotBalance()
    const saveBal = await binance.lending()
    const total = (parseFloat(spotBal.total) + parseFloat(saveBal.totalAmountInUSDT)).toFixed(2)

    // Build Spot field
    var spotField = { name: "Spot", value: "", inline: true}
    for (const [coin, amount] of Object.entries(spotBal.balance)) {
      spotField.value += `\`${amount} ${coin}\`\n`
    }

    // Build Savings field
    var saveField = { name: "Savings", value: "", inline: true}
    for (let obj of saveBal.positionAmountVos) {
      if (obj.amount == 0) continue
      saveField.value += `\`${obj.amount} ${obj.asset}\`\n`
    }
    console.log(saveField)

    // Create MessageEmbed
    const embed = {
      title: "💰 Wallet Overview",
      color: 0x68fff9,
      description: `Total: \`${total}\``,
      fields: [spotField, saveField],
      timestamp: new Date(),
      footer: {
        text: `Spot Total: \`${spotBal.total}\`  |  Saving Total: ${saveBal.totalAmountInUSDT}`
      }
    }

    // Send it
    await interaction.reply({ embeds: [embed] });
  },
};
