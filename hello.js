// index.js
'use strict';
const BootBot = require('bootbot');

const bot = new BootBot({
  accessToken: 'EAATww7C4qdMBAGS5lIQBpQVURCfNlGJoxsIYgjFz2Uwj6k03uFbYdvhO737ZCvdY1ZBBetGLq6nRVrygI0OdKu4mZBfxqj7nReGydiZApxpVQWifhJNuqTqRXQEE1KFEPJMSLxVKKGSTVMKhgvdzqbbfOjQZCCLyXGX31ZBL4WtAZDZD',
  verifyToken: 'nadstories',
  appSecret: 'b8c697be93df09e0debdbf09a27109cc'
});
bot.start();

bot.on('message', (payload, chat) => {
	const text = payload.message.text;
	console.log(`The user said: ${text}`);
});

bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
	console.log('The user said "hello", "hi", "hey", or "hey there"');
});

bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
	// Send a text message followed by another text message that contains a typing indicator
	chat.say('Hello, human friend!').then(() => {
		chat.say('How are you today?', { typing: true });
	});
});

bot.hear(['food', 'hungry'], (payload, chat) => {
	// Send a text message with quick replies
	chat.say({
		text: 'What do you want to eat today?',
		quickReplies: ['Mexican', 'Italian', 'American', 'Argentine']
	});
});

bot.hear(['help'], (payload, chat) => {
	// Send a text message with buttons
	chat.say({
		text: 'What do you need help with?',
		buttons: [
			{ type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
			{ type: 'postback', title: 'FAQ', payload: 'HELP_FAQ' },
			{ type: 'postback', title: 'Talk to a human', payload: 'HELP_HUMAN' }
		]
	});
});

bot.hear('image', (payload, chat) => {
	// Send an attachment
	chat.say({
		attachment: 'image',
		url: 'http://example.com/image.png'
	});
});
