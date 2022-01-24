// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


// Setup commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const cmd = require(`./commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(cmd.data.name, cmd);
}


// Setup events
eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  // Client class extends the EventEmitter => we have access to .once & .on
  //    collect arguments for callback func uing the [rest parameter syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
  //    pass them as an array using the [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  }
  else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Connect bot to server
client.login(token);
