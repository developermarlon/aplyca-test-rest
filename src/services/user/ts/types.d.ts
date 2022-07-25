import { UserEntry, UserLogged } from "./interfaces";
export type FormLogin = Pick<UserEntry, 'email' | 'password'>
export type UserApi = Omit<UserEntry, 'photo'>
export type NonSensitiveInfoUserLogged = Omit<UserEntry, 'password'>
