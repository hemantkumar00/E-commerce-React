import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class ProductService {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Create product for the first time.
  async createProduct({
    Name,
    Price,
    Desc,
    Additionalinfo,
    Category,
    Status,
    Stock,
  }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionProduct,
        ID.unique(),
        { Name, Price, Desc, Additionalinfo, Category, Status, Stock },
      );
    } catch (e) {
      throw e;
    }
  }

  //Update the product.
  async updateProduct(
    ID,
    { Name, Price, Desc, Additionalinfo, Category, Status, Stock },
  ) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionProduct,
        ID,
        { Name, Price, Desc, Additionalinfo, Category, Status, Stock },
      );
    } catch (e) {
      throw e;
    }
  }

  // Get all products and base on category also.

  //TODO: Pagination and ascending order and desending order will think on thisasync getProducts(
  async getProducts(value) {
    try {
      let queries = [
        Query.equal("Status", "active"),
        Query.greaterThan("Stock", 0),
        Query.equal("Category", value),
      ];

      // Add the category query only if a value is provided

      return await this.database.listDocuments(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionProduct,
        this.database.queries,
      );
    } catch (e) {
      throw e;
    }
  }

  async deleteProduct({ productId }) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionProduct,
        productId,
      );
      return true;
    } catch (e) {
      throw e;
    }
  }

  // Get single product also.
  async getProduct({ productId }) {
    try {
      return await this.database.getDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionProduct,
        productId,
      );
    } catch (e) {
      throw e;
    }
  }

  // Upload photo section.

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (e) {
      throw e;
    }
  }

  async deleteFile(fileId = "") {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (e) {
      throw e;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const productService = new ProductService();

export default productService;
