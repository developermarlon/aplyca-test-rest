import { Strategy as LocalStrategy } from 'passport-local'
import passport from 'passport'
import User from '../models/user.model';
import { FormLogin } from '../services/user/ts/types';

const user = new User();

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, callback) => {
  try {
    const userFound = await user.login({email, password} as FormLogin)

    if (userFound) {
      return callback(null, userFound, { message: 'Logged In Successfully' })
    } else {
      return callback(null, false, { message: 'Incorrect email or password.' })
    }
  } catch (error) {
    callback(error)
  }
}
))

export default null
