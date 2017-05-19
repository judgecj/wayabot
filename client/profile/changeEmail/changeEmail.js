Template.changeEmail.events({
  "click .updateEmail": function(event, template){
    event.preventDefault();
    var newMail = template.$('#newEmailAddress').val();
    var currentMail = Meteor.user().emails[0].address
    if(newMail.length !=0 ){
      Meteor.call('updateEmail', newMail, currentMail);
      Meteor.logout();
      Bert.alert('Update Successful, please verify your email', 'success', 'growl-top-right');
      Meteor.setTimeout(function(){
        Router.go('/');
      }, 2000);
    }
    else {
      alert('Something is wrong somewhere');
    }
  },
});