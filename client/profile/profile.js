Template.profile.helpers({
  user: function(){
    return Meteor.user();
  }
});

Template.profile.events({
  "click .update-profile": function(event, template){
    event.preventDefault();
    var username = template.$('.signup-username').val();
    var email = template.$('.signup-email').val();
    data = {
      businessName: template.$('.signup-businessname').val(),
      country: template.$('.signup-country').val(),
      regNum: template.$('.signup-regnum').val(),
      phone: template.$('.signup-phone').val()
    }
    Meteor.users.update(Meteor.userId(), {$set: {"profile": data}});
    if(username != Meteor.user().username){
      Meteor.call('changeUserName', username);
    }
  }
});