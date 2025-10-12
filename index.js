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

// Import the 'random-quotes' package to get random quotes
const Quotes = require("randomquote-api");

// Define the /quote command for the bot
bot.command('quote', (ctx) => {
    // Get a random quote from the Quotes package
    const randomquote = Quotes.randomQuote();
    ctx.reply(`"${randomquote.quote}" — ${randomquote.author}`);
});



// Start the bot so it listens for commands in Telegram.
bot.launch();
console.log('Bot is running...');



