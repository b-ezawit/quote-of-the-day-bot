import { Telegraf }from 'telegraf';
import axios from "axios";
import 'dotenv/config';

const API_LINK = "https://zenquotes.io/api/random"

function Quote(response){
    return {
        saying:response.data[0].q,
        author:response.data[0].a
    }
}


const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((context)=>{
    const name = context.from.first_name || context.from.username || '';
    context.reply(`Hey there, ${name}!\nWelcome to Quote of the Day Bot! \nType /quote to get an inspirational quote.`);
});

bot.command(('help') , (context)=>{
    context.reply('/quote -> Get a random Qutoe \n /help -> Show this help message');
});

bot.command('quote' , async (context) => {
    try {
        const response = await axios.get(API_LINK)
        const quote = Quote(response)
        const quoteStr = `"${quote.saying}" — ${quote.author}`
        context.reply(`Here is the quote of the day\n${quoteStr}`)
    } catch (error) {
        console.log("Something went wrong...\nError:",error.message)
    }
});


bot.launch();
console.log('Bot is running...');



