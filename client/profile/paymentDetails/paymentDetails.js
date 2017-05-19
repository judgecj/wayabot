Template.paymentDetails.events({
  'click .updatePaymentInfo': function(event, template){
    event.preventDefault();
    var cardDetails = {
      cardNumber: $('#cardNumber').val(),
      cardCcv: $('#ccvNumber').val(),
      cardExpiration: $('#cardExpiry').val()
    };

    Meteor.call('updatePaymentInfo', cardDetails, function(err, res){
      if(res){
        Bert.alert('Update Successful', 'success', 'growl-top-right');
      }
      else {
        Bert.alert('Update Failed, try again', 'danger', 'growl-top-right');
      }
    });
  }
});