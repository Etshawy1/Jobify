const passport = require('passport');
const googleStrategy = require('passport-google-plus-token');
const catchAsync = require('./../utils/catchAsync').fourArg;
const { User } = require('./../models/userModel');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// passport.use(
//   'googleToken',
//   new googleStrategy(
//     {
//       clientID: process.env.CLIENT_ID_GOOGLE,
//       clientSecret: process.env.CLIENT_SECRET_GOOGLE
//     },
//     catchAsync(async (accessToken, refreshToken, profile, done) => {
//       if (!profile.emails[0].value) {
//         profile.emails[0].value = profile._json.email;
//       }
//       const existingUser = await User.findOne({
//         googleId: profile.id
//       });

//       if (existingUser) {
//         if (
//           existingUser.imagUrl == undefined ||
//           existingUser.imageUrl ==
//             'https://thesymphonia.ddns.net/api/v1/images/users/default.png'
//         ) {
//           existingUser.imageUrl = profile.photos[0].value;
//         }
//         existingUser.last_login = Date.now();
//         await existingUser.save({
//           validateBeforeSave: false
//         });
//         existingUser.status = 200;
//         done(null, existingUser);
//       } else {
//         const existedEmail = await User.findOne({
//           email: profile.emails[0].value
//         });
//         if (existedEmail) {
//           if (
//             existedEmail.imagUrl == undefined ||
//             existedEmail.imageUrl ==
//               'https://thesymphonia.ddns.net/api/v1/images/users/default.png'
//           ) {
//             existedEmail.imageUrl = profile.photos[0].value;
//           }
//           existedEmail.googleId = profile.id;
//           existedEmail.imageGoogleUrl = profile.photos[0].value;
//           existedEmail.last_login = Date.now();
//           await existedEmail.save({
//             validateBeforeSave: false
//           });
//           existedEmail.status = 200;
//           done(null, existedEmail);
//         } else {
//           const newUser = new User({
//             email: profile.emails[0].value,
//             name: profile.displayName,
//             googleId: profile.id,
//             imageGoogleUrl: `${profile.photos[0].value}`,
//             imageUrl: `${profile.photos[0].value}`,
//             last_login: Date.now(),
//             type: 'user'
//           });
//           await newUser.save({
//             validateBeforeSave: false
//           });
//           newUser.status = 201;
//           done(null, newUser);
//         }
//       }
//     })
//   )
// );
