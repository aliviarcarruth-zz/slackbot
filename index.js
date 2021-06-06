const dotenv = require('dotenv')
const SlackBot = require('slackbots');
const axios = require('axios');
const cron = require('node-cron');

dotenv.config();

const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'testing',
});

// bot.on('start', () => {
//     const params = {
//         icon_emoji: ':robot_face:'
//     }

//     bot.postMessageToChannel(
//         'random',
//         'Get inspired while working with @testing',
//         params
//     );
	
// });

// bot.on('error', (err) => {
//     console.log(err);
// });

function createJob() {
    const task = cron.schedule(
        '31 16 * * 1-5',
        () => {
            bot.postMessageToChannel('random', 'go eat lunch Alivia!');
        },
        {
            scheduled: true,
            timezone: 'America/New_York',
        }
    );

    task.start();
}

// bot.on('start', function () {
//     bot.postMessageToUser('aliviarochester@gmail.com', 'testing app starting...');
//     createJob();
// });