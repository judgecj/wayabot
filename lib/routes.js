//this is what the onbeforeaction should look like after sms verification is added

// Router.onBeforeAction(function(){
//   if(! Meteor.userId()){
//     this.redirect('/');
//   }
//   else{
//     if(! Meteor.user().smsVerified){
//       this.redirect('/verifyUser')
//     }
//     else{
//       if(! Meteor.user().profile){
//         this.redirect('/profile')
//         Bert.alert('You need to update your profile before accessing other pages', 'info', 'growl-top-right');
//       }
//     }
//     this.next();
//   }
// }, {
//   except: ['home', 'emailVerification', 'passwordReset', 'faq', 'termsOfUse', 'privacyPolicy', 'biddingPolicy', 'sendPolicy']
// });

Router.onBeforeAction(function(){
  if(! Meteor.userId()){
    this.redirect('/');
  }
  else{
    if(! Meteor.user().profile){
      this.redirect('/profile')
      Bert.alert('You need to update your profile before accessing other pages', 'info', 'growl-top-right');
    }
    this.next();
  }
}, {
  except: ['home', 'emailVerification', 'passwordReset', 'faq', 'termsOfUse', 'privacyPolicy', 'biddingPolicy', 'sendPolicy']
});

Router.route('/', {
  name: 'home',
  template: 'home',
  layoutTemplate: 'baseTemplate'
});

Router.route('/verify-email/:token', function(){
  var token = this.params.token;
  Accounts.verifyEmail(token, function(err){
    if(err){
      console.log('Error', err);
      alert('Error, please try again' + err.reason);
    }
    else {
      alert('welcome');
      Router.go('/profile');
    }
  })
}, {
  name: 'emailVerification'
});

Router.route('/reset-password/:token', {
  name: 'passwordReset',
  template: 'resetPassword',
  layoutTemplate: 'main'
});

Router.route('/recipients', {
  name: 'recipients',
  template: 'recipients',
  layoutTemplate: 'main'
});

Router.route('/send', {
  name: 'send',
  template: 'send',
  layoutTemplate: 'main'
});

Router.route('/buy', {
  name: 'buy',
  template: 'buy',
  layoutTemplate: 'main'
});

Router.route('/transactions', {
  name: 'transactions',
  template: 'transactions',
  layoutTemplate: 'main'
});

Router.route('/profile', {
  name: 'profile',
  template: 'profile',
  layoutTemplate: 'main'
});

Router.route('/how-it-works', {
  name: 'howItWorks',
  template: 'howItWorks',
  layoutTemplate: 'baseTemplate'
});

Router.route('/faq', {
  name: 'faq',
  template: 'faq',
  layoutTemplate: 'baseTemplate'
});

Router.route('/terms-of-use', {
  name: 'termsOfUse',
  template: 'termsOfUse',
  layoutTemplate: 'baseTemplate'
});

Router.route('/privacy-policy', {
  name: 'privacyPolicy',
  template: 'privacyPolicy',
  layoutTemplate: 'baseTemplate'
});

Router.route('/bidding-policy', {
  name: 'biddingPolicy',
  template: 'biddingPolicy',
  layoutTemplate: 'baseTemplate'
});

Router.route('/send-policy', {
  name: 'sendPolicy',
  template: 'sendPolicy',
  layoutTemplate: 'baseTemplate'
});

//verify user route

// Router.route('/verifyUser', {
//   name: 'smsVerification',
//   template: 'smsVerification',
//   layoutTemplate: 'baseTemplate',
//   onBeforeAction: function(){
//     if(Meteor.user().smsVerified){
//       Router.go('/')
//     }
//     this.next()
//   }
// })
