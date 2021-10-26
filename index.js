import DiscordJS, { Guild, Intents, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import WOKCommands from 'wokcommands';
import path from 'path';
import dotenv from 'dotenv';
import ms from 'ms';
import { link } from 'fs';
dotenv.config();

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

const rejected = new DiscordJS.MessageEmbed()
            .setColor('#2f3136')
            .setTitle('Unable to take action')
            .setDescription(`❌ **| Action cannot be taken as my highest role isn't higher than the target's highest role. |** ❌`)

client.on('ready', () => {
    console.log('Bot is online.');
    
    const guildId = '898229423336218645';
    const guild = client.guilds.cache.get(guildId);
    let commands 
    
    if (guild) {
        commands = guild.commands;
    } else {
        commands = client.application?.commands;
    };

    commands?.create({
        name: 'help',
        description: `Gives guidance on the bot's commands.`
    })
});

    
client.on('messageCreate', (message) => {
    if (message.content === 'command.com') {
        message.reply({
            content: 'Go to https://command.com',
        });
    };
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    } 

    const { commandName, options } = interaction;

    if (commandName === 'help') {
        const embed = new DiscordJS.MessageEmbed()
                .setColor('#2f3136')
                .setAuthor(`Shelby's Commands`, ``) //link
                .setDescription(`To get a better understanding of the commands, please refer to the description provided under the command in auto-complete mode. Additionally, you can find additional information on the parameters of the command there.`)
                .addField('Moderation Commands', '`ban` • `kick` • `mute` • `purge` • `role` • `unban` • `unmute` • `warn`')
                .addField('Information Commands', '`about` • `help` • `invite` • `vote` • `help`')
                .addField('General Commands', '`userinfo` • `ping`')

        interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    }
});

const join = '898587285111603221';

client.on('guildCreate', async (guild) => {
    const owner = await guild.fetchOwner().then(u => u.user.tag); 

    const embed = new DiscordJS.MessageEmbed()
        .setTitle('\:white_check_mark: Invited to server')
        .setColor('#2f3136')
        .addField(`Name`, `\n ${guild.name}\n`, true)
        .addField(`ID`, `\n ${guild.id}\n`, true)
        .addField(`Owner`, `\n ${guild.ownerId} | ${owner}\n`, true)
        .addField(`Members`, `\n ${guild.memberCount}\n`)

    client.channels.cache.get(join).send({embeds: [embed] });
    });


client.login(process.env.TOKEN);