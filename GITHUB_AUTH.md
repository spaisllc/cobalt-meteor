# GitHub Authentication Setup

**Status:** Need to authenticate Git with GitHub

## Quick Instructions

### Option 1: Personal Access Token (Recommended)

1. **Create token:** https://github.com/settings/tokens
2. **Click:** "Generate new token (classic)"
3. **Settings:**
   - Note: "Mac Git Access"
   - Expiration: 90 days
   - Scopes: ✅ **repo**
4. **Generate and COPY token** (starts with `ghp_...`)

### Option 2: GitHub CLI (Easiest)

```bash
# Install GitHub CLI
brew install gh

# Authenticate
gh auth login

# Follow prompts, choose HTTPS
```

### Push Command

After authenticating, run:
```bash
cd /Users/goofy/.gemini/antigravity/playground/cobalt-meteor
git push -u origin main
```

## What This Does

- Connects your local code to https://github.com/spaisllc/cobalt-meteor
- Uploads all your workflows and files
- Enables sync between Mac and Windows

## After Push Success

Your workflows will be on GitHub and accessible from Windows!
