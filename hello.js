'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
var messengerButton = "<html><head><title>StalkerBot</title></head><body><h1>StalkerBot</h1>This is a messenger bot currently in testing phase. For more details, see their <a href=\"https://developers.facebook.com/docs/messenger-platform/guides/quick-start\">docs</a>.<script src=\"https://button.glitch.me/button.js\" data-style=\"glitch\"></script><div class=\"glitchButton\" style=\"position:fixed;top:20px;right:20px;\"></div></body></html>";
var http = require('http');
const request = require('request');
var requestify = require('requestify'); 
var nlp = require('compromise');
var mongoose = require('mongoose');
var db = mongoose.connect(process.env.MONGODB_URI);
var Schema = mongoose.Schema;
var pipl = require('pipl')('SOCIAL-DEMO-dn4s9k3l9s5to9mi43kgj2kh');
var Pipl = require('machinepack-pipl');

//Google Seach API definition
var GoogleSearch = require('google-search');
var googleSearch = new GoogleSearch({
  key: 'AIzaSyCc3w6qBbxCYWqvlLujfjRVnKQ2vrH7zgI',
  cx: '015313297794051920474:b0_gcbh8jvs'
});





// Schema of mongoose definition
var StalkerBot = new Schema({
  user_id: {type: String},
  verbs: {type: String},
  nouns: {type: String},
  names: {type: String},
  places: {type: String},
  adverbs: {type: String},
  peoplenames: {type: String},
  phonenumbers: {type: String},
  questions: {type: String}
});


module.exports = mongoose.model("StalkerBot", StalkerBot);

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

var r = nlp(messageText);
var peoplenames=r.people();
var places = r.places();
var nouns = r.nouns();
var adjectives =r.adjectives();
//var hashtag =r.hashtags();
var phonenumbers= r.phoneNumbers();
var infinitive=r.verbs().toInfinitive();
var adverbs=r.adverbs();
var questions=r.questions();
var verbs=r.verbs();


if ((messageText.indexOf(':)')>=0 || messageText.indexOf(':D')>=0 || messageText.indexOf(':P'))>=0) 

{
                  sendTextMessage(senderID,"hope you are always happy :D!");
}


messageText = message.text.replace(/[,\/#!$%\^&\*;{}=\-_`~()]/g,"").toLowerCase().trim();




if (messageText.indexOf ('@')>=0 && messageText.indexOf('.')>=0)
{
  var exp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gim;
if (messageText.match(exp) !== null)
{
sendTextMessage(senderID, "Sending my birds across the globe to bring you this email owner ;)");
var emaill=messageText.match(exp)[0];



pipl.search.query({"email": emaill.toString()}, function(err, data) {
    // Here you go
wait(5000);
if(data.person)
{
wait(5000);
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', data, err); 
   sendTextMessage(senderID,"Okay! i found these information about the email you provided <3");

if (data.person.names)
for (var i = 0, len = data.person.names.length; i < len; i++) {

sendTextMessage(senderID,"The name is: "+data.person.names[i].first+" "+data.person.names[i].last);
}
if (data.person.usernames)
sendTextMessage(senderID,"The username is: "+data.person.usernames[0].content);

if (data.person.gender)
sendTextMessage(senderID,"The gender is: "+data.person.gender.content);
if (data.person.dob)
sendTextMessage(senderID,"The date of birth: "+data.person.dob.date_range.start+" and is "+data.person.dob.display);
}
else
{
  sendTextMessage(senderID,"I'm sorry but it looks like this person has no information around :(");
}
});
  
}
}

else if ((messageText.indexOf('the')>=0 && messageText.indexOf('name')>=0 && messageText.indexOf('is')>=0))

{
     sendTextMessage(senderID,"I will search for " + peoplenames.out('text'));
     var name1=peoplenames.toString().split(" ");

// search for the name

googleSearch.build({
  q: peoplenames.out('text'),
  start: 5,
  num: 10, // Number of search results to return between 1 and 10, inclusive 
  siteSearch: "http://www.linkedin.com" // Restricts results to URLs from a specified site 
}, function(error, response) {
  console.log(response);
});


pipl.search.query({"first_name": name1[0],"last_name": name1[1]}, function(err, data) {
wait(5000);
console.log("><><><><><><><><><><><><><><><><><><><><"+data);
if(data.person)
{
sendTextMessage(senderID,"Okay! i found these information about the email you provided <3");


wait(5000);  
if (data.person.names[0])
sendTextMessage(senderID,"The name is: "+data.person.names[0].first+" "+data.person.names[0].last);

if (data.person.usernames)
sendTextMessage(senderID,"The username is: "+data.person.usernames[0].content);

if (data.person.gender)
sendTextMessage(senderID,"The gender is: "+data.person.gender.content);
if (data.person.dob)
sendTextMessage(senderID,"The date of birth: "+data.person.dob.date_range.start+" and is "+data.person.dob.display);
}

else
{
  sendTextMessage(senderID,"I'm sorry but it looks like this person has no information around :(");

}
});
}

else if ((messageText.indexOf('the')>=0 && messageText.indexOf('number')>=0 && messageText.indexOf('is')>=0))

{
 var exp1 = /([0-9-]+[0-9-]+[0-9]+)/g;
		if(messageText.match(exp1).length > 0)
		{	
			var phonenumber= messageText.match(exp1)[0]; 
  
  pipl.search.query({"phone": phonenumber}, function(err, data) {
wait(5000);


if(data.person)
{		
console.log("><><><><><><><><><><><><><><><><><><><><"+data);
     sendTextMessage(senderID,"I will search for " + phonenumbers.out('text')); 
wait(5000);     
      sendTextMessage(senderID,"Okay! i found these information about the email you provided <3");
if (data.person.names[0])
sendTextMessage(senderID,"The name is: "+data.person.names[0].first+" "+data.person.names[0].last);

if (data.person.usernames)
sendTextMessage(senderID,"The username is: "+data.person.usernames[0].content);

if (data.person.gender)
sendTextMessage(senderID,"The gender is: "+data.person.gender.content);
if (data.person.dob)
sendTextMessage(senderID,"The date of birth: "+data.person.dob.date_range.start+" and is "+data.person.dob.display);
}

else
{
  sendTextMessage(senderID,"I'm sorry but it looks like this person has no information around :(");

}

  });
		}
  
}


else if (messageText.indexOf('bored')>=0 || messageText.indexOf('angry')>=0 || messageText.indexOf('feeling')>=0)

{

                  sendTextMessage(senderID,"Why are you feeling"+adjectives.out('text')+ "?");
                 
}

else if (messageText.indexOf('like')>=0 && messageText.indexOf('you')>=0 && messageText.indexOf('do')>=0)
{
  sendTextMessage(senderID,"sometimes i like "+adjectives.out('text')+ "and sometimes i don't");
}



else if (messageText.indexOf('your')>=0 && messageText.indexOf('name')>=0)

{
var answers = [ "My name is StalkerBot, and i am at your service :)",
"My name? Look at the top of your screen -.-",
"I...am...Stalkerbot...", "Come on, you don't know my name?"];

var index = Math.floor(Math.random() * answers.length);
                  sendTextMessage(senderID,answers[index]);
}

else if ((messageText.indexOf('search')>=0 || messageText.indexOf('find')>=0 || messageText.indexOf('stalk')>=0) && messageText.indexOf('name')>=0)

{
                  sendTextMessage(senderID,"Go on, tell me the name you want to stalk by writing, begin with: the name is, and i will do the rest ;)   ");


}



else if ((messageText.indexOf('search')>=0 || messageText.indexOf('find')>=0 || messageText.indexOf('stalk')>=0) && messageText.indexOf('email')>=0)

{
                  sendTextMessage(senderID,"Go on, tell me the email you want to stalk, and i will do the rest ;)");
}

else if ((messageText.indexOf('search')>=0 || messageText.indexOf('find')>=0 || messageText.indexOf('stalk')>=0) && (messageText.indexOf('number')>=0 || messageText.indexOf('phone')>=0))

{
                  sendTextMessage(senderID,"Go on, tell me the phone number you want to stalk, begin with: the name is, and i will do the rest ;)");
}

else if ((messageText.indexOf('sleep')>=0 || messageText.indexOf('sleepy')>=0 || messageText.indexOf('tired')>=0) && messageText.indexOf('i am')>=0)

{
                  sendTextMessage(senderID,"it's not a time for sleeping , stay awake and stalk");
}
else if (((messageText.indexOf('i want')>=0) && (messageText.indexOf('to')>=0)) && ((messageText.indexOf('stalk')==-1) && (messageText.indexOf('search')==-1) && (messageText.indexOf('find')==-1)))
{
  var Y="to";
  var X=messageText;
var Z = X.slice(X.indexOf(Y) + Y.length);
                  sendTextMessage(senderID,"it's not time to "+Z+" come on, let's stalk");

}
else if (messageText.indexOf('i am hungry')>=1 || messageText.indexOf('i want food')>=1)
{
                  sendTextMessage(senderID,"do you think i will order a pizza for you :P?");
}


else if (messageText.indexOf('i want to stalk')>=0)

{
                  sendTextMessage(senderID,"Let's stalk! Tell me a name, a phone number or an email ;)");
}




else if ((messageText.indexOf('job')>=0 || messageText.indexOf('do')>=0 || messageText.indexOf('goal')>=0) && messageText.indexOf('what')>=0 && messageText.indexOf('your')>=0)

{
                  sendTextMessage(senderID,"I am a stalker, i enjoy stalking people and getting their information to your doorstep, i mean messenger step :P");
}

else if ((messageText.indexOf('what')>=0 && messageText.indexOf('s')>=0 && messageText.indexOf('up')>=0) || (messageText.indexOf('how')>=0 && messageText.indexOf('are')>=0 && messageText.indexOf('you')>=0))

{
                  sendTextMessage(senderID,"I am doing great :D");
                  wait(1000);
                  
var answers2 = [ "And you?","What about you?","Are you doing great?" , "Hope everything is awesome with you"];

var index2 = Math.floor(Math.random() * answers2.length);
sendTextMessage(senderID,answers2[index2]);
}

else if(messageText.indexOf('good')>=1 || messageText.indexOf('great') >=1 || messageText.indexOf('fine') >=1 || messageText.indexOf('awesome') >=1)
{
  sendTextMessage(senderID,"Awesome!");
}

else {
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
                  
var answers1 = [ "Hello!","Hey, hope everything is great!","Ciao!", "Good day :D", "Hey Dude!" , "Hey :D", "Hello Hello :P"];

var index1 = Math.floor(Math.random() * answers1.length);
sendTextMessage(senderID,answers1[index1]);
                    break;

                default: 
if (messageText != ":d" &&  messageText != ":)" && messageText != ":p")
        sendTextMessage(senderID,"I'm sorry, i don't get what you mean by "+ messageText + " :/");

break;
    }

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
  
request({
      url: "https://graph.facebook.com/v2.6/" + senderID,
      qs: {
        access_token: process.env.PAGE_ACCESS_TOKEN,
        fields: "first_name"
      },
      method: "GET"
    }, function(error, response, body) {
      var greeting = "";
      if (error) {
        console.log("Error getting user's name: " +  error);
      } else {
        var bodyObj = JSON.parse(body);
        var name = bodyObj.first_name;
        greeting = "Hi " + name + ". ";
      }
  sendTextMessage(senderID, greeting+ " This is StalkerBot, write away any name, email address or phone number you are searching for or chat a little bit with me");
});
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


function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}	