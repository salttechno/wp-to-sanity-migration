import WordPressClient from "./wordpress-client.js";
import SanityClient from "./sanity-client.js";
import { config } from "./config.js";

async function testWordPress() {
  console.log("\n🔍 Testing WordPress Connection...");
  console.log(`URL: ${config.wordpress.apiUrl}`);

  try {
    const wpClient = new WordPressClient();
    const { total } = await wpClient.getPosts(1, 1);
    console.log(`✅ WordPress connected successfully! Found ${total} posts.`);
    return true;
  } catch (error) {
    console.error("❌ WordPress connection failed:", error.message);
    return false;
  }
}

async function testSanity() {
  console.log("\n🔍 Testing Sanity Connection...");
  console.log(`Project ID: ${config.sanity.projectId}`);
  console.log(`Dataset: ${config.sanity.dataset}`);

  try {
    const sanityClient = new SanityClient();
    const result = await sanityClient.query(
      '*[_type == "sanity.imageAsset"][0]'
    );
    console.log("✅ Sanity connected successfully!");
    return true;
  } catch (error) {
    console.error("❌ Sanity connection failed:", error.message);
    return false;
  }
}

async function main() {
  console.log("🧪 Testing Connections\n");
  console.log("=".repeat(50));

  const wpSuccess = await testWordPress();
  const sanitySuccess = await testSanity();

  console.log("\n" + "=".repeat(50));

  if (wpSuccess && sanitySuccess) {
    console.log("\n✅ All connections successful! Ready to migrate.");
  } else {
    console.log(
      "\n❌ Some connections failed. Please check your configuration."
    );
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
