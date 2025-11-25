import dotenv from "dotenv";

dotenv.config();

export const config = {
  wordpress: {
    apiUrl: process.env.WP_API_URL || "",
  },
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID || "",
    dataset: process.env.SANITY_DATASET || "production",
    token: process.env.SANITY_TOKEN || "",
    apiVersion: process.env.SANITY_API_VERSION || "2024-11-25",
    useCdn: false,
  },
};
