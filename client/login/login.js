Template.login.events({
  "click .login-btn": function(event, template){
    event.preventDefault()
    var username = template.$('.login-username').val();
    var password = template.$('.login-password').val();
    var email = template.$('.login-email').val();
    Meteor.call('findUser', email, function(err, result){
      var verification = result.emails[0].verified;
      if(verification){
        Meteor.loginWithPassword(username, password, function(error){
          if(error){
            console.log('error', error);
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
    event.preventDefault()
    var password = template.$('.signup-password').val();
    var confirm = template.$('.signup-confirm').val();

    var user = {
      username: template.$('.signup-username').val(),
      email: template.$('.signup-email').val(),
      password: template.$('.signup-password').val(),
      profile: {
        phone: template.$('.signup-phone').val(),
        businessName: template.$('.signup-businessname').val(),
        country: template.$('.signup-country').val(),
        regNum: template.$('.signup-regnum').val()
      },
      verified: false
    }
    if(password === confirm){
      //put loader somewhere here
      Accounts.createUser(user, function(error, x){
        if (error){
          // console.log('there was an error creating user', error, x)
          if(error.reason.toLowerCase() == 'login forbidden'){
            alert('Your account has been created, please check your email to verify your email address');
            Router.go('/')
          }
          else{
            alert('something went wrong, try again..try a new username or email')
          }
        }
        else {
          console.log('no error creating user', x)
        }
      });
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
})