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

Router.route('/profile', {
  name: 'profile',
  template: 'profile',
  layoutTemplate: 'main'
});