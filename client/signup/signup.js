Template.signup.events({
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
  }
})