Template.profileEdit.events({
  "click .saveProfile": function(event, template){
    event.preventDefault();
    data = {
      firstName: template.$('#editFirstName').val(),
      dob: template.$('#editDOB').val(),
      country: template.$('#editCountry').val(),
      lastName: template.$('#editLastName').val(),
      phone: template.$('#editPhoneNumber').val(),
      address: template.$('#editAddress').val(),
      postCode: template.$('#editPostalCode').val(),
      city: template.$('#editCity').val()
    };
    Meteor.call('updateProfile', data, function(error, result){
      if (result){
        Bert.alert('Update Successful', 'success', 'growl-top-right');
      }
      else {
        Bert.alert('Error updating profile', 'danger', 'growl-top-right');
      }
    });
  }
});