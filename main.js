import { Client, ActivityType , Collection, GatewayIntentBits } from 'discord.js';
import { sendMessage } from "./discord-api/post.js";
import { config } from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';

config();

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
  ],
});

client.commands = new Collection();

const commandsPath = path.join(process.cwd(), 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = (await import(`./commands/${file}`)).default;
  client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
  client.user.setPresence({
    activities: [{
      name: '🤔：Koko鯖',
      type: ActivityType.Playing
    }],
    status: 'online'
  });
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'コマンドの実行中にエラーが発生しました。', ephemeral: true });
  }
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const myId = '530557242752237570';
    const member = message.guild.members.cache.get(myId);

    if ((member.presence.status == 'idle' || member.presence.status == 'offline') && message.mentions.has(myId, { ignoreEveryone: true })) {
        sendMessage(process.env.DISCORD_MY_TOKEN, message.channelId, "[オート返信] ただいま離席中、返信は期待しないで");
    }
});

client.login(process.env.DISCORD_TOKEN);
