const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')

passport.use(
  new GoogleStrategy(
    {
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:  '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase()
        if (!email) return done(new Error('No email from Google'), null)

        // Find existing user by googleId or email
        let user = await User.findOne({ $or: [{ googleId: profile.id }, { email }] })

        if (!user) {
          // First Google login — create account
          user = await User.create({
            name:     profile.displayName,
            email,
            googleId: profile.id,
            avatar:   profile.photos?.[0]?.value || null,
            password: null,
          })
        } else if (!user.googleId) {
          // Existing email account — link Google
          user.googleId = profile.id
          user.avatar   = user.avatar || profile.photos?.[0]?.value || null
          await user.save()
        }

        return done(null, user)
      } catch (err) {
        return done(err, null)
      }
    },
  ),
)

module.exports = passport
