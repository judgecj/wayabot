import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

if(Meteor.isClient){
  Template.main.events({
    'click .everything': function(){
      console.log('something has happend on the page');
    }
  });
}

