import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async signUp({ email, password, name }) {
    try {
      const response = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (response) {
        //TODO: Login
        return this.logIn({ email, password });
      }
      return { message: "error in signup will check what happens" };
    } catch (e) {
      throw e;
    }
  }

  async logIn({ email, password }) {
    try {
      const response = await this.account.createEmailPasswordSession(
        email,
        password,
      );
      if (response) return response;
      return { message: "Some error in login will look into it" };
    } catch (e) {
      throw e;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (e) {
      throw e;
    }
  }
}

const authService = new AuthService();

export default authService;
