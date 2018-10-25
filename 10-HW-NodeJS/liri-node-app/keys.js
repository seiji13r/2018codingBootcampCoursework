console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.ombd = process.env.OMBD_API_KEY;

exports.bandsintown = process.env.BANDSINTOWN_API_KEY;