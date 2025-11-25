import { createClient } from "@sanity/client";
import { config } from "./config.js";

class SanityClient {
  constructor() {
    this.client = createClient(config.sanity);
  }

  async createDocument(document) {
    try {
      const result = await this.client.create(document);
      console.log(`✓ Created document: ${result._type} - ${result._id}`);
      return result;
    } catch (error) {
      console.error("Error creating document:", error.message);
      throw error;
    }
  }

  async createOrReplace(document) {
    try {
      const result = await this.client.createOrReplace(document);
      console.log(
        `✓ Created/Updated document: ${result._type} - ${result._id}`
      );
      return result;
    } catch (error) {
      console.error("Error creating/replacing document:", error.message);
      throw error;
    }
  }

  async uploadImage(url, filename) {
    try {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      const asset = await this.client.assets.upload(
        "image",
        Buffer.from(buffer),
        {
          filename,
        }
      );
      console.log(`✓ Uploaded image: ${filename}`);
      return asset;
    } catch (error) {
      console.error(`Error uploading image ${filename}:`, error.message);
      throw error;
    }
  }

  async query(query, params = {}) {
    try {
      return await this.client.fetch(query, params);
    } catch (error) {
      console.error("Error executing query:", error.message);
      throw error;
    }
  }
}

export default SanityClient;
