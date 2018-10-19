module.exports = {
    db: {
      uri: 'mongodb://<dbuser>:<dbpassword>@ds251632.mlab.com:51632/oneuflistings', //place the URI of your mongo database here.
    }, 
    port: process.env.PORT || 4200
  };