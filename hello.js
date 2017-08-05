const express = require("express");
const Botly = require("botly");
const botly = new Botly({
    accessToken: EAATww7C4qdMBAGS5lIQBpQVURCfNlGJoxsIYgjFz2Uwj6k03uFbYdvhO737ZCvdY1ZBBetGLq6nRVrygI0OdKu4mZBfxqj7nReGydiZApxpVQWifhJNuqTqRXQEE1KFEPJMSLxVKKGSTVMKhgvdzqbbfOjQZCCLyXGX31ZBL4WtAZDZD, //page access token provided by facebook
    verifyToken: nadstories, //needed when using express - the verification token you provided when defining the webhook in facebook
    webHookPath: https://fierce-forest-75439.herokuapp.com/webhook, //defaults to "/",
    notificationType: Botly.CONST.REGULAR //already the default (optional),
});

botly.on("message", (senderId, message, data) => {
    let text = `echo: ${data.text}`;

    botly.sendText({
      id: senderId,
      text: text
    });
});

const app = express();
app.use("/webhook", botly.router());
app.listen(3000);