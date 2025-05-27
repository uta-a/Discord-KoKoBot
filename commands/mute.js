import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('メンバーをミュート')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('対象')
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option
                .setName('mute')
                .setDescription('true / false')
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option
                .setName('quiet')
                .setDescription('自分だけに見えるようにする')
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const mute = interaction.options.getBoolean('mute');
        const quiet = interaction.options.getBoolean('quiet');


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

        await member.voice.setMute(mute);
        if (mute) {
            await interaction.reply({
                content: `${user}をミュートにしました`,
                ephemeral: quiet ?? false,
            });
        }
        else {
            await interaction.reply({
                content: `${user}のミュートを解除しました`,
                ephemeral: quiet ?? false,
            });
        }
    },
};
