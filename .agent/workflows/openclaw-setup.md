---
description: OpenClaw AI assistant setup and troubleshooting guide
---

# OpenClaw Setup and Troubleshooting Workflow

## Installation Information

**Installed Version**: 2026.1.30  
**Installation Date**: January 31, 2026  
**Node.js Version**: v24.13.0

### Key File Locations

- **OpenClaw Binary**: `/usr/local/bin/openclaw`
- **Node.js Binary**: `/usr/local/bin/node`
- **npm Binary**: `/usr/local/bin/npm`
- **Configuration Directory**: `~/.openclaw/`
- **Main Config File**: `~/.openclaw/openclaw.json`
- **API Keys/Auth**: `~/.openclaw/identity/device-auth.json`
- **Logs Directory**: `~/.openclaw/logs/`
- **Workspace**: `~/.openclaw/workspace/`
- **Shell Config**: `~/.zshrc`

### Configuration Summary

```bash
# From ~/.openclaw/openclaw.json
Model: google/gemini-3-pro-preview
Fallback: google/gemini-1.5-flash-8b
Gateway Mode: local
Gateway Port: 18789
Gateway Bind: loopback
Node Manager: npm
```

## PATH Configuration Fix (Resolved Feb 1, 2026)

### Problem
OpenClaw couldn't initialize because `/usr/local/bin` wasn't in the PATH, causing `node: No such file or directory` errors.

### Solution
The `.zshrc` file must have this specific order:

```bash
# Add /usr/local/bin to PATH
export PATH="/usr/local/bin:$PATH"

# Initialize completion system
autoload -Uz compinit
compinit

# OpenClaw Completion
source <(openclaw completion --shell zsh)
```

### Fix Ownership Issue
If `.zshrc` is owned by root:
```bash
sudo chown goofy:staff ~/.zshrc
```

## Verification Steps

### 1. Check OpenClaw is accessible
// turbo
```bash
which openclaw
# Expected: /usr/local/bin/openclaw
```

### 2. Check version
// turbo
```bash
openclaw --version
# Expected: 2026.1.30
```

### 3. View configuration
```bash
cat ~/.openclaw/openclaw.json
```

### 4. Check for API key errors
// turbo
```bash
grep -i "authentication\|unauthorized\|invalid.*key" ~/.openclaw/logs/*.log 2>/dev/null
# Expected: no output (no errors)
```

### 5. Verify PATH in new terminal
// turbo
```bash
echo $PATH | grep "/usr/local/bin"
# Expected: should contain /usr/local/bin
```

## Common Issues and Solutions

### Issue: "node not found" error
**Cause**: `/usr/local/bin` not in PATH  
**Fix**: Ensure `.zshrc` has PATH configuration before OpenClaw completion (see above)

### Issue: "compdef: command not found"
**Cause**: Completion system not initialized before OpenClaw loads  
**Fix**: Add `autoload -Uz compinit` and `compinit` before the OpenClaw completion line

### Issue: ".zshrc is owned by root"
**Fix**: Run `sudo chown goofy:staff ~/.zshrc`

### Issue: Changes to .zshrc not taking effect
**Fix**: Run `source ~/.zshrc` or open a new terminal window

## API Key Information

The API key is stored in `~/.openclaw/openclaw.json` under:
```json
{
  "skills": {
    "entries": {
      "nano-banana-pro": {
        "apiKey": "AIzaSy..."
      }
    }
  }
}
```

The main authentication profile uses the Google API key mode and is configured correctly.

## Quick Start After Fresh Install

1. Ensure Node.js is installed at `/usr/local/bin/node`
2. Install OpenClaw globally with npm
3. Configure `.zshrc` with PATH and completion (see above)
4. Run `openclaw config` to configure
5. Verify with `openclaw --version`

## How to Launch and Use OpenClaw

### Starting the Gateway (Main Service)

The gateway is the main OpenClaw service that handles all operations:

```bash
# Start the gateway on default port (18789)
openclaw gateway

# Start with force (kills any existing process on the port)
openclaw gateway --force

# Start on a custom port
openclaw gateway --port 18790
```

**Note**: You don't need to manually "start" OpenClaw for most operations - the CLI commands will start the gateway automatically if needed.

### Common Commands

```bash
# Check OpenClaw version
openclaw --version

# Open the control dashboard
openclaw dashboard

# Check health status
openclaw health

# View gateway status
openclaw status

# Send a message to an agent
openclaw agent --message "your message here"

# View logs
openclaw logs

# Run configuration wizard
openclaw config
```

### For Current Terminal (If PATH Not Set)

If you're in a terminal opened before fixing `.zshrc`, run this first:
```bash
export PATH="/usr/local/bin:$PATH"
```

Then any OpenClaw command will work. In new terminals, this is automatic.

## Notes

- OpenClaw uses a local gateway on port 18789
- Configuration wizard: `openclaw config`
- All configuration is stored in `~/.openclaw/openclaw.json`
- Logs are useful for debugging API issues: `~/.openclaw/logs/`
- Quota errors in logs are normal (Google API free tier rate limits)
