var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      username:  { type: String, required: true, index: { unique: true } },
      first_name: String,
      last_name: String,
      user_email:  {
        type: String,
        required: true,
        validate: [isEmail, 'invalid email'],
        createIndexes: { unique: true },
      },
      password: { type: String, required: true }
    }
  );
  schema
    .pre('save', function(next) {
      var user = this;

      // only hash the password if it has been modified (or is new)
      if (!user.isModified('password')) return next();

      // generate a salt
      bcrypt.genSalt(10, function(err, salt) {
          if (err) return next(err);

          // hash the password using our new salt
          bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) return next(err);
              // override the cleartext password with the hashed one
              user.password = hash;
              next();
          });
      });
    })
    .method('toJSON', function(){
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

  schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
  }
  const User = mongoose.model("user", schema);
  return User;
};