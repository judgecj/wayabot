Template.login.events({
  "submit #login-form": function(event, template){
    event.preventDefault()
    var username = template.$('.login-username').val();
    var password = template.$('.login-password').val();
    var email = template.$('.login-email').val();
    Meteor.call('findUser', email, function(err, result){
      if(result == undefined){
        alert('can\'t find user with email', email);
        return;
      }
      var verification = result.emails[0].verified;
      if(verification){
        Meteor.loginWithPassword(username, password, function(error){
          if(error){
            alert('Password Incorrect');
          }
          else {
            alert('successfully logged in');
            Router.go('/')
          }
        })
      }
      else {
        alert('You need to verify your email');
      }
    });
  },

  "click #olvidado": function(event, template){
    event.preventDefault();
    $('div#form-olvidado').toggle('500');
  },

  "submit #forgot-password": function(event, template){
    event.preventDefault();
    var options = {
      email: template.$('.reset-email').val()
    };
    Accounts.forgotPassword(options, function(err){
      if(err){
        alert('error occured, try again');
      }
      else{
        alert('reset email sent, check your email for further instructions')
      }
    });
  }
});

Template.login.onRendered( function() {
  $("#login-form").validate();
  $("#login-form-link").addClass('active');
});

Template.login.onDestroyed(function(){
  $("#login-form-link").removeClass('active');
})