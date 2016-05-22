Template.bids.events({
  "click .create-bid": function(event, template){
    var bid = {
      amount: template.$('.bidValue').val()
    }
    Meteor.call('createDailyBid', bid);
  }
});