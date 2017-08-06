const FACEBOOK_ACCESS_TOKEN = '<EAATww7C4qdMBAGS5lIQBpQVURCfNlGJoxsIYgjFz2Uwj6k03uFbYdvhO737ZCvdY1ZBBetGLq6nRVrygI0OdKu4mZBfxqj7nReGydiZApxpVQWifhJNuqTqRXQEE1KFEPJMSLxVKKGSTVMKhgvdzqbbfOjQZCCLyXGX31ZBL4WtAZDZD>';
const CAT_IMAGE_URL = 'http://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg';
const API_AI_TOKEN = '<fe8a1399f67d45b5bb39d76ab3233d01>';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const request = require('request');

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: {
                attachment: {
                    type: 'image',
                    payload: { url: CAT_IMAGE_URL}
                }
            }
        }
    });
};