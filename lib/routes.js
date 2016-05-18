Router.route('/', {
  name: 'home',
  template: 'home',
  layoutTemplate: 'main'
});

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