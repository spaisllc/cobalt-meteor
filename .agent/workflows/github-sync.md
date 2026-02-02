# GitHub Setup & Workflow Sync Guide

**Date:** 2026-02-02  
**Goal:** Sync workflows and code between Mac and Windows Antigravity

---

## How Workflow Sync Works

### Workflows Live Here:
```
.agent/workflows/
├── openclaw-setup.md
├── saas-development.md
└── (future workflows)
```

**When you push to GitHub:**
- Mac workflows → GitHub
- Windows pulls from GitHub
- Windows Claude sees the same workflows!

**When Windows Claude updates workflows:**
- Windows → git push → GitHub
- Mac → git pull → Updated workflows!

**Both Antigravity instances stay in sync automatically!** ✨

---

## Setup Process (20 minutes)

### Part 1: Mac Setup (Now)

We'll initialize Git in your workspace and push everything to GitHub.

### Part 2: Windows Setup (Later Today)

On your Windows laptop:
1. Clone the same repo
2. Windows Antigravity detects `.agent/workflows/`
3. Windows Claude can now use `/saas-development` and see all context!

---

## What Gets Synced

**These files will sync automatically:**

```
cobalt-meteor/
├── .agent/
│   └── workflows/
│       ├── openclaw-setup.md ✅
│       └── saas-development.md ✅
├── springsaisolutions.com/ (your site)
├── portfolio-template/ (what we'll build)
└── README.md
```

**Brain files (conversation-specific) WON'T sync:**
```
~/.gemini/antigravity/brain/[conversation-id]/
├── task.md
├── implementation_plan.md
├── saas_mvp_plan.md
└── saas_tasks.md
```

These are per-conversation, which is fine!

---

## Sharing Strategy

### Workflows (Sync via GitHub)
- `.agent/workflows/saas-development.md` ✅
- `.agent/workflows/openclaw-setup.md` ✅
- Both Mac and Windows can reference with `/saas-development`

### Documentation (Copy manually when needed)
- SaaS MVP plan → Could copy to project if you want
- Or reference from Mac brain files when on Mac
- Or reference from Windows brain files when on Windows

### Code (Sync via GitHub)
- All website code
- Portfolio templates
- Everything we build

---

## On Windows, Claude Will See:

When you say `/saas-development` on Windows:
- Windows Claude reads `.agent/workflows/saas-development.md`
- Sees entire plan, your preferences, tech stack
- Knows to use OpenClaw with Gemini
- Knows about your infrastructure
- Coordinated with Mac Claude! 🎯

---

## Example Coordination

**Today on Mac:**
```
You: "Use /saas-development workflow"
Mac Claude: "I see the plan! Building portfolio template with OpenClaw..."
[builds, commits, pushes to GitHub]
```

**Tomorrow on Windows:**
```
git pull  # Get Mac's work

You: "Use /saas-development workflow"  
Windows Claude: "I see the plan! Mac already built the template. 
I can help you customize springsaisolutions.com marketing copy..."
[edits, commits, pushes to GitHub]
```

**Back on Mac:**
```
git pull  # Get Windows work
# Everything in sync!
```

---

## Next Steps

1. **Now:** Set up GitHub on Mac
2. **Later today:** Clone to Windows
3. **Result:** Both Claudes coordinated via workflows!

Let's do it! 🚀
