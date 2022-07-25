import axios from 'axios';
import { FormLogin, NonSensitiveInfoUserLogged, UserApi } from "../services/user/ts/types";
import { FormCreateUser } from "../services/user/ts/interfaces";
import { UserEntry } from "../services/user/ts/interfaces";
import jwt from 'jsonwebtoken'

const user = new Map<string | number, UserEntry>();

export default class User {

  public constructor () {
  }

  public getAllUsers(): Array<UserEntry> {
    const users = Array.from(user.values());
    return users as UserEntry[];
  }

  public getUserByEmail(email: string): UserEntry | undefined {
    const userFounded: UserEntry | undefined = user.get(email)
    return  userFounded;
  }

  public async login(form: FormLogin): Promise<NonSensitiveInfoUserLogged> {
    try {
      const userFounded: UserEntry | undefined = user.get(form.email);

      if(!userFounded) throw new Error('User not found');
      
      const token = jwt.sign({ email: userFounded.email, id: userFounded.id }, String(process.env.JWT_SECRET) , { expiresIn: "5d" });
      
      const { id, name, username, email, phone, website, address, company, createdAt, ...restOfUser } = userFounded
      
      return Object.assign({ id, name, username, email, phone, website, address, company }, {
        token: `Bearer ${token}`,
        loggedAt: new Date(),
        createdAt: createdAt,
      }) as NonSensitiveInfoUserLogged;

    }catch(e: any) {
      console.log(e)
      return Promise.reject({message: e.message});
    }
  }

  public createUser(form: FormCreateUser): UserEntry {
    if(user.has(form.email)) throw new Error('User already exists');

    const userCreated: UserEntry = {
      id: user.size + 1,
      name: form.name,
      username: form.username,
      email: form.email,
      password: form.password,
      address: {
        street: form.address.street,
      },
      phone: form.phone,
      website: form.website,
      company: {
        name: form.company.name,
      },
      createdAt: new Date(),
    };

    user.set(form.email, userCreated);

    return userCreated;
  }
}

(async () => {
  const response: {data: UserApi[]} = await axios.get('https://jsonplaceholder.typicode.com/users')
  response.data.forEach((item: any) => user.set(item.email, item))
  console.info(`${user.size} USERS LOADED`);
})()
//https://jsonplaceholder.typicode.com/todos?userId=1
