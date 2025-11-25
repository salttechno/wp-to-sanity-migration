# Quick Start Guide

This is a simplified setup guide. For complete documentation, see [README](README.md).

## 5-Minute Setup

### 1. Install

```bash
npm install
```

### 2. Configure

```bash
cp .env.example .env
```

Edit `.env`:

- `WP_API_URL` → Your WordPress site + `/wp-json/wp/v2`
- `SANITY_PROJECT_ID` → From [sanity.io/manage](https://sanity.io/manage)
- `SANITY_TOKEN` → Create in project settings → API → Tokens

### 3. Test

```bash
npm run test
```

### 4. Migrate

```bash
npm run migrate
```

### 5. View Content

```bash
cd studio
npm install
cp .env.example .env  # Add your project ID
npm run dev
```

Open http://localhost:3333

## What Gets Migrated

✅ Posts (with rich text editor)  
✅ Categories  
✅ Tags  
✅ Images

## Need Help?

- **Full docs**: [README.md](README.md)
- **Issues**: Create on GitHub
- **Troubleshooting**: See README

---

That's it! Your WordPress blog is now in Sanity 🎉
