//eslint-disable-next-line
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const childProcess = require('child_process');
const { RichEmbed } = require("discord.js")

module.exports = class BroadcastCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'broadcast',
      aliases: ['announce'],
      group: 'control',
      memberName: 'broadcast',
      description: 'sends a dm to all server members',
      details: oneLine `
				This command dms a message to all server members.
        Permission is locked to Server Owners.
        Duh. Did you really expect to be able to use this?
			`,
      examples: ['broadcast memes'],
      args: [{
        key: 'toBroadcast',
        label: 'broadcast',
        prompt: 'What do you want to say?',
        type: 'string',
        infinite: false
      }],
      guildOnly: true,
      guarded: true
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('MANAGE_GUILD');
  }

  //eslint-disable-next-line class-methods-use-this
  async run(message, args) {
    const embed = new RichEmbed()
            .setAuthor(`Announcement from chrono's test server`, 'https://cdn.discordapp.com/avatars/251383432331001856/c6a0ec56ad6e5f903412cfa86eb2c8a0.png?size=2048')
            .setColor(0x0000FF)
            .setDescription(`${args.toBroadcast}`)
            .setFooter(`Sent from: ${message.author.username}`)
            .setTimestamp()
    message.guild.members.map((member) => {
      member.user.send({embed: embed})
    })
  }
};
