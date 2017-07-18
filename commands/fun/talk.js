//eslint-disable-next-line
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const { RichEmbed } = require('discord.js');
const apiai = require('apiai');
const app = apiai("4328f50ade974d6abde23c9bfe471622");

module.exports = class EchoCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'talk',
      group: 'fun',
      memberName: 'talk',
      description: 'Echos what you say.',
      details: oneLine `
        Wanna talk?
			`,
      examples: ['talk hello chrono!'],
      args: [{
        key: 'ToTalk',
        label: 'Talk',
        prompt: 'What would you like me to say?',
        type: 'string',
        infinite: false
      }]
    })
  }

  //eslint-disable-next-line class-methods-use-this
  async run(message, args) {
    var request = app.textRequest(args.ToTalk, {
        sessionId: 'CHRONO_IS_BEST'
    });
 
    request.on('response', function(response) {
        const embed = new RichEmbed()
            .setAuthor(`Chronomandoly`, 'https://cdn.discordapp.com/avatars/251383432331001856/c6a0ec56ad6e5f903412cfa86eb2c8a0.png?size=2048')
            .setColor(0x0000FF)
            .setDescription(`${response.result.fulfillment.speech}`)
            .setFooter(`Requested by: ${message.author.username}`)
            .setTimestamp()
        message.channel.send({
            embed
        })
        console.log(response);
    });
 
    request.on('error', function(error) {
        console.log(error);
    });
 
    request.end();
  }
};
