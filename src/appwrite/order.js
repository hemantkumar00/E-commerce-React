import { Client, Databases, ID } from "appwrite";
import conf from "../conf/conf";

export class OrderService {
  client;
  database;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async createOrder({ Addresss, ProductId, PaymentInfo = "COD", UserId }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionOrder,
        ID.unique(),
        { Addresss, ProductId, PaymentInfo, UserId },
      );
    } catch (e) {
      throw e;
    }
  }

  async getOrders(queries) {
    try {
      const response = await this.database.listDocuments(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionOrder,
        this.database.queries,
      );
      return response;
    } catch (e) {
      throw e;
    }
  }
}

const orderService = new OrderService();

export default orderService;
