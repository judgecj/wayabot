Router.route('/', {
  name: 'home',
  template: 'home',
  layoutTemplate: 'main'
});

Router.route('/login', {
  name: 'login',
  template: 'login',
  layoutTemplate: 'main'
});

Router.route('/signup', {
  name: 'signup',
  template: 'signup',
  layoutTemplate: 'main'
});

Router.route('/profile', {
  name: 'profile',
  template: 'profile',
  layoutTemplate: 'main'
});

Router.route('/reset-password/:token', {
  name: 'reset',
  template: 'resetPassword',
  layoutTemplate: 'main'
});

Router.onBeforeAction(function(){
  if(!Meteor.user()){
    this.render('home')
  }
  else{
    this.next();
  }
}, {
  only: ['profile']
});