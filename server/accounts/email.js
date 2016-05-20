Accounts.emailTemplates.siteName = "WayaBit";

Accounts.emailTemplates.verifyEmail = {
  subject: function(){
    return "[WayaBit] Verify Your Email Address";
  },
  text: function(user, url){
    var emailAddress   = user.emails[0].address;
    var urlWithoutHash = url.replace( '#/', '' );
    var supportEmail   = "support@wayabit.com";
    var emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};