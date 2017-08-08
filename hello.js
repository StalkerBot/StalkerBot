var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

// Server index page
app.get("/", function (req, res) {
  res.send("Deployed!");
});

// Facebook Webhook
// Used for verification
app.get("/webhook", function (req, res) {
  if (req.query["hub.verify_token"] === "nadstories") {
    console.log("Verified webhook");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Verification failed. The tokens do not match.");
    res.sendStatus(403);
  }
});

app.post("/webhook", function (req, res) {
  // Make sure this is a page subscription
  if (req.body.object == "page") {
    // Iterate over each entry
    // There may be multiple entries if batched
    req.body.entry.forEach(function(entry) {
      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
         if (event.postback) {
                    processPostback(event);
                } else if (event.message) {
                    processMessage(event);
                }
            });
        });

        res.sendStatus(200);
    }
});
function processPostback(event) {
  var senderId = event.sender.id;
  var payload = event.postback.payload;

  if (payload === "Greeting") {
    // Get user's first name from the User Profile API
    // and include it in the greeting
    request({
      url: "https://graph.facebook.com/v2.6/" + senderId,
      qs: {
        access_token: process.env.PAGE_ACCESS_TOKEN,
        fields: "last_name"
      },
      method: "GET"
    }, function(error, response, body) {
      var greeting = "";
      if (error) {
        console.log("Error getting user's name: " +  error);
      } else {
        var bodyObj = JSON.parse(body);
        name = bodyObj.last_name;
        greeting = "Hi " + name + ". ";
      }
var messagenew= "Nice to meet you. This is StalkerBot! Ask away for the information of anyone you would like to find and I will try to find it for you! You can start by giving me a name, a mobile phone number or an email. What would you like to search for?"

      sendMessage(senderId, {text: messagenew});
var message = {
              attachment: {
                type: "template",
                payload: {
                  template_type: "generic",
                  elements: [{
                    title: "Welcome",
                    subtitle: greeting + "Nice to meet you. This is StalkerBot! Ask away for the information of anyone you would like to find and I will try to find it for you! You can start by giving me a name, a mobile phone number or an email. What would you like to search for?",
                    buttons: [{
                      type: "postback",
                      title: "Name",
                      payload: "name"
                    }, {
                      type: "postback",
                      title: "Number",
                      payload: "number"
                    },{
                      type: "postback",
                      title: "Email",
                      payload: "email"
                    }]
                  }]
                }
              }
            };
            
      sendMessage(senderId,message);
    });
  } else if (payload === "name") {
    sendMessage(senderId, {text: "I am searching for the name you have mentioned right now :)"});
  } else if (payload === "number") {
    sendMessage(senderId, {text: "Okay, searching for the number :)"});
  }
  
  else if (payload === "email") {
    sendMessage(senderId, {text: "Okay, searching for the email owner ;)"});
  }


  
}

// sends message to user
function sendMessage(recipientId, message) {
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
    method: "POST",
    json: {
      recipient: {id: recipientId},
      message: message,
    }
  }, function(error, response, body) {
    if (error) {
      console.log("Error sending message: " + response.error);
    }
  });
}

function processMessage(event) {
    if (!event.message.is_echo) {
        var message = event.message;
        var senderId = event.sender.id;

        console.log("Received message from senderId: " + senderId);
        console.log("Message is: " + JSON.stringify(message));

        // You may get a text or attachment but not both
        if (message.text) {
            var formattedMsg = message.text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase().trim();

            switch (formattedMsg) {
                case "hello":
                case "hi":
                case "ciao":
                case "hey":
                case "bonjour":
                case "good morning":
                    sendMessage(senderId, {text: "Hello " + name + ", Who do you want to stalk today? :P"});
                    break;
		case "what is your name": case "what is your name?": case "what is your name!":

sendMessage(senderId, {text: "My name is StalkerBot, and i am at your service :)"});
break;

	case "what can you do":   case "what do you do": case "what is your job":

sendMessage(senderId, {text: "I can get people's information for you, right now i am working on email extraction :D"});
break;

case "name": case" i am searching for a name": case "the name is":
sendMessage(senderId, {text: "I will search for the name"}); // gets the name from the last message
// searches for the name
break;

case "number": case" i am searching for a number": case "the number is":
sendMessage(senderId, {text: "I will search for the number"}); // gets the name from the last message
// searches for the number
break;


case "email": case" i am searching for an email": case "the email is":
sendMessage(senderId, {text: "I will search for the email"}); // gets the name from the last message
// searches for the email
break;
                default:
                    sendMessage(senderId, {text: "I don't get it, sorry :("});
break;
            }
        } else if (message.attachments) {
            sendMessage(senderId, {text: "Dude, are you really sending me a photo to find a person in it?"});
        }
    }
}