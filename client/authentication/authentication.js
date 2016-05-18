Template.authentication.events({
  "click #register-form-link": function(event, template){
    event.preventDefault();
    Router.go('/authentication/signup')
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(event.currentTarget).addClass('active');
  },
  "click #login-form-link": function(event, template){
    event.preventDefault();
    Router.go('/authentication/login')
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(event.currentTarget).addClass('active');
  }
});

Template.authentication.helpers({
  isLogin: function(){
    var action = Router.current().params.action
    return action == 'login';
  }
})