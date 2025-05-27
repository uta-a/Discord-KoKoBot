import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('imitate')
        .setDescription('他人の名前とアイコンで発言できます')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('user')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('text')
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        const text = interaction.options.getString('text');
        const channel = interaction.channel;

        await interaction.deferReply({ flags: 64 });
        
        /* webhookを作成 */
        const webhook = await channel.createWebhook({ name: 'unknown' });

        await webhook.send({
            content: text,
            username: member.displayName,
            avatarURL: user.displayAvatarURL({ dynamic: true, size: 512 }),
        });
        await webhook.delete();

        return interaction.followUp(`${member.displayName}に模倣しました`);
    }
}