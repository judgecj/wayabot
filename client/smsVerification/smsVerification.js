Template.smsVerification.events({
  'click .confirmVerification': function(event){
    event.preventDefault()
    var code = $('.verificationCode').val();
    Meteor.call('verifyCode', code, function(error, result){
      if(result){
        Router.go('/profile');
      }
      else {
        alert(error.reason);
      }
    })
  },
  'click .resendCode': function(event){
    event.preventDefault()
    var verificationCode =  Math.floor(Math.random() * 50000) + 10000;
    Meteor.call('sendSms', verificationCode, function(error, response){
      if(response){
        Meteor.call('saveVerificationCode', verificationCode, function(err, response){
          if(err){
            alert('Code sent');
          }
          else{
            console.log('error', err);
          }
        });
      }
      else{
        console.log('error o', error)
      }
    });
  }
});