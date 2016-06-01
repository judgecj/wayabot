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