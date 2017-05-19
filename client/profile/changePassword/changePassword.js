Template.changePassword.events({
  "click .savePassword": function(event, template){
    event.preventDefault();
    var currentPwd = template.$('#oldPassword').val();
    var newPassword = template.$('#newPassword').val();
    var confirmPassword = template.$('#confirmNewPassword').val();
    if(newPassword == confirmPassword) {
      Accounts.changePassword(currentPwd, newPassword, function(error){
        if(error){
          Bert.alert('Error changing Password: ' + error.reason, 'danger', 'growl-top-right');
        }
        else{
          Bert.alert('Password change successful', 'success', 'growl-top-right');
        }
      })
    }
    else {
      Bert.alert('New passwords don\'t match', 'danger', 'growl-top-right');
    }
  },
});