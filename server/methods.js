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
    username: process.env.email,
    password: process.env.password,
    server: 'smtp.ategsoft.net',
    port: 587
  };
  process.env.MAIL_URL='smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Accounts.validateLoginAttempt(function(user){
  var user = user;
  var userId = user.user._id;
  var service = _.keys(user.user.services)[0];
  if(service == 'facebook' || service =='twitter' || service =='github' || service=='google'){
    var userEmail = user.user.services[service].email
  }
  else {
    var userEmail = user.user.emails[0].address
  }
  if(user.methodArguments[0].verified == false){
    Meteor.call('sendEmail', userId, userEmail);
    return false;
  }
  else {
    return true
  }
});

Accounts.onCreateUser(function(options, user){
  var service = _.keys(user.services)[0];
  if(service == 'facebook' || service =='twitter' || service =='github' || service=='google'){
    Meteor.call('findUser', user.services[service].email, function(err, result){
      if(result){
        result.services[service] = user.services[service];
        Meteor.users.remove({_id: result._id})
        user = result
      }
      user.username = user.services[service].first_name;
    });
  }
  return user
});