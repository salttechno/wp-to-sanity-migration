import axios from "axios";
import { config } from "./config.js";

class WordPressClient {
  constructor() {
    this.baseUrl = config.wordpress.apiUrl;
  }

  async getPosts(page = 1, perPage = 100) {
    try {
      const response = await axios.get(`${this.baseUrl}/posts`, {
        params: {
          page,
          per_page: perPage,
          _embed: true, // Include featured images and other embedded data
        },
      });

      return {
        posts: response.data,
        totalPages: parseInt(response.headers["x-wp-totalpages"] || "1"),
        total: parseInt(response.headers["x-wp-total"] || "0"),
      };
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      throw error;
    }
  }

  async getMedia(page = 1, perPage = 100) {
    try {
      const response = await axios.get(`${this.baseUrl}/media`, {
        params: {
          page,
          per_page: perPage,
        },
      });

      return {
        media: response.data,
        totalPages: parseInt(response.headers["x-wp-totalpages"] || "1"),
        total: parseInt(response.headers["x-wp-total"] || "0"),
      };
    } catch (error) {
      console.error("Error fetching media:", error.message);
      throw error;
    }
  }

  async getCategories() {
    try {
      const response = await axios.get(`${this.baseUrl}/categories`, {
        params: {
          per_page: 100,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      throw error;
    }
  }

  async getTags() {
    try {
      const response = await axios.get(`${this.baseUrl}/tags`, {
        params: {
          per_page: 100,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching tags:", error.message);
      throw error;
    }
  }
}

export default WordPressClient;
