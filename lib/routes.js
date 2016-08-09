Router.route('/', {
  name: 'home',
  template: 'home'
});

Router.route('/verify-email/:token', function(){
  var token = this.params.token;
  Accounts.verifyEmail(token, function(err){
    if(err){
      console.log('error', err);
    }
    else {
      Router.go('/');
      alert('welcome');
      Router.go('/profile');
    }
  })
})

Router.route('/authentication/:action', {
  name: 'authentication',
  template: 'authentication',
  layoutTemplate: 'main'
});

Router.route('/signup', {
  name: 'signup',
  template: 'signup',
  layoutTemplate: 'authentication'
});

Router.route('/login', {
  name: 'login',
  template: 'login',
  layoutTemplate: 'authentication'
});

// Router.route('/profiles', {
//   name: 'profile',
//   template: 'profile',
//   layoutTemplate: 'main'
// });

Router.route('/reset-password/:token', {
  name: 'reset',
  template: 'resetPassword',
  layoutTemplate: 'main'
});

// Router.route('/bid',{
//   name: 'bids',
//   template: 'bids'
// });

// Router.onBeforeAction(function(){
//   if(!Meteor.user()){
//     this.render('home')
//   }
//   else{
//     this.next();
//   }
// }, {
//   only: ['profile']
// });


//NEW ROUTES

Router.route('/payment', {
  name: 'payment',
  template: 'payment',
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

Router.route('/confirmation', {
  name: 'confirmation',
  template: 'confirmation',
  layoutTemplate: 'main'
});

Router.route('/profile', {
  name: 'profile',
  template: 'profile',
  layoutTemplate: 'main'
});