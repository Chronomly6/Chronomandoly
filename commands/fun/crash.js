//eslint-disable-next-line
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const { RichEmbed } = require('discord.js');

module.exports = class EchoCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'crash',
      group: 'fun',
      memberName: 'crash',
      description: 'Fakes a crash',
      details: oneLine `
        crash rip
			`,
      examples: ['crash']
    })
  }

  //eslint-disable-next-line class-methods-use-this
  async run(message) {
    let reply = "OH DEAR IM MELTING"
    let reply2 = "SHUTTING DOWN"
    await message.channel.send(
      reply
    )
    await message.channel.send(
      reply2
    )
  }
};
