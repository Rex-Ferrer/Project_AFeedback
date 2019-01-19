module.exports = {
    db: {
      uri: 'mongodb://password:password1@ds261114.mlab.com:61114/swamphacks',
    },
    port: process.env.PORT || 8080//We test locally on 8080, otherwise use port of current environment
  };
