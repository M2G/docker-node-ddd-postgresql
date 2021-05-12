/*eslint-disable*/
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
/**
 * middleware to check the if auth vaid
 */
// @ts-ignore
export default ({ config, repository: { userRepository } }) => {
  const params = {
    secretOrKey: config.authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
  }

  const strategy = new Strategy(params, (payload: { id: any; }, done: (arg0: null, arg1: null) => void) => {
    userRepository.findById(payload.id)
      // @ts-ignore
      .then((user) => {
        done(null, user)
      })
      // @ts-ignore
      .catch((error) => done(error, null))
  })

  passport.use(strategy);

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser((user: any, done) => done(null, user))

  return {
    initialize: () => {
      return passport.initialize()
    },
    authenticate: () => {
      return passport.authenticate('jwt')
    }
  }
}
