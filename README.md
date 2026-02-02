# Job Seeker Portfolio SaaS

Portfolio websites with AI chatbots for job seekers.

## What This Is

Custom portfolio sites for job seekers featuring:
- Professional resume display
- AI chatbot that answers recruiter questions 24/7
- Powered by OpenAI + Pinecone RAG
- Hosted on Cloudflare

## Tech Stack

- **Frontend:** HTML/CSS/JS + Tailwind CSS
- **Backend:** Node.js/Express
- **AI:** OpenAI API + Pinecone (RAG)
- **Hosting:** Cloudflare Pages
- **Domains:** Cloudflare DNS

## Project Structure

```
.agent/workflows/     # Antigravity workflows (syncs Mac ↔ Windows)
portfolio-template/   # Base template for all portfolios
backend/              # API server
clients/              # Individual customer portfolios
docs/                 # Documentation
```

## Development

Built with OpenClaw + Google Gemini AI for rapid development.

See `.agent/workflows/saas-development.md` for complete workflow.

## Quick Start

```bash
# Clone repo
git clone https://github.com/YOUR_USERNAME/cobalt-meteor.git

# On Windows: Windows Antigravity will see workflows
# On Mac: Mac Antigravity will see workflows

# Both stay in sync via GitHub!
```

## Status

- [x] Planning complete
- [x] Security hardening done
- [ ] Portfolio template (In progress)
- [ ] Chatbot widget
- [ ] Backend API
- [ ] Demo site

**Target:** MVP in 3 days (Feb 2-4, 2026)
