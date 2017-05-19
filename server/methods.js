Meteor.methods({
  sendEmail: function(userId, userEmail){
    Accounts.sendVerificationEmail(userId, userEmail)
  },
  findUser: function(email){
    var user = Accounts.findUserByEmail(email);
    return user;
  },
  updateEmail: function(newEmail, currentMail){
    var userId = Meteor.userId();
    if(Meteor.user().emails.length != 0){
      Accounts.removeEmail(userId, currentMail);
    }
    Accounts.addEmail(userId, newEmail);
    Meteor.call('sendEmail', userId, newEmail);
  },
  updateProfile: function(data){
    var updates = Meteor.users.update(Meteor.userId(), {$set: {"profile": data}});
    return updates
  },
  saveVerificationCode: function(verificationCode){
    var codeExpiration = (new Date().getTime()) + (5 *60000)
    return Meteor.users.update(Meteor.userId(), {$set: {'verificationCode': verificationCode, codeExpiration: codeExpiration, smsVerified: false}})
  },
  verifyCode: function(loginCode){
    var details = Meteor.users.findOne({_id: Meteor.userId()}, {fields: {verificationCode: 1, codeExpiration: 1}});
    if(details.verificationCode == loginCode){
      if(new Date() > new Date(details.codeExpiration)){
        throw new Meteor.Error('Code Expired', 'Your code is Expired, you need a new one');
      }
      else {
        Meteor.users.update(Meteor.userId(), {$set: {smsVerified: true}})
        return true
      }
    }
    else{
      throw new Meteor.Error('Incorrect code', 'Your verification code is incorrect');
    }
  },
  sendSms: function(verificationCode){
    var Acc_SID = process.env.twilio_Acc_SID;
    var Auth_token = process.env.twilio_Auth_token;
    var client = new Twilio({
      from: '+12015802570',
      sid: Acc_SID,
      token: Auth_token
    });
    return client.sendSMS({
      to: Meteor.user().profile.phone,
      body: 'Your login code is ' + verificationCode
    });
  },
  updatePaymentInfo: function(cardDetails){
    return Meteor.users.update(Meteor.userId(), {$set: {cardInfo: cardDetails}});
  }
});

Meteor.startup(function(){
  Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
  };
  smtp = {
    username: process.env.email,
    password: process.env.password,
    server: 'smtp.ategsoft.net',
    port: 587
  };
  process.env.MAIL_URL='smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Accounts.onCreateUser(function(options, user){
  if(user.services){
    var service = _.keys(user.services)[0];
    var email = user.services[service].email;

    if(service == 'password'){
      var googleUser = Meteor.users.findOne({'services.google.email': user.emails[0].address});
      var fbUser = Meteor.users.findOne({'services.facebook.email': user.emails[0].address});
      if(fbUser || googleUser){
        throw new Meteor.Error('User exists', 'user with this email address already exists');
      }
    }

    if (!email){
      return user;
    }

    var existingUser = Meteor.users.findOne({'emails.address': email});

    if(!existingUser){
      user.name = user.services[service].name;
      return user;
    }

    if(!existingUser.services) {
      existingUser.services = { resume: { loginTokens: [] }};
    }
    if(!existingUser.services.resume) {
      existingUser.services.resume = { loginTokens: [] };
    }

    existingUser.name = user.services[service].name;
    existingUser.services[service] = user.services[service];

    // if(user.services.resume.loginTokens){
    //   existingUser.services.resume.loginTokens.push(
    //     user.services.resume.loginTokens[0]
    //   );
    // }

    Meteor.users.remove({_id: existingUser._id});

    return existingUser;
  }
});


Accounts.validateLoginAttempt(function(user){
  if(user.error){
    if(user.error.error == 'User exists' || user.error.error == 403){
      throw new Meteor.Error('User exists', 'user with this email address already exists');
    }
  }
  var service = _.keys(user.user.services)[0]
  if(service == 'password'){
    var userId = user.user._id;
    var userEmail = user.user.emails[0].address
    if(user.methodArguments[0].verified == false){
      Meteor.call('sendEmail', userId, userEmail);
      throw new Meteor.Error('Unverified user', 'please verify your account from your email before you can log in');
    }
    else{
      return true
    }
  }
  return true
});
