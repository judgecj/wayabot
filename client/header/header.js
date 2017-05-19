Template.header.events({
  "click .signout": function(){
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  },
  'click .login-btn': function(event, template){
    event.preventDefault();
    return Modal.show('loginModal');
  },
  'click .signup-btn': function(event, template){
    event.preventDefault();
    return Modal.show('signupModal');
  }
})

Template.header.helpers({
  userIdentity: function(){
    if(Meteor.user().name){
      return Meteor.user().name;
    }
    else {
      return Meteor.user().emails[0].address
    }
  }
});