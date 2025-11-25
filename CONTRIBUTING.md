# Contributing to WordPress to Sanity Migration Tool

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with:

- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (Node version, OS, WordPress version, etc.)
- Any error messages or logs

### Suggesting Features

Feature suggestions are welcome! Please create an issue with:

- A clear description of the feature
- Use cases and benefits
- Possible implementation approach (optional)

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly** - Run migrations with your changes
5. **Commit with clear messages** (`git commit -m 'Add amazing feature'`)
6. **Push to your fork** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

#### PR Guidelines

- Keep PRs focused on a single change
- Update documentation if needed
- Add comments for complex logic
- Test with real WordPress data
- Follow existing code style

## Development Setup

```bash
# Clone your fork
git clone https://github.com/salttechno/wp-to-sanity-migration.git
cd wp-to-sanity-migration

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with test credentials

# Test connection
npm run test

# Run migration
npm run migrate
```

## Testing

### Manual Testing

1. **Create a test Sanity project** (don't use production!)
2. **Use a WordPress test site** or a copy of production
3. **Run the migration** with your changes
4. **Verify in Sanity Studio** that content looks correct
5. **Test with different content types** (posts with/without images, categories, tags)

### Test Cases to Cover

- Posts with featured images
- Posts without featured images
- Posts with categories and tags
- Posts with HTML formatting (headings, lists, links, bold, italic)
- Empty posts or pages
- Large numbers of posts (100+)
- Special characters in titles and content
- Different WordPress versions

## Code Style

- Use ES6+ features
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused
- Handle errors gracefully

### Example Function Documentation

```javascript
/**
 * Convert HTML string to Portable Text blocks
 * @param {string} html - HTML string to convert
 * @returns {Array} Array of Portable Text blocks
 */
export function convertHtmlToBlocks(html) {
  // implementation
}
```

## Areas for Contribution

We especially welcome contributions in these areas:

### High Priority

- 🔥 **Pages Migration** - Add support for WordPress pages
- 🔥 **Author Migration** - Migrate author data and link to posts
- 🔥 **Custom Fields** - Support for Advanced Custom Fields (ACF)

### Medium Priority

- 📊 **Progress Indicators** - Better visual feedback during migration
- 🧪 **Automated Tests** - Unit and integration tests
- 📝 **Better Logging** - Structured logging with levels
- ⚙️ **Configuration Options** - CLI flags for selective migration

### Nice to Have

- 💬 **Comments Migration** - WordPress comments to Sanity
- 🔐 **WordPress Auth** - Support for protected WordPress sites
- 📈 **Analytics** - Migration statistics and reports
- 🌍 **Multilingual** - Multi-language WordPress sites

## Project Structure

```
wp-to-sanity-migration/
├── src/
│   ├── config.js              # Configuration loader
│   ├── wordpress-client.js    # WordPress API client
│   ├── sanity-client.js       # Sanity client wrapper
│   ├── html-to-blocks.js      # HTML to Portable Text converter
│   ├── transformers.js        # Data transformations
│   ├── migrate.js             # Main migration orchestrator
│   └── test-connection.js     # Connection testing
├── studio/                     # Sanity Studio
│   ├── schemas/               # Content schemas
│   └── sanity.config.js       # Studio config
├── .env.example              # Environment template
├── package.json
└── README.md
```

## Adding New Migration Types

To add a new content type (e.g., custom post types):

1. **Add WordPress Client Method** (`src/wordpress-client.js`)

   ```javascript
   async getCustomPosts() {
     const response = await axios.get(`${this.baseUrl}/custom-posts`);
     return response.data;
   }
   ```

2. **Create Transformer** (`src/transformers.js`)

   ```javascript
   export function transformCustomPost(wpPost) {
     return {
       _type: "customPost",
       _id: `wp-custom-${wpPost.id}`,
       // ... fields
     };
   }
   ```

3. **Add Migration Function** (`src/migrate.js`)

   ```javascript
   async function migrateCustomPosts() {
     // Fetch and transform
   }
   ```

4. **Update Schema** (`studio/schemas/customPost.js`)

   ```javascript
   export default {
     name: "customPost",
     type: "document",
     fields: [
       /* ... */
     ],
   };
   ```

5. **Update Documentation** (README.md)

## Commit Message Guidelines

Use clear, descriptive commit messages:

- `feat: Add author migration support`
- `fix: Handle empty excerpt content`
- `docs: Update installation instructions`
- `refactor: Simplify HTML conversion logic`
- `test: Add tests for transformers`
- `chore: Update dependencies`

## Questions?

Feel free to:

- Open an issue for discussion
- Ask questions in your PR
- Reach out to [maintainer email/contact]

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for making this tool better! 🎉
