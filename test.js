var apiai = require('apiai');

var app = apiai("4921c64eea744c5a8bed203028c5037e");

var request = app.textRequest('good night', {
    sessionId: '<unique session id>'
});

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();