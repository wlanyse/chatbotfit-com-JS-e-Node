const TelegramBot = require('telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');


const token = 'COLOQUE SEU TOKEN AQUI';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async function (msg) {
    const chatId = msg.chat.id;
    console.log(msg.text);

    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

    let responseText= dfResponse.text;

    if(dfResponse.intent === 'Treino especifico') {
        responseText = youtube.searchVideoURL(responseText, dfResponse.fields.corpo.stringvalue);
    }

    bot.sendMessage(chatId, (await dfResponse.text));
    });
