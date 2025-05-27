import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('nick')
        .setDescription('メンバーのニックネームを変更')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('対象')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('nickname')
                .setDescription('ニックネーム')
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const nickname = interaction.options.getString('nickname');

        const member = interaction.guild.members.cache.get(user.id);
        if (!member) {
            return interaction.reply({
                content: '指定したユーザーは存在しません',
                flags: 64,
            });
        }

        try {
            await member.setNickname(nickname);
            await interaction.reply({
                content: `${user.globalName}のニックネームを${nickname}に変更しました`,
            });
        }
        catch (err) {
            console.log(err);
            await interaction.reply({
                content: 'ニックネームの変更に失敗しました',
                flags: 64,
            });
        }
    },
};