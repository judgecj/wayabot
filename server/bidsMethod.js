Meteor.methods({
  newBid: function(bid){
    return Bids.insert({
      amount: bid.amount,
      createdAt: new Date(),
      author: Meteor.user(),
      expiryDate: new Date()
    });
  },
  createDailyBid: function(){
    return DailyBids.insert({
      amount: bid.amount,
      createdAt: new Date(),
      author: Meteor.user(),
      expiryDate: new Date()
    });
  }
});