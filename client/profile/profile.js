Template.profile.helpers({
  user: function(){
    return Meteor.user();
  },
  biddingValue: function(){
    // var initialBid = Bids.find({}, {
    //   sort: {
    //     createdAt: -1
    //   }
    // });
    // return initialBid.fetch()[0].amount;
    return Session.get('highestBid') || 256;
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
  },
  "click .update-email": function(event, template){
    var newMail = template.$('.sign-email').val();
    Meteor.call('updateEmail', newMail);
  },
  "click .update-password": function(event, template){
    var currentPwd = template.$('.current-password').val();
    var newPassword = template.$('.new-password').val();
    var confirmPassword = template.$('.confirm-new').val();
    if(newPassword == confirmPassword) {
      Accounts.changePassword(currentPwd, newPassword, function(error){
        if(error){
          console.log(error)
        }
        else{
          alert('Password change successful');
        }
      })
    }
  },
  "click .forgot-password": function(){
    var options = {
      email: Meteor.user().emails[0].address
    }
    Accounts.forgotPassword(options, function(error){
      if(error){
        console.log(error)
      }
      else{
        alert('please check your mail for a reset password link')
      }
    })
  },
  "click .userBid": function(event, template){
    event.preventDefault();
    var bid = {
      amount: Number(template.$('.userBidValue').val())
    };
    Meteor.call('newBid', bid);
  }
});

Accounts.onResetPasswordLink(function(token, done){
  Router.go('/reset-password/'+token);
});