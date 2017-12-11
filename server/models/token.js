const mongoose = require('mongoose'),
      mongooseSQ = require('mongoose-string-query');

const TokenSchema = new mongoose.Schema(
  {
    'access_token': {
      type: String
    },
    'token_type': {
      type: String
    },
    '.expires': {
      type: String
    },
    '.issued': {
      type: String
    }
  },
  { minimize: false }
);

TokenSchema.plugin(mongooseSQ);

const Token = mongoose.model('Token', TokenSchema);
module.exports = Token;
