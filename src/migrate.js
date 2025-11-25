import WordPressClient from "./wordpress-client.js";
import SanityClient from "./sanity-client.js";
import {
  transformPost,
  transformCategory,
  transformTag,
} from "./transformers.js";

const wpClient = new WordPressClient();
const sanityClient = new SanityClient();

async function migrateCategories() {
  console.log("\n📁 Migrating Categories...");
  try {
    const categories = await wpClient.getCategories();
    console.log(`Found ${categories.length} categories`);

    for (const category of categories) {
      const sanityDoc = transformCategory(category);
      await sanityClient.createOrReplace(sanityDoc);
    }

    console.log("✅ Categories migrated successfully");
  } catch (error) {
    console.error("❌ Error migrating categories:", error.message);
  }
}

async function migrateTags() {
  console.log("\n🏷️  Migrating Tags...");
  try {
    const tags = await wpClient.getTags();
    console.log(`Found ${tags.length} tags`);

    for (const tag of tags) {
      const sanityDoc = transformTag(tag);
      await sanityClient.createOrReplace(sanityDoc);
    }

    console.log("✅ Tags migrated successfully");
  } catch (error) {
    console.error("❌ Error migrating tags:", error.message);
  }
}

const imageAssetMap = new Map(); // Store mapping of WP media ID to Sanity asset ID

async function migrateMedia() {
  console.log("\n🖼️  Migrating Media...");
  try {
    let page = 1;
    let totalMigrated = 0;

    while (true) {
      const { media, totalPages, total } = await wpClient.getMedia(page);
      console.log(
        `Processing page ${page}/${totalPages} (${media.length} items)`
      );

      for (const item of media) {
        try {
          const asset = await sanityClient.uploadImage(
            item.source_url,
            item.title.rendered || `image-${item.id}`
          );

          // Store the mapping of WordPress media ID to Sanity asset ID
          imageAssetMap.set(item.id, asset._id);
          console.log(`✓ Mapped WP image ${item.id} -> ${asset._id}`);

          totalMigrated++;
        } catch (error) {
          console.error(`Failed to migrate media ${item.id}:`, error.message);
        }
      }

      if (page >= totalPages) break;
      page++;
    }

    console.log(`✅ Migrated ${totalMigrated} media items`);
  } catch (error) {
    console.error("❌ Error migrating media:", error.message);
  }
}

async function migratePosts() {
  console.log("\n📝 Migrating Posts...");
  try {
    let page = 1;
    let totalMigrated = 0;

    while (true) {
      const { posts, totalPages, total } = await wpClient.getPosts(page);
      console.log(
        `Processing page ${page}/${totalPages} (${posts.length} posts)`
      );

      for (const post of posts) {
        const sanityDoc = transformPost(post, imageAssetMap);
        await sanityClient.createOrReplace(sanityDoc);
        totalMigrated++;
      }

      if (page >= totalPages) break;
      page++;
    }

    console.log(`✅ Migrated ${totalMigrated} posts`);
  } catch (error) {
    console.error("❌ Error migrating posts:", error.message);
  }
}

async function main() {
  console.log("🚀 Starting WordPress to Sanity Blog Migration\n");
  console.log("=".repeat(50));

  // Migrate in order of dependencies
  await migrateCategories();
  await migrateTags();
  await migrateMedia();
  await migratePosts();

  console.log("\n" + "=".repeat(50));
  console.log("🎉 Blog Migration Complete!");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
