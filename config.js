var env = require('./env.js');

module.exports = {
  //Live Connect API information
  clientId:  process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  replyUrl :'https://playground.vroov.com:9443/token',
  version : 'v2.0',
  scopes : [
        "openid",
        "offline_access",
        "https://graph.microsoft.com/User.ReadWrite",
        "https://graph.microsoft.com/Mail.ReadWrite",
        "https://graph.microsoft.com/Calendars.ReadWrite",
        "https://graph.microsoft.com/Contacts.ReadWrite",
        "https://graph.microsoft.com/Notes.ReadWrite.CreatedByApp",
        "https://graph.microsoft.com/Notes.ReadWrite",
        "https://graph.microsoft.com/Notes.Read.All",
        "https://graph.microsoft.com/Notes.ReadWrite.All"
  ]
};