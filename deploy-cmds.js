// Only need to run this script once
// Run it again only if you add or edit existing cmds

const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

// Load commands
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const cmd = require(`./commands/${file}`);
  commands.push(cmd.data.toJSON());
}

// Regiter them
const rest = new REST({ version: '9' }).setToken(token);
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);


// Define cmds
// const commands = [
//   new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
//   new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
//   new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
// ].map(command => command.toJSON());

