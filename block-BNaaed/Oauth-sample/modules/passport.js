var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      var profileData = {
        name: profile.displayName,
        username: profile.displayName,
        email: profile._json.email,
      };
    //   console.log(profile);
      User.findOne({ email: profile._json.email }, (error, user) => {
        if (error) return done(error);
        // console.log(user, "uuuuuusssseeeerrr");
        if (!user) {
          User.create(profileData, (err, addedUSer) => {
            if (error) return done(error);
            // console.log(addedUser, "addddd");
            return done(null, addedUser);
          });
        }
        else{
            // console.log(user, "Ussserr")
            done(null, user);
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
        done(error, user)
    })
})
