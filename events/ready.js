
const { MessageEmbed } = require('discord.js')

async function onReady(client) {
    console.log(`🤖 Beep Boop. Logged in as ${client.user.tag}!`);

//     const embed = new MessageEmbed()
//       .setTitle('Some Title')
//       .setColor('#0099ff');
// 
//     // trading channel
//     const channel = client.channels.cache.get('933754628233895996');
// 
//     try {
//       const webhooks = await channel.fetchWebhooks();
//       const webhook = webhooks.find(wh => wh.token)
// 
//       if (!webhook) {
//         return console.log('No webhook was found that I can use!');
//       }
// 
//       await webhook.send({
//         content: 'Webhook test',
//         username: 'some-username',
//         avatarURL: 'https://i.imgur.com/AfFp7pu.png',
//         embeds: [embed],
//       });
// 
// 
//     } catch (error) {
//       console.error('Error trying to send: ', error);
//     }
}



module.exports = {
  name: 'ready',
  once: true,
  execute: onReady
};
