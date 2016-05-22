Meteor.publish('bids', function(){
  return Bids.find();
});

Meteor.publish('dailyBids', function(){
  return DailyBids.find();
});