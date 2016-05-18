Template.signup.events({
	"submit #register-form": function(event, template){
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
        console.log('error creating user', error);
        console.log('user was created', x);
        if (error){
          if(error.reason.toLowerCase() == 'login forbidden'){
            Session.set('signupSuccessful', true);
            $('#register-form')[0].reset();
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
  }
});

Template.signup.helpers({
  signupSuccessful: function(){
    return Session.get('signupSuccessful');
  }
});

Template.signup.onRendered( function() {
  $('#register-form-link').addClass('active');
  Session.set('signupSuccessful', false);
  $("#register-form").validate();
});

Template.signup.onDestroyed(function(){
  $('#register-form-link').removeClass('active');
})