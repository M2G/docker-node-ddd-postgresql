/*eslint-disable*/
import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import Status from 'http-status';
import { Request, Response, NextFunction } from 'express';

/**
 * middleware to check the if auth vaid
 */

export default ({
                  repository: { usersRepository },
                  response: { Fail },
                  jwt,
                }: any) => {

  // @ts-ignore
  const strategy = new BearerStrategy(
    'bearer',
    async (
      token: any,
      done: (
        arg0: any,
        arg1: { email: string; password: string } | null,
      ) => any,
    ) => {

      const { email }: any | string = jwt.decode()(token);

      console.log('TOKEN ID BEARER', email)

        try {
          const user: any = await usersRepository.findByOne({ email });

          if (!user) return done(Status[Status.NOT_FOUND], null);

          done(null, { email: user.email, password: user.password });
        } catch (error) {
          done(error, null);
        }
    },
  );

  passport.use(strategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user: any, done) => done(null, user));

  return {
    initialize: () => passport.initialize(),
    authenticate: (req: Request, res: Response, next: NextFunction) =>
      passport.authenticate(
        'bearer',
        { session: false },
        (err, _) => {
          if (err === Status[Status.NOT_FOUND]) {
            return res
              .status(Status.NOT_FOUND)
              .json(Fail(Status[Status.NOT_FOUND]));
          }

          if (err) {
            return res
              .status(Status.UNAUTHORIZED)
              .json(Fail(Status[Status.UNAUTHORIZED]));
          }

          return next();
        },
      )(req, res, next),
  };
};
