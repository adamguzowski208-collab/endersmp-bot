const {
Client,
GatewayIntentBits,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle,
Events
} = require("discord.js");

const express = require("express");

const app = express();

app.use(express.json());

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,
GatewayIntentBits.DirectMessages
]
});

const TOKEN = "TU_WKLEJ_TOKEN_BOTA";

const CHANNEL_ID = "ID_KANAŁU";

app.post("/podanie", async (req, res) => {

const data = req.body;

const channel = await client.channels.fetch(CHANNEL_ID);

const embed = new EmbedBuilder()
.setTitle("📩 Nowe podanie")
.setColor("#a855f7")
.addFields(
{ name: "Nick", value: data.nick },
{ name: "Discord", value: data.discord },
{ name: "Wiek", value: data.wiek },
{ name: "Powód", value: data.powod }
);

const row = new ActionRowBuilder()
.addComponents(

new ButtonBuilder()
.setCustomId("accept")
.setLabel("ZATWIERDŹ")
.setStyle(ButtonStyle.Success),

new ButtonBuilder()
.setCustomId("deny")
.setLabel("ODRZUĆ")
.setStyle(ButtonStyle.Danger)

);

await channel.send({
embeds: [embed],
components: [row]
});

res.sendStatus(200);

});

client.on(Events.InteractionCreate, async interaction => {

if (!interaction.isButton()) return;

const embed = interaction.message.embeds[0];

if (interaction.customId === "accept") {

await interaction.reply({
content: "✅ Podanie zaakceptowane",
ephemeral: true
});

}

if (interaction.customId === "deny") {

await interaction.reply({
content: "❌ Podanie odrzucone",
ephemeral: true
});

}

});

app.listen(3000);

client.login(TOKEN);
