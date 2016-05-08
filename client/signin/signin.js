Template.signin.events({
  "click .login-btn": function(event, template){
    var username = template.$('.login-username').val();
    var password = template.$('.login-password').val();
    var email = template.$('.login-email').val();
    Meteor.call('findUser', email, function(err, result){
      var verification = result.emails[0].verified;
      if(verification){
        Meteor.loginWithPassword(username, password, function(error){
          if(error){
            alert('there was an error logging you in, try again');
          }
          else {
            alert('successfully logged in');
          }
        })
      }
      else {
        alert('You need to verify your email');
      }
    });
  }
})