# Pre-Release Checklist

Before publishing to GitHub, complete these final steps:

## Review

- [ ] Review README.md for accuracy
- [ ] Update package.json with your name and email
- [ ] Update LICENSE with your name
- [x] Replace `YOUR_USERNAME` in all files with actual GitHub username (salttechno)
- [ ] Test migration with a fresh WordPress site

## Repository Setup

- [ ] Create GitHub repository
- [ ] Push code: `git push -u origin main`
- [ ] Add repository description
- [ ] Add topics: `wordpress`, `sanity`, `migration`, `cms`, `portable-text`
- [ ] Enable Issues

## Optional Enhancements

- [ ] Add GitHub Actions for testing
- [ ] Create issue templates (.github/ISSUE_TEMPLATE/)
- [ ] Add pull request template (.github/PULL_REQUEST_TEMPLATE.md)
- [ ] Create demo video/GIF for README
- [ ] Set up GitHub release workflow

## After Publishing

- [ ] Share on Twitter/LinkedIn
- [ ] Post in Sanity community
- [ ] Add to awesome-sanity list
- [ ] Create blog post about the tool

---

## Files to Customize Before Publishing

1. ~~**README.md** - Replace `YOUR_USERNAME` with GitHub username~~ ✅ Done (salttechno)
2. **package.json** - Add your name, email, and GitHub URL
3. **LICENSE** - Add your name and current year
4. **CONTRIBUTING.md** - Add maintainer contact info (optional)

## Ready to Publish?

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit: WordPress to Sanity migration tool"

# Add remote
git remote add origin https://github.com/salttechno/wp-to-sanity-migration.git

# Push
git branch -M main
git push -u origin main
```

**Note**: Make sure actual `.env` file is NOT committed! Only `.env.example` should be in the repository.
