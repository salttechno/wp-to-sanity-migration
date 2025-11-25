# WordPress to Sanity Blog Migration Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)

A complete, production-ready tool to migrate your WordPress blog content to Sanity CMS with rich text support. Migrates posts, categories, tags, and media while converting HTML to Sanity's Portable Text format for better editing and frontend rendering.

## ✨ Features

- 🚀 **Complete Migration** - Posts, categories, tags, and media
- 📝 **Rich Text Editor** - Converts HTML to Portable Text for visual editing
- 🖼️ **Media Upload** - Automatically uploads images to Sanity
- 🔗 **Relationship Preservation** - Maintains all category and tag relationships
- 🎯 **Portable Text** - Better frontend rendering with `@portabletext/react`
- 🔄 **Idempotent** - Safe to run multiple times
- 🎨 **Sanity Studio** - Includes configured Studio for content management
- ⚡ **Fast** - Batch processing for efficient migration

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Migration](#migration)
- [Sanity Studio](#sanity-studio)
- [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- **Node.js** 18+ installed
- A **WordPress site** with REST API enabled (default for WordPress 4.7+)
- A **Sanity account** ([create one free](https://www.sanity.io/))
- A **Sanity project** created ([instructions](https://www.sanity.io/docs/create-a-sanity-project))

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/salttechno/wp-to-sanity-migration.git
cd wp-to-sanity-migration
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your details:

```env
# WordPress Configuration
WP_API_URL=https://your-wordpress-site.com/wp-json/wp/v2

# Sanity Configuration
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_TOKEN=your-write-token
SANITY_API_VERSION=2024-11-25
```

### 3. Test Connection

```bash
npm run test
```

### 4. Run Migration

```bash
npm run migrate
```

### 5. View in Studio

```bash
cd studio
npm install
cp .env.example .env  # Edit with your Sanity project details
npm run dev
```

Visit http://localhost:3333 to view your migrated content!

## Configuration

### Getting Your Sanity Credentials

#### Project ID

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Copy the **Project ID**

#### API Token

1. In your project, navigate to **API** → **Tokens**
2. Click **Add API Token**
3. Name: "WordPress Migration"
4. Permissions: **Editor** (read + write)
5. Copy the token

#### WordPress API URL

Your WordPress REST API URL format:

```
https://your-site.com/wp-json/wp/v2
```

Test it by visiting `https://your-site.com/wp-json/wp/v2/posts` in your browser.

## Migration

### What Gets Migrated

- ✅ **Posts** - All published blog posts

  - Title, slug, publish date
  - Body content (converted to Portable Text)
  - Excerpt (converted to Portable Text)
  - Featured images
  - Categories and tags

- ✅ **Categories** - All post categories
- ✅ **Tags** - All post tags
- ✅ **Media** - All images (uploaded to Sanity)

### What Doesn't Get Migrated

- ❌ Pages (blog-only migration)
- ❌ Authors (can be added if needed)
- ❌ Comments
- ❌ Custom post types
- ❌ WordPress-specific metadata

### Migration Process

The tool migrates data in this order:

1. Categories
2. Tags
3. Media (images)
4. Posts (with all relationships)

### Re-running Migration

The migration is **idempotent** - you can safely run it multiple times. It uses `createOrReplace()`, so:

- Existing documents will be updated
- No duplicates will be created
- WordPress IDs are preserved

## Sanity Studio

### Local Development

```bash
cd studio
npm run dev
```

Access at: http://localhost:3333

### Deploy Studio

```bash
cd studio
npm run deploy
```

Get a hosted URL like `your-blog.sanity.studio`

### Studio Features

- 📝 Rich text editor for posts
- 🏷️ Category and tag management
- 🖼️ Image asset management
- 🔍 Content search and filtering
- 📱 Responsive, mobile-friendly

## Portable Text

### Benefits

Content is converted from HTML to Portable Text for:

1. **Better Editing** - Visual editor instead of raw HTML
2. **Frontend Rendering** - Use `@portabletext/react` or similar
3. **Customization** - Add custom blocks, components
4. **SEO** - Semantic HTML output
5. **Future-proof** - Structured content, not locked to formatting

### Frontend Example

```javascript
import { PortableText } from "@portabletext/react";

function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <PortableText value={post.body} />
    </article>
  );
}
```

[Learn more about Portable Text](https://www.sanity.io/docs/presenting-block-text)

## Troubleshooting

### WordPress Connection Failed

**Error**: `Cannot connect to WordPress API`

**Solutions**:

- Verify your `WP_API_URL` is correct
- Try accessing the URL in your browser
- Check if the site requires authentication
- Ensure REST API is enabled (default for WP 4.7+)

### Sanity Connection Failed

**Error**: `Sanity connection failed`

**Solutions**:

- Verify your `SANITY_PROJECT_ID` is correct
- Check your `SANITY_TOKEN` has write permissions
- Ensure the token hasn't expired
- Try creating a new token

### Image Upload Errors

**Error**: `Invalid image, could not read metadata`

**Cause**: Corrupted or invalid images in WordPress

**Solution**: These errors are logged but won't stop migration. Check WordPress media library for corrupted files.

### Memory Issues

**Error**: `JavaScript heap out of memory`

**Solution**: Increase Node.js memory limit:

```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run migrate
```

## Project Structure

```
wp-to-sanity-migration/
├── src/
│   ├── config.js              # Environment configuration
│   ├── wordpress-client.js    # WordPress REST API client
│   ├── sanity-client.js       # Sanity CMS client
│   ├── html-to-blocks.js      # HTML to Portable Text converter
│   ├── transformers.js        # Data transformation functions
│   ├── migrate.js             # Main migration script
│   └── test-connection.js     # Connection testing utility
├── studio/                     # Sanity Studio
│   ├── schemas/
│   │   ├── post.js            # Blog post schema
│   │   ├── category.js        # Category schema
│   │   ├── tag.js             # Tag schema
│   │   ├── author.js          # Author schema (optional)
│   │   └── index.js           # Schema registry
│   ├── sanity.config.js       # Studio configuration
│   └── package.json
├── .env.example               # Environment template
├── package.json
└── README.md
```

## FAQ

### Can I migrate pages too?

Yes! Uncomment the page migration code in `src/migrate.js` and add the page schema to `studio/schemas/`.

### Can I migrate authors?

Yes! The schema includes an `author` type. You'll need to:

1. Fetch authors from WordPress API
2. Create transformation function
3. Update post transformer to link authors

### How do I customize the schema?

Edit files in `studio/schemas/` to match your needs. After changes, Sanity Studio will hot-reload.

### Can I migrate custom post types?

Yes! Add a new client method in `wordpress-client.js`, create a transformer, and update the migration script.

💡 **Check out the example branch**: We have a complete example of migrating a custom post type ("Case Studies") in the [`example/case-studies-migration`](https://github.com/salttechno/wp-to-sanity-migration/tree/example/case-studies-migration) branch.

### How do I query migrated content?

Use Sanity's query language (GROQ):

```javascript
*[_type == "post"] | order(publishedAt desc) {
  title,
  slug,
  publishedAt,
  excerpt,
  body,
  featuredImage,
  categories[]->,
  tags[]->
}
```

### Is this production-ready?

Yes! This tool has successfully migrated production blogs. However, always test with a Sanity project first before using in production.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

```bash
git clone https://github.com/salttechno/wp-to-sanity-migration.git
cd wp-to-sanity-migration
npm install
cp .env.example .env
# Edit .env with test credentials
npm run test
```

### Areas for Contribution

- Additional content type migrations (pages, custom post types)
- Author migration
- Comment migration
- WordPress authentication support
- Progress indicators and better logging
- Migration analytics/reporting
- Custom field migration

## License

MIT © Salt Technologies

See [LICENSE](LICENSE) for details.

## Acknowledgments

- Built with [@sanity/client](https://www.npmjs.com/package/@sanity/client)
- HTML conversion using [@sanity/block-tools](https://www.npmjs.com/package/@sanity/block-tools)
- Inspired by the Sanity community

## Maintainers

This project is maintained by Salt Technologies, a leading [Software Development Company](https://www.salttechno.com). We specialize in building scalable digital solutions.

---

**Need help?** [Open an issue](https://github.com/salttechno/wp-to-sanity-migration/issues)
