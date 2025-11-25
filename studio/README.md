# Sanity Studio

This is the Sanity Studio for managing your WordPress blog content after migration.

## Setup

1. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` with your Sanity project details:
   - `SANITY_STUDIO_PROJECT_ID` - Your Sanity project ID
   - `SANITY_STUDIO_DATASET` - Your dataset (usually `production`)

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The studio will be available at `http://localhost:3333`

## Schema

The studio includes the following document types:

- **Post** - Blog posts with title, slug, excerpt, body (HTML), featured image, categories, and tags
- **Category** - Blog post categories
- **Tag** - Blog post tags
- **Author** - Blog post authors (optional, for future use)

## Deployment

To deploy your studio to Sanity's hosted service:

```bash
npm run deploy
```

You'll be prompted to choose a studio hostname (e.g., `my-blog.sanity.studio`).

## Usage

After running the WordPress migration script (`npm run migrate` from the parent directory), you can use this studio to:

- View and edit migrated blog posts
- Manage categories and tags
- Upload additional images
- Create new content
