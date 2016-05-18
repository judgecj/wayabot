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
      Accounts.createUser(user, function(error, x){
        if (error){
          console.log(error, x)
        }
        else {
          console.log(x)
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
})