 ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set: {
      appId: "268400600215172",
      loginStyle: "popup",
      secret: "36eb23c94574dcde835ee7de748b54f0"
    }
  }
);

// Accounts.loginServiceConfiguration.remove({
//   service: 'facebook'
// });

// Accounts.loginServiceConfiguration.insert({
//   service: 'facebook',
//   appId: '268400600215172',
//   secret: '36eb23c94574dcde835ee7de748b54f0'
// })


// Accounts.loginServiceConfiguration.insert({
//   service: 'github',
//   clientId: '00000',
//   secret: '00000'
// });
// Accounts.loginServiceConfiguration.insert({
//   service: 'twitter',
//   consumerKey: '00000',
//   secret: '00000'
// });
// Accounts.loginServiceConfiguration.insert({
//   service: 'google',
//   appId: '00000',
//   secret: '00000'
// });