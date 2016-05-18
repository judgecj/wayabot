// Template.home.events({
//   "click .login-btn": function(event, template){
//     var username = template.$('.login-username').val();
//     var password = template.$('.login-password').val();
//     var email = template.$('.login-email').val();
//     Meteor.call('findUser', email, function(err, result){
//       var verification = result.emails[0].verified;
//       if(verification){
//         Meteor.loginWithPassword(username, password, function(error){
//           if(error){
//             alert('there was an error logging you in, try again');
//           }
//           else {
//             alert('successfully logged in');
//           }
//         })
//       }
//       else {
//         alert('You need to verify your email');
//       }
//     });
//   },
//   "click .signup-btn": function(event, template){
//     var username = template.$('.singunp-username').val();
//     var email = template.$('.singunp-email').val();
//     var password = template.$('.singunp-password').val();
//     var confirm = template.$('.singunp-confirm').val();
//     var phone = template.$('.singunp-phone').val();
//     if(password === confirm){
//       Accounts.createUser({
//         username: username,
//         password: password,
//         email: email,
//         verified: false
//       }, function(error, x){
//         if (error){
//           console.log(error, x)
//         }
//         else {
//           Meteor.call('sendEmail');
//         }
//       })
//     }
//     else {
//       alert('passwords don\'t match')
//     }
//   }
// })

Accounts.onEmailVerificationLink(function(token, done){
	console.log('token from email', token);
  Accounts.verifyEmail(token, function(err){
  	console.log('verifying email', err);
    if(err){
      console.log('error', err);
    }
    else {
      alert('welcome')
    }
  })
  done()
})
