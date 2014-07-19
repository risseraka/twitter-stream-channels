//example listening to "channels/channelName" events

var TwitterStreamChannels = require('../../main').getMockedClass();
var credentials = require('../../twitter.credentials.json');//not necessary - since using mock
var tweetsMock = require('../../mocks/data/tweets.json');

var client = new TwitterStreamChannels(credentials);

var channelsInput = {
  "colors": "blue,white,yellow,green,orange",
  "fruits": ['kiwi', 'orange,apple', 'lemon', 'coconut'],
  "starWarsCharacters": ['Luke', 'Leia,Han', 'Yoda']
};

var stream = client.streamChannels({
  track: channelsInput,
  enableChannelsEvents:true,
  enableRootChannelsEvent:false,
  enableKeywordsEvents:false
});

var count = 0;

stream.on('connect', function() {
  console.log('> attempting to connect to twitter');
});

stream.on('connected', function() {
  console.log('> twitter emit : connected - listening to channel "fruits"');
});

stream.on('disconnect', function() {
  console.log('> twitter emit : disconnect');
});

stream.on('channels/fruits',function(tweet){
  console.log(tweet.$channels,tweet.text);
  count++;
});

setTimeout(function() {
  stream.stop();
  console.log('> stopped stream '+count+' tweets captured on '+tweetsMock.length);
  process.exit();
}, 3000);