import pool from "../Config/db";
import { userInfoType } from "../types/userType";

class User {
  userObj: userInfoType = { name: "", email: "", pwd: "", role: undefined };

  constructor(obj: userInfoType) {
    this.userObj.name = obj.name;
    this.userObj.email = obj.email;
    this.userObj.pwd = obj.pwd;
  }

  register() {}
}

export default User;
