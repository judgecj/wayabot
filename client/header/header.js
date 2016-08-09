Template.header.events({
  "click .log-out": function(){
    Meteor.logout()
  },
  "click .login-btn": function(){
    event.preventDefault();
    return Modal.show('loginModal');
  },
  "click .signup-btn": function(){
    event.preventDefault();
    return Modal.show('signupModal');
  }
})