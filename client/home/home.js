Accounts.onEmailVerificationLink(function(token, done){
	console.log('token from email', token);
  Accounts.verifyEmail(token, function(err){
  	console.log('verifying email', err);
    if(err){
      console.log('error', err);
    }
    else {
      alert('welcome')
    }
  })
  done()
})
