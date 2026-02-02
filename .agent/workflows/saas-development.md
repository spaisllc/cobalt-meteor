---
description: SaaS development workflow with Claude, OpenClaw, and Kimi AI
---

# SaaS Development Workflow

**Last Updated:** 2026-02-02

## Overview

User is building a new SaaS business and wants to use AI tools cost-effectively while learning.

## Tool Setup

### Active AI Tools

1. **Claude (Antigravity/me)** - For planning, architecture, review, complex reasoning
2. **OpenClaw** - AI agent framework installed locally
3. **Kimi AI (Moonshot)** - Cost-effective coding model ($0.60/M input)
4. **Google Gemini** - Fallback models already configured

### OpenClaw Configuration

- **Version:** 2026.1.30
- **Location:** `~/.openclaw/`
- **Gateway:** Local-only (loopback) on port 18789
- **Security:** Comprehensive hardening implemented (see AGENTS.md)
- **Models configured:**
  - Primary: Google Gemini 3 Pro Preview
  - Fallback: Google Gemini 1.5 Flash 8B
  - Kimi: `kimi-coding/k2p5` (when API key added)

### Security Features Active

- ✅ Command approval required
- ✅ Password managers blocked
- ✅ SSH keys protected (~/.ssh/)
- ✅ Clipboard security
- ✅ Production SSH blocking
- ✅ Credential auto-redaction
- ✅ Workspace restrictions
- ✅ Token limits: 100k/day, 50k/agent

## Recommended Workflow

### Phase 1: Planning & Architecture (Use Claude in Antigravity)

**What to do here:**
- Discuss features and requirements
- Design system architecture
- Plan database schemas
- Make strategic decisions
- Review generated code

**Why:** Claude excels at reasoning, planning, and understanding complex requirements

### Phase 2: Implementation (Use OpenClaw + Kimi)

**What to do:**
- Generate boilerplate code
- Build features and components
- Create API endpoints
- Build UI components
- Write tests

**Commands:**
```bash
# For coding tasks (cheapest)
openclaw agent --model kimi-coding/k2p5 --message "your coding task"

# For simple tasks (fast)
openclaw agent --model google/gemini-1.5-flash-8b --message "simple task"

# For complex reasoning (expensive, use sparingly)
openclaw agent --model google/gemini-3-pro-preview --message "complex task"
```

**Why:** Kimi is 50x cheaper than premium models for coding tasks

### Phase 3: Review & Iterate (Back to Claude)

**What to do:**
- Review OpenClaw-generated code
- Spot issues and improvements
- Refine requirements
- Plan next iteration

**Why:** Human-like review and strategic thinking

## Cost Optimization Strategy

### Model Selection Guide

| Task Type | Use This Model | Cost | Why |
|-----------|----------------|------|-----|
| Planning/Architecture | Claude (Antigravity) | Included | Best reasoning |
| Code generation | Kimi (`kimi-coding/k2p5`) | $0.60/M | Specialized, cheap |
| Quick questions | Gemini Flash | ~$0.075/M | Fast, cheap |
| Complex debugging | Gemini Pro | ~$2.50/M | When Kimi struggles |
| Code review | Claude (Antigravity) | Included | Best judgment |

### Expected Monthly Costs

**For typical SaaS development:**
- Kimi coding: $5-15/month
- Gemini fallbacks: $2-5/month
- **Total:** ~$10-20/month

**vs. using only premium models:** $100-300/month

## Common Tasks & Commands

### Website Development
```bash
# Landing page
openclaw agent --model kimi-coding/k2p5 --message "Create a modern landing page for my SaaS with pricing tiers and email signup"

# Dashboard UI
openclaw agent --model kimi-coding/k2p5 --message "Build a user dashboard with React"
```

### Backend Development
```bash
# User authentication
openclaw agent --model kimi-coding/k2p5 --message "Create user authentication API with JWT and email verification"

# API endpoints
openclaw agent --model kimi-coding/k2p5 --message "Build REST API for [feature]"

# Database schema
openclaw agent --model kimi-coding/k2p5 --message "Design database schema for [feature]"
```

### Debugging
```bash
# Bug fixing (Kimi's specialty - 60.4% SWE-bench!)
openclaw agent --model kimi-coding/k2p5 --message "Debug this error: [paste error]"
```

### Documentation
```bash
# Cheap for docs
openclaw agent --model kimi-coding/k2p5 --message "Write API documentation for my endpoints"
```

## Monitoring & Safety

### Check OpenClaw Status
```bash
# View running agents and token usage
openclaw status

# View dashboard
openclaw dashboard

# Check logs for security events
grep -i "BLOCKED\|ALERT" ~/.openclaw/logs/*.log
```

### Security Reminders

- All commands require approval before execution
- OpenClaw cannot access:
  - Password managers
  - SSH keys (~/.ssh/)
  - Production servers
  - System files outside workspace
- Credentials are auto-redacted in output
- Production SSH is completely blocked

## Project Organization

### Workspace Structure
```
~/.openclaw/workspace/     # OpenClaw working directory
~/[your-saas-project]/     # Your actual SaaS code
```

**Best practice:** Have OpenClaw generate code, then you copy/review it to your project

### Version Control
```bash
# Always use git
cd ~/your-saas-project
git init
git add .
git commit -m "Feature generated with OpenClaw + Kimi"
```

## Kimi Setup (Next Step)

### Getting API Key

1. **Sign up:** https://platform.moonshot.cn
2. **Navigate to API keys** section
3. **Generate new key** (starts with `sk-`)
4. **Copy the key**

### Adding to OpenClaw

**Option A: Wizard (Recommended)**
```bash
openclaw onboard --auth-choice kimi-code-api-key
```

**Option B: Manual**
1. Edit `~/.zshrc`: Add `export KIMI_API_KEY="sk-your-key"`
2. Run: `source ~/.zshrc`
3. Restart OpenClaw: `openclaw gateway --force`

### Test Kimi
```bash
openclaw agent --model kimi-coding/k2p5 --message "Write a Python hello world function"
```

## Tips for Success

1. **Start small** - Build one feature at a time
2. **Review everything** - Don't blindly trust generated code
3. **Use version control** - Git commit frequently
4. **Monitor costs** - Check `openclaw status` regularly
5. **Learn from the code** - Study what OpenClaw generates
6. **Iterate** - Kimi is cheap enough to refine multiple times

## When to Use Which Tool

### Use Claude (here in Antigravity) when you need:
- Strategic planning
- Architecture decisions
- Complex problem-solving
- Code review and critique
- Learning and explanations
- "Should I...?" questions

### Use OpenClaw + Kimi when you need:
- Code generation
- Implementing features
- Bug fixing
- Writing tests
- Creating documentation
- Repetitive coding tasks

### Use OpenClaw + Gemini when:
- Kimi struggles with a task
- Need more powerful reasoning
- Automatic fallback (already configured)

## Reminders for Future Sessions

**User is:**
- Learning OpenClaw and SaaS development
- Building a new SaaS business
- Cost-conscious (wants to save on AI costs)
- Using fresh Mac (recently wiped and reinstalled)
- Prefers native installation (not VM)

**Don't:**
- Assume advanced knowledge
- Skip security explanations
- Recommend expensive solutions
- Suggest complex DevOps setups

**Do:**
- Explain things clearly
- Prioritize simplicity
- Suggest cost-effective approaches
- Remind about security features
- Help with both planning AND implementation

## Quick Reference

### File Locations
- OpenClaw config: `~/.openclaw/openclaw.json`
- Security policy: `~/.openclaw/AGENTS.md`
- Safety guide: `~/.openclaw/SAFETY_GUIDE.md`
- Kimi setup: `~/.openclaw/KIMI_SETUP.md`
- Advanced security: `~/.openclaw/ADVANCED_SECURITY.md`
- VM comparison: `~/.openclaw/VM_VS_NATIVE.md`

### Helpful Commands
```bash
# Start OpenClaw
openclaw gateway

# Check status
openclaw status

# View logs
openclaw logs --follow

# Emergency stop
openclaw stop

# Restart
openclaw gateway --force
```

## Next Steps

1. [ ] Set up Kimi account
2. [ ] Get Kimi API key
3. [ ] Configure OpenClaw with Kimi
4. [ ] Test with simple coding task
5. [ ] Plan first SaaS feature
6. [ ] Build with OpenClaw + Kimi
7. [ ] Review and iterate
