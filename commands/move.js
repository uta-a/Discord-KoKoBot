import { SlashCommandBuilder, ChannelType } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('move')
        .setDescription('メンバーの移動')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('移動する対象')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('移動先')
                .addChannelTypes(ChannelType.GuildVoice)
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const channel = interaction.options.getChannel('channel');

        const member = interaction.guild.members.cache.get(user.id);
        if (!member) {
            return interaction.reply({
                content: '指定したユーザーは存在しません',
                flags: 64,
            });
        }

        if (!member.voice.channel) {
            return interaction.reply({
                content: '指定したユーザーはVCにいません',
                flags: 64,
            });
        }

        await member.voice.setChannel(channel);
        await interaction.reply({
            content: `${user}を${channel}に移動させました`
        });
    }
}