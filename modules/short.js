const axios = require('axios');
const {key , token} = require('../config');
const {Telegraf} = require('telegraf');
const bot = new Telegraf(token);


const short = (url , ctx) => {
    axios.get(`http://cutt.ly/api/api.php?key=${key}&short=${url}`)
        .then((res) => {
            console.log(res.data)
            const shortenURL = res.data.url.shortLink;
            const status = res.data.url.status;
            if(status == 7){
                bot.telegram.sendMessage(
                    ctx.chat.id ,`Here's the shorten url : \n👉 ${shortenURL} .` , 
                {   reply_to_message_id: ctx.update.message.message_id ,
                    allow_sending_without_reply : true,
                    disable_web_page_preview : true,
                    reply_markup: {
                        inline_keyboard: [ [{text: shortenURL , url:shortenURL}] ]
                }})
            }else if( status == 1) {
                bot.telegram.sendMessage(
                    ctx.chat.id ,`The URL you've sent is already shortened : \n👉 ${url} .` , 
                {   reply_to_message_id: ctx.update.message.message_id ,
                    allow_sending_without_reply : true,
                    disable_web_page_preview : true,
                    reply_markup: {
                        inline_keyboard: [ [{text: url , url:url}] ]
                }})
            }
            })
        .catch(err => bot.telegram.sendMessage('Sorry, an error has been occurred. PLease try again later.'))
}

module.exports = short;