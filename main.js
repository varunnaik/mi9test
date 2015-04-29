var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use (function (error, request, response, next){
    response.status(406).send('Invalid JSON');
});

app.set('port', (process.env.PORT || 3000));

app.get('/', function(request, response) {
  response.send('Please Post data instead.');
});

app.post('/', function(request, response) {
    // Parse the incoming data
    var json = request.body;
    var matchedShows = [];

    if (!json.payload) {
        response.status(406).send('Could not parse; Unexpected JSON in input.');
    }

    json.payload.forEach(function(show) {
        if (show.drm) {
            if (show.episodeCount > 0) {
                matchedShows.push({
                    "image": show.image.showImage,
                    "slug": show.slug,
                    "title": show.title
                });
            }
        }
    });
    response.json({"response": matchedShows}).end();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
