import conf from "../conf/conf";
import { Client, ID, Databases } from "appwrite";

export class CategoryService {
  client;
  database;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async createCategory({ Name }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionCategory,
        ID.unique(),
        { Name },
      );
    } catch (e) {
      throw e;
    }
  }

  async getCategorys() {
    try {
      return await this.database.listDocuments(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionCategory,
      );
    } catch (e) {
      throw e;
    }
  }
}

const categoryService = new CategoryService();

export default categoryService;
