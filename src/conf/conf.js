const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDataBaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionProduct: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_PRODUCT,
  ),
  appwriteCollectionCategory: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_CATEGORY,
  ),
  appwriteCollectionOrder: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_ORDER,
  ),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;
