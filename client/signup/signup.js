Template.signup.events({
  "click .signup-btn": function(event, template){
    var username = template.$('.singunp-username').val();
    var email = template.$('.singunp-email').val();
    var password = template.$('.singunp-password').val();
    var confirm = template.$('.singunp-confirm').val();
    var phone = template.$('.singunp-phone').val();
    if(password === confirm){
      Accounts.createUser({
        username: username,
        password: password,
        email: email
      }, function(error, x){
        if (error){
          console.log(error)
        }
        else {
          Meteor.call('sendEmail');
        }
      })
    }
    else {
      alert('passwords don\'t match')
    }
  }
})

Accounts.onEmailVerificationLink(function(token, done){
  Accounts.verifyEmail(token, function(err){
    if(err){
      console.log('error', err);
    }
    else {
      alert('welcome')
    }
  })
  done()
})

