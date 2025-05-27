import { SlashCommandBuilder } from "discord.js";
import { resetChat } from "../genai/genai.js";

export default {
    data: new SlashCommandBuilder()
        .setName('genai-reset')
        .setDescription('Gemoni-2.0-flash'),
    async execute(interaction) {
        resetChat();
        interaction.reply({
            content: '会話履歴をクリアしました',
            flags: 64,
        });
    },
};