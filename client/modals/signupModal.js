Template.signupModal.events({
  "submit .signupForm": function(event, template){
    event.preventDefault();
    var password = template.$('#passwordInput').val();
    var confirm = template.$('#confirmpasswordInput').val();
    var email = template.$('#emailAddressInput').val()
    var pwdValidate = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    var valid = pwdValidate.test(password)

    if(!valid){
      Bert.alert('Password Invalid', 'info', 'fixed-top');
    }
    else {
      $('.signupForm').hide();
      $('.loader').show();

      var user = {
        email: email,
        password: password,
        verified: false
      }
      if(password === confirm){
        Accounts.createUser(user, function(error){
          if (error){
            if(error.error == 'Unverified user'){
              Bert.alert('Account created, very your account from your email before login', 'success', 'fixed-top');
              $('.loader').hide();
              $('.verify-notice').show();
              Meteor.setTimeout(function(){
                $('.modal').modal('hide');
              }, 5000);
            }
            else {
              Bert.alert(error.reason, 'danger', 'fixed-top');
              $('.loader').hide();
              $('.signupForm').show();
            }
          }
          else {
            $('.modal').modal('hide');
          }
          return user
        });
      }
      else {
        Bert.alert('passwords don\'t match', 'danger', 'growl-top-right' );
        $('.loader').hide();
        $('.signupForm').show();
      }
    }
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
    Meteor.loginWithGoogle(function(error, x){
      if(error){
        alert('Error with google auth' + error);
      }
      else {
        $('.modal').modal('hide');
        Router.go('/profile');
      }
    });
  }
});