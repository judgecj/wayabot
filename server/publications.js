Meteor.publish('bids', function(){
  return Bids.find();
});

Meteor.publish('dailyBids', function(){
  return DailyBids.find();
});

Meteor.publish("userData", function () {
  return Meteor.users.find({}, {fields: {cardInfo: 1}});
});