Meteor.methods({
  sendEmail: function(){
    Accounts.sendVerificationEmail(Meteor.userId(), Meteor.user().emails[0].address)
  },
  findUser: function(email){
    var user = Accounts.findUserByEmail(email);
    return user;
  },
  changeUserName: function(username){
    Accounts.setUsername(Meteor.userId(), username)
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

// Accounts.validateLoginAttempt(function(user){
//   return user.methodArguments[0].verified
// });

// Accounts.validateNewUser(function(options, user){
//   console.log('options', options);
//   console.log('user', user);
//   Meteor.call('sendEmail', options._id, options.emails[0].address);
//   return true
// });