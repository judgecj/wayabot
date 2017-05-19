Template.loginModal.events({
  "submit .loginForm": function(event, template){
    event.preventDefault();
    var username = template.$('#loginUsernamelInput').val();
    var password = template.$('#loginPasswordInput').val();
    var email = template.$('#loginEmailInput').val();
    Meteor.call('findUser', email, function(err, result){
      if(result == undefined){
        return Bert.alert('User not found', 'danger', 'growl-top-right' );
      }
      var verification = result.emails[0].verified;
      if(verification){
        Meteor.loginWithPassword(email, password, function(error){
          if(error){
            Bert.alert('Password Incorrect', 'danger', 'growl-top-right' );
          }
          else {
            $('.modal').modal('hide');
            Router.go('/profile');
            Bert.alert('successfully logged in', 'success', 'growl-top-right' );

            //Send sms to user for login

            // Router.go('/verifyUser');
            // var verificationCode =  Math.floor(Math.random() * 50000) + 10000;
            // Meteor.call('sendSms', verificationCode, function(error, response){
            //   if(response){
            //     Meteor.call('saveVerificationCode', verificationCode, function(err, response){
            //       // Router.go('/verifyUser')
            //       if(err){
            //         alert('Error sending verification code, try again');
            //         // Bert.alert('Error saving verificationCode, try again', 'danger', 'fixed-top' );
            //       }
            //     });
            //   }
            //   else{
            //     console.log(2, error, response)
            //     // Bert.alert('Error sending verificationCode, try again', 'danger', 'fixed-top' );
            //     alert('Error sending verification code, try again');
            //   }
            // });
          }
        })
      }
      else {
        // alert('You need to verify your email');
        Bert.alert('You need to verify your email', 'info', 'fixed-top');
      }
    });
  },
  "click .facebook-login": function(){
    Meteor.loginWithFacebook({
      requestPermissions: ['email']
    }, function(error){
      if(error){
        alert('there was an error with facebook-login');
      }
      else {
        $('.modal').modal('hide');
        Router.go('/profile');
      }
    });
  },
  "click .google-login": function(event, template){
    event.preventDefault();
    Meteor.loginWithGoogle(function(error, response){
      if(error){
        alert('Error with google auth' + error);
      }
      else {
        $('.modal').modal('hide');
        Router.go('/profile');
      }
    });
  },
  "click .forgotPwd": function(){
    var options = {
      email: Meteor.user().emails[0].address
    }
    Accounts.forgotPassword(options, function(error){
      if(error){
        console.log(error)
      }
      else{
        alert('please check your mail for a reset password link')
      }
    })
  },
});