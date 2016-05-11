Router.route('/', {
  name: 'home',
  template: 'home',
  layoutTemplate: 'index'
});

Router.route('/profile', {
  name: 'profiles',
  template: 'profiles',
  layoutTemplate: 'index'
});