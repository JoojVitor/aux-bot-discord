const Discord = require("discord.js");
const config = require("./config.json");

const { Client, Intents, MessageEmbed } = Discord;
const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
})

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is logged in!`);
});

client.on('messageCreate', message => {
    if (message.channel.type === "DM" && !message.author.bot) {
        message.channel.send("Hello there!! I'm inviting you to our server," 
        + "so you can send your requests and we will contact you fast as possible 😉");

        message.channel.send('https://discord.gg/mB3jrq83Y7');
    }
});

client.once('ready', async () => {
    const channelID = '956979967248441386' //#welcome;

    try {
        let channel = await client.channels.fetch(channelID);
        let messages = await channel.messages.fetch();

        if (messages.size < 1) {
            const elden_ring_emoji = client.emojis.cache.get('957857729819607060');
            const monster_hunter_emoji = client.emojis.cache.get('957854973549490196');
            const messageEmbed = new MessageEmbed()
            .setColor('#ffd046')
            .setTitle('What game are you looking for help?')
            .setDescription('Please, react to this message with the emoji that corresponds to the game you want to request a service.')
            .addFields(
                { name: "Elden Ring", value: `react with ${elden_ring_emoji}` },
                { name: "Monster Hunter: World", value: `react with ${monster_hunter_emoji}`},
            );

            channel.send({embeds: [messageEmbed]}).then(embedMessage => {
                embedMessage.react(elden_ring_emoji);
                embedMessage.react(monster_hunter_emoji);
                console.log(embedMessage.id);
            });
        }

    } catch (error) {
        console.log(error);
      }
});

client.on("messageReactionAdd", function(messageReaction, user){
    if(messageReaction.message.id === '958108947234050118') {
        const elden_ring_emoji = client.emojis.cache.get('957857729819607060');
        const monster_hunter_emoji = client.emojis.cache.get('957854973549490196');
        
        switch (messageReaction.emoji) {
            case elden_ring_emoji:
                var role = messageReaction.message.guild.roles.cache.find(r => r.id === '957793171650261032');
                var member = messageReaction.message.guild.members.cache.find(m => m.id === user.id);
                
                member.roles.add(role);
                break;
            case monster_hunter_emoji:
                var role = messageReaction.message.guild.roles.cache.find(r => r.id === '957793288772009995');
                var member = messageReaction.message.guild.members.cache.find(m => m.id === user.id);
                
                member.roles.add(role);
                break;
            default:
                messageReaction.users.remove(user);
                break;
        }
    }
});

client.login(config.BOT_TOKEN).then(() => {
    client.user.setPresence({ activities: [{ name: 'your mind!', type: 'LISTENING' }], status: 'online' });
});