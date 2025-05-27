import { SlashCommandBuilder } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';

export default {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('あなたがいるVCにBotが参加します'),
    async execute(interaction) {
        const channel = interaction.member.voice.channel;

        if (!channel) {
            return interaction.reply({
                content: 'ボイスチャンネルに参加してからコマンドを使用してください',
                flags: 64,
            });
        }

        joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: false,
        });

        await interaction.reply({
            content: 'VCに参加しました',
            flags: 64,
        });
    },
};
