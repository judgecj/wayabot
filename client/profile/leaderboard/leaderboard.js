Template.leaderboard.helpers({
  bidders: function(){
    var bids =  Bids.find({}, {
      sort: {
        amount: -1
      }
    });
    Session.set('highestBid', bids.fetch()[0].amount);
    return bids;
  }
});