Template.profile.helpers({
  user: function(){
    return Meteor.user();
  }
});

Accounts.onResetPasswordLink(function(token, done){
  Router.go('/reset-password/'+token);
});
