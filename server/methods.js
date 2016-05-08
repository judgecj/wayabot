Meteor.methods({
  sendEmail: function(){
    Accounts.sendVerificationEmail(Meteor.userId(), Meteor.user().emails[0].address);
  },
  findUser: function(email){
    var user = Accounts.findUserByEmail(email);
    return user;
  }
});

Meteor.startup(function(){
  smtp = {
    username: process.env.email,
    password: process.env.password,
    server: 'smtp.gmail.com',
    port: 587
  };
  process.env.MAIL_URL='smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});