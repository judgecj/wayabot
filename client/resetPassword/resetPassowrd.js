Template.resetPassword.events({
  "click .passowrdReset-btn": function(event, template){
    var token = Router.current().params.token
    var newPassword = template.$('.newPassword').val();
    var confirmPassowrd = template.$('.confirm-newPassword').val();
    if(newPassword == confirmPassowrd){
      Accounts.resetPassword(token, newPassword, function(error){
        if(error){
          console.log(error)
        }
        else {
          alert('Passowrd changed succesfully');
          Router.go('/profile')
        }
      });
    }
    else {
      alert('Passwords don\'t match ');
    }
  }
});