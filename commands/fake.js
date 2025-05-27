import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('fake')
        .setDescription('架空の名前とアイコンで送信')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('名前')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('送信内容')
                .setRequired(true)
        )
        .addAttachmentOption(option =>
            option
                .setName('icon')
                .setDescription('アイコン画像')
        )
        .addStringOption(option =>
            option
                .setName('icon-url')
                .setDescription('アイコン画像のURL')
        ),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const text = interaction.options.getString('text');
        const file = interaction.options.getAttachment('icon');
        const icon_url = interaction.options.getString('icon-url');
        const channel = interaction.channel;

        await interaction.deferReply({ flags: 64 });
        
        /* webhookを作成 */
        const webhook = await channel.createWebhook({ name: 'unknown' });

        await webhook.send({
            content: text,
            username: name,
            avatarURL: file?.url || icon_url,
        });
        await webhook.delete();

        return interaction.followUp(`${name}に偽装しました`);
    }
}