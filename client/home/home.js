Accounts.onEmailVerificationLink(function(token, done){
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

Template.home.onRendered(function(){
  $("#sliderImgContainer").vegas({
      delay: 8000,
      shuffle: true,
      overlay: true,
      timer: false,
      slides: [
          { src: "http://res.cloudinary.com/doy1ofzki/image/upload/v1466683160/bg02_zcqlzj.jpg" },
          { src: "http://res.cloudinary.com/doy1ofzki/image/upload/v1466682685/bgimg01_clkd3f.jpg" }
      ]
  });

});

