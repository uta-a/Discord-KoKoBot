import { SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import { runChat } from "../genai/genai.js";

export default {
    data: new SlashCommandBuilder()
        .setName('genai')
        .setDescription('Gemoni-2.0-flash')
        .addStringOption(option =>
            option
                .setName('prompt')
                .setDescription('プロンプト')
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option
                .setName('quiet')
                .setDescription('自分だけに見えるようにする')
        ),
    async execute(interaction) {
        const prompt = interaction.options.getString('prompt');
        const quiet = interaction.options.getBoolean('quiet');

        await interaction.deferReply({
            ephemeral: quiet ?? false,
        });

        const result = await runChat(prompt);

        if (result.length > 2000) {
            const buffer = Buffer.from(result, 'utf-8');
            const file = new AttachmentBuilder(buffer, { name: 'response.txt' });
            return interaction.followUp({
                files: [file],
            });
        }

        await interaction.followUp({
            content: result,
        });
    },
};