
async function cmdHandler(interaction) {
    console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

    if (!interaction.isCommand()) return;

    const cmd = interaction.client.commands.get(interaction.commandName)
    if (!cmd) return;

    try {
      await cmd.execute(interaction);
    }
    catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }
}


module.exports = {
  name: 'interactionCreate',
  execute: cmdHandler
}
