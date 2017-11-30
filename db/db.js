const config = {
  name: 'wolfbyte-db',
  version: '0.0.1',
  uri: "mongodb://wolfbyte-owner:Ul8P0jvMSPSZog5M@cluster0-shard-00-00-mrgcc.mongodb.net:27017,cluster0-shard-00-01-mrgcc.mongodb.net:27017,cluster0-shard-00-02-mrgcc.mongodb.net:27017/wolfbyte-magic?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",
  port: 3000,
  env: process.env.NODE_ENV || 'development'
};

module.exports = config;
