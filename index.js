// Import Telegraf library
const { Telegraf } = require('telegraf');

// Load environment variables from .env
require('dotenv').config();

// Create a new bot instance using your Telegram bot token 
const bot = new Telegraf(process.env.BOT_TOKEN);

// /start command -> sends welcome message
bot.start((ctx)=>{
    ctx.reply('👋 Welcome to Quote of the Day Bot! Type /quote to get an inspirational quote.');
});

// /help command → shows instructions
bot.command(('help') , (ctx)=>{
    ctx.reply('/quote -> Get a random Qutoe \n /help -> Show this help message');
});

const quotes = require('./quotes');

// /quote command → sends a random quote
bot.command('quote' , (ctx) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    ctx.reply(quotes[randomIndex]);
});


// Start the bot so it listens for commands in Telegram.
bot.launch();
console.log('Bot is running...');



