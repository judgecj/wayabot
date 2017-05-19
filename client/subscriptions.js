Meteor.subscribe('bids');

Meteor.subscribe('dailyBids');

Tracker.autorun(function () {
  Meteor.subscribe('userData', {fields: {cardInfo: 1}});
});