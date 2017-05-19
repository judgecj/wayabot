 ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set: {
      appId: process.env.fb_appId,
      loginStyle: "redirect",
      secret: process.env.fb_secret
    }
  }
);

ServiceConfiguration.configurations.upsert(
 { service: "google" },
 {
   $set: {
     clientId: process.env.google_clientId,
     loginStyle: "redirect",
     secret: process.env.google_secret
   }
 }
);

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
