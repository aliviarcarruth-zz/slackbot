const dotenv = require('dotenv');
const SlackBot = require('slackbots');
const axios = require('axios');
// const cron = require('node-cron');

dotenv.config();

const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'brenton-bot',
});

bot.on('error', (err) => {
    console.log(err);
});

let today = new Date().getHours();

bot.on('start', () => {
	if(today < 12){
		return badJoke();
	} else {
		return birdImage();
	}
});

// Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})

// Response Handler
function handleMessage(message) {
    if(message.includes(' brenton')) {
        badJoke();
    } else if(message.includes(' gary')) {
        birdImage();
    } else if(message.includes(' help')) {
        runHelp();
	}
}

// create bird images - for Gary
function birdImage() {
    axios.get('https://some-random-api.ml/img/birb')
      .then(res => {
            const bird = res.data.link;
            const params = {
                icon_url: `${bird}`,
				as_user: false,
            }  
            bot.postMessageToChannel(
                '_random',
                `<- Hey *@Sunshine*, does this bird look tasty? K, bye :heart: U!`,
                params
            );
      })
}

// create bad jokes - for Brenton
function badJoke() {
    axios.get('https://geek-jokes.sameerkumar.website/api')
      .then(res => {
            const joke = res.data;

            const params = {
                icon_emoji: ':roll-eyes-brenton:'
            }
        
            bot.postMessageToChannel(
                '_random',
                `*@Brenton* ${joke}...k, bye, :heart: u!`,
                params
            );

      })
}

// create help
function runHelp() {
    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel(
        '_random',
        `Type *@brenton-bot* with *gary* to get a tasty bird image, *brenton* to get a bad joke/dad joke and *help* to get this instruction again. There just aren't enough notifications!...k, bye :heart: U!`,
        params
    );
}