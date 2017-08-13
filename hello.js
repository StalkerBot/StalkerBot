'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path'); 
var messengerButton = "<html><head><title>StalkerBot</title></head><body><h1>StalkerBot</h1>This is a messenger bot currently in testing phase. For more details, see their <a href=\"https://developers.facebook.com/docs/messenger-platform/guides/quick-start\">docs</a>.<script src=\"https://button.glitch.me/button.js\" data-style=\"glitch\"></script><div class=\"glitchButton\" style=\"position:fixed;top:20px;right:20px;\"></div></body></html>";
var http = require('http');


//var PythonShell = require('python-shell');
//PythonShell.run('my_script.py', function (err) {
  //if (err) throw err;
  //console.log('finished');
//});



let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Webhook validation
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }
});

// Display the web page that describes stalkerbot
app.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(messengerButton);
  res.end();
});

// Message processing
app.post('/webhook', function (req, res) {
  console.log(req.body);
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {
    
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else if (event.postback) {
          receivedPostback(event);   
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    res.sendStatus(200);
  }
});

// Incoming events handling
function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;

  if (messageText) {
messageText = message.text.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase().trim();

if (messageText.indexOf ('@')>=0 && messageText.indexOf('.')>=0)
{
  var exp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gim;
if (messageText.match(exp) !== null)
{
sendTextMessage(senderID, "Sending my birds across the globe to bring you this email owner ;)");
var emaill=messageText.match(exp)[0];





var calls = [];
calls.push(function(callback) {
    // First call
    http.get('http://127.0.0.1:3002/first', function (resource) {
         resource.setEncoding('utf8');
         resource.on('data', function (data) {
             console.log('first received', data);
sendTextMessage(senderID, data.toString());
             callback();
         });
    });
});
        
var async = require('async');
async.parallel(calls, function(err, results) {
    console.log('async callback ', results);
    res.render('view', results);
});
         
    
   //var pyshell = new PythonShell('my_script.py');
   //pyshell.on('message', function (message) {
  //sendTextMessage(senderID, message);
  //console.log(message);
//});
}
}
if (messageText.indexOf('bored')>=0 || messageText.indexOf('angry')>=0 || messageText.indexOf('feeling')>=0)

{

                  sendTextMessage(senderID,"Why are you feeling like this ?");
}

if (messageText.indexOf('your')>=0 && messageText.indexOf('name')>=0)

{
var answers = [ "My name is StalkerBot, and i am at your service :)",
"My name? Look at the top of your screen -.-",
"I...am...Stalkerbot...", "Come on, you don't know my name?"];

var index = Math.floor(Math.random() * answers.length);
                  sendTextMessage(senderID,answers[index]);
}

if ((messageText.indexOf('search')>=0 || messageText.indexOf('find')>=0 || messageText.indexOf('stalk')>=0) && messageText.indexOf('name')>=0)

{
                  sendTextMessage(senderID,"Go on, tell me the name you want to stalk, and i will do the rest ;)");
}

if ((messageText.indexOf('search')>=0 || messageText.indexOf('find')>=0 || messageText.indexOf('stalk')>=0) && messageText.indexOf('email')>=0)

{
                  sendTextMessage(senderID,"Go on, tell me the email you want to stalk, and i will do the rest ;)");
}

if ((messageText.indexOf('search')>=0 || messageText.indexOf('find')>=0 || messageText.indexOf('stalk')>=0) && (messageText.indexOf('number')>=0 || messageText.indexOf('phone')>=0))

{
                  sendTextMessage(senderID,"Go on, tell me the phone number you want to stalk, and i will do the rest ;)");
}

if ((messageText.indexOf('sleep')>=0 || messageText.indexOf('sleepy')>=0 || messageText.indexOf('tired')>=0) && messageText.indexOf('i am')>=0)

{
                  sendTextMessage(senderID,"it's not a time for sleeping , stay awake and stalk");
}
if ((messageText.indexOf('study')>=0 || messageText.indexOf('read')>=0) && messageText.indexOf('i want')>=0)

{
                  sendTextMessage(senderID,"it's not a time for studying , stay home and stalk");
}

if ((messageText.indexOf('eat')>=0 || messageText.indexOf('hungry')>=0 || messageText.indexOf('food')>=0)&& (messageText.indexOf('i want')>=0 || messageText.indexOf('i am')>=0))

{
                  sendTextMessage(senderID,"do you think i will order a pizza for you :P?");
}

if ((messageText.indexOf('the')>=0 && messageText.indexOf('name')>=0 && messageText.indexOf('is')>=0))

{
                  sendTextMessage(senderID,"Searching...");

//Activate search function
}


if ((messageText.indexOf('the')>=0 && messageText.indexOf('number')>=0 && messageText.indexOf('is')>=0))

{
                  sendTextMessage(senderID,"Searching...");
}





if ((messageText.indexOf('job')>=0 || messageText.indexOf('do')>=0 || messageText.indexOf('goal')>=0) && messageText.indexOf('what')>=0 && messageText.indexOf('your')>=0)

{
                  sendTextMessage(senderID,"I am a stalker, i enjoy stalking people and getting their information to your doorstep, i mean messenger step :P");
}



if ((messageText.indexOf('what')>=0 && messageText.indexOf('s')>=0 && messageText.indexOf('up')>=0) || (messageText.indexOf('how')>=0 && messageText.indexOf('are')>=0 && messageText.indexOf('you')>=0))

{
                  sendTextMessage(senderID,"I am doing great :D");
}
    switch (messageText) {
                case "hello":
                case "hi":
                case "ciao":
                case "hey":
                case "bonjour":
                case "good morning":
case "good day":
case "howdy":
case "bonsoir":
case "mar7aba":
case "hii":
case "hiii":
case "yo":
                  var answers1 = [ "Hello!",
"Hey, hope everything is great!",
"Ciao!", "Good day :)", "Hey Dude!" , "Hey :)", "Hello Hello Hello :D"];

var index1 = Math.floor(Math.random() * answers1.length);
                    sendTextMessage(senderID,answers1[index1]);
                    break;

                default:
                //sendTextMessage(senderID,person(messageText));
                //sendTextMessage(senderID,numbers (messageText));
               


break;
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "***Hoping it is not a LIKE!***... Are you trying to send an attachment? I don't accept such things");
  }
}

function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback 
  // button for Structured Messages. 
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);
if (payload =="CONTACT_INFO_PAYLOAD")
{
sendTextMessage(senderID, "We are a group of students, studying at PSUT, making this bot for testing purposes, contact us here: fb.com/nadershakhshir.ns , fb.com/roaa.irshaid , fb.com/mohdbushnaq");
}

if (payload =="ADVANCED_STALKING_PAYLOAD")
{
sendTextMessage(senderID, "Soon, you will be able to get more specific information about the people you want to stalk for a small amount of money");
}
  // When a postback is called, we'll send a message back to the sender to 
  // let them know it was successful
else {
  sendTextMessage(senderID, "Hello! This is StalkerBot, write away any name, email address or phone number you are searching for or chat a little bit with me :)");
}
}

//////////////////////////
// Sending helpers
//////////////////////////
function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}



function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }	
  });  
}

// Set Express to listen out for HTTP requests
var server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port %s", server.address().port);
});



function numbers (txt)
{
		var exp = /([0-9-]+[0-9-]+[0-9]+)/g;
		if(txt.match(exp).length > 0)
		{	
			return txt.match(exp)[0];
		}
	 else return "";
}


function person(txt)
{
	var exp = /(?:find | find: | find me | stalk | stalk: | search | search for | search for me | find for me | tell me about | who is | who's | whos)(\w+)/;
	var r = txt.match(exp);
	///p (.*?) /gi
	return r[1];
}