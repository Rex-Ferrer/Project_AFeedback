module.exports = {
    db: {
      uri: 'mongodb://gatorplacer:gatorplacer1@ds137703.mlab.com:37703/gatorplacer',
    },
    port: process.env.PORT || 8080//We test locally on 8080, otherwise use port of current environment
  };
