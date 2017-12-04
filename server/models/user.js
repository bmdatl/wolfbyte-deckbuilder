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

// hash password before creating a new user
UserSchema.pre('save', function(next) {
  let user = this;
  bcrypt.genSalt((err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// password verification method
UserSchema.methods.comparePassword = function(raw_pass, cb) {
  bcrypt.compare(raw_pass, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  })
};

UserSchema.plugin(timestamp);
UserSchema.plugin(mongooseSQ);

const User = mongoose.model('User', UserSchema);
module.exports = User;
