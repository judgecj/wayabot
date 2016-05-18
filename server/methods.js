Meteor.methods({
  sendEmail: function(userId, userEmail){
    Accounts.sendVerificationEmail(userId, userEmail)
  },
  findUser: function(email){
    var user = Accounts.findUserByEmail(email);
    return user;
  },
  changeUserName: function(username){
    Accounts.setUsername(Meteor.userId(), username)
  },
  updateEmail: function(newEmail){
    if(Meteor.user().emails.length != 0){
      Accounts.removeEmail(Meteor.userId(), Meteor.user().emails[0].address);
    }
    Accounts.addEmail(Meteor.userId(), newEmail, true);
  }
});

Meteor.startup(function(){
  Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
  };
  smtp = {
    username: process.env.email,s
    password: process.env.password,
    server: 'smtp.ategsoft.net',
    port: 587
  };
  process.env.MAIL_URL='smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Accounts.validateLoginAttempt(function(user){
  console.log('user to be logged in', user);
  var user = user;
  var userId = user.user._id;
  var userEmail = user.user.emails[0].address
  if(user.methodArguments[0].verified == false){
    Meteor.call('sendEmail', userId, userEmail);
    return false;
  }
  else {
    return true
  }
});