const apiai = require("api.ai");
 
const nlp = new apiai({
  token: "<fe8a1399f67d45b5bb39d76ab3233d01>",
  session: "<unique session id>"
});

nlp.text("Hello World!", function (error, response) {
  if (error) {
    // Handle Error 
  }
  else {
  nlp.text("Hello World", callback);

  }
});