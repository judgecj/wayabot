Template.login.events({
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
  },
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
        email: email,
        verified: false
      }, function(error, x){
        if (error){
          console.log(error, x)
        }
        else {
          Meteor.call('sendEmail');
        }
      })
    }
    else {
      alert('passwords don\'t match')
    }
  },

  "click #login-form-link": function(event, template){
    event.preventDefault();
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(event.currentTarget).addClass('active');
  },
  "click #register-form-link": function(event, template){
    event.preventDefault();
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(event.currentTarget).addClass('active');
  }
  //  $('#login-form-link').click(function(e) {
  //   $("#login-form").delay(100).fadeIn(100);
  //   $("#register-form").fadeOut(100);
  //   $('#register-form-link').removeClass('active');
  //   $(this).addClass('active');
  //   e.preventDefault();
  // });
  // $('#register-form-link').click(function(e) {
  //   $("#register-form").delay(100).fadeIn(100);
  //   $("#login-form").fadeOut(100);
  //   $('#login-form-link').removeClass('active');
  //   $(this).addClass('active');
  //   e.preventDefault();
  // });
})