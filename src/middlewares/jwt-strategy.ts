import passport from 'passport'
import axios from 'axios'
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt'
import { UserEntry } from "../services/user/ts/interfaces";
import User from "../models/user.model";
import dotenv from 'dotenv'

const user = new User();
dotenv.config({ path: `${String(process.env.NODE_ENV)}.env` })

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (jwtPayload, callback) => {
  try {

    const userFounded = user.getUserByEmail(jwtPayload.email)
    
    if (userFounded) return callback(null, userFounded)

    return callback(null, false)
  } catch (error) {
    return callback(error)
  }
}
))
