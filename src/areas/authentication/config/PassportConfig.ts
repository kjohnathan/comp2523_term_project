//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file
//    Ensure code is fully typed wherever possible (unless inference can be made)

import { MockAuthenticationService } from "../services";
import * as passportLocal from "passport-local";
import WrongCredentialsException from "../../../exceptions/WrongCredentialsException";
const LocalStrategy = passportLocal.Strategy;

export default class PassportConfig {
  private _strategy;
  private _user;
  private _auth_service;

  constructor(auth_service: MockAuthenticationService) {
    this._auth_service = auth_service;
    this._strategy = new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        this._user = await auth_service.getUserByEmailAndPassword(email, password);

        return this._user ? done(null, this._user) : done(new WrongCredentialsException(), false);
      }
    );
  }

  public get strategy(): passportLocal.Strategy {
    return this._strategy;
  }

  public get user() {
    return this._user;
  }

  public get auth_service(): MockAuthenticationService {
    return this._auth_service;
  }
}
