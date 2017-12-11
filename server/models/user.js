const mongoose = require('mongoose'),
      mongooseSQ = require('mongoose-string-query'),
      timestamp = require('mongoose-timestamp'),
      bcrypt = require('bcrypt');
      //SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { minimize: false }
);

UserSchema.plugin(timestamp);
UserSchema.plugin(mongooseSQ);

const User = mongoose.model('User', UserSchema);
module.exports = User;
