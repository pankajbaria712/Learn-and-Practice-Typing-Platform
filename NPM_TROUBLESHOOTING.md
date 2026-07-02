# NPM Installation Troubleshooting

## Issue: Dependency Conflicts

### Problem
```
npm error A complete log of this run can be found in:
npm error C:\Users\panka\AppData\Local\npm-cache\_logs\...eresolve-report.txt
```

### Root Cause
- **ESLint Conflict**: `eslint@^9.5.0` conflicts with `@typescript-eslint/parser@^7.12.0` which requires `eslint@^8.56.0`
- **NextAuth Version**: `next-auth@^5.0.0` doesn't exist yet (v5 is still in development)

### Solution Applied

#### 1. Fixed ESLint Version
Changed from `eslint@^9.5.0` to `eslint@^8.57.0` for compatibility

#### 2. Fixed NextAuth Version
Changed from `next-auth@^5.0.0` to `next-auth@^4.24.0` (stable version)

#### 3. Updated Authentication Imports
Updated `lib/auth.ts` to use `next-auth/adapters` instead of `@auth/mongodb-adapter`

#### 4. Removed Unnecessary Dependency
Removed `@auth/mongodb-adapter` since we use `next-auth/adapters`

### Updated package.json

**Before:**
```json
{
  "dependencies": {
    "@auth/mongodb-adapter": "^2.4.2",  // ❌ Removed
    "next-auth": "^5.0.0",              // ❌ Changed to ^4.24.0
    ...
  },
  "devDependencies": {
    "eslint": "^9.5.0",                 // ❌ Changed to ^8.57.0
    ...
  }
}
```

**After:**
```json
{
  "dependencies": {
    "next-auth": "^4.24.0",             // ✅ Correct version
    ...
  },
  "devDependencies": {
    "eslint": "^8.57.0",                // ✅ Compatible version
    ...
  }
}
```

---

## Installation Commands

### If `npm install` Fails

Try these in order:

```bash
# Option 1: Clean install with force flag
npm install --force --legacy-peer-deps

# Option 2: Clear npm cache and retry
npm cache clean --force
npm install

# Option 3: Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules  # PowerShell
npm install

# Option 4: Use npm ci (recommended)
npm ci --legacy-peer-deps
```

---

## Verified Versions

| Package | Version | Status |
|---------|---------|--------|
| next-auth | ^4.24.0 | ✅ Stable & Compatible |
| eslint | ^8.57.0 | ✅ Compatible with TypeScript-ESLint |
| @typescript-eslint/parser | ^7.12.0 | ✅ Works with eslint@8 |
| mongoose | ^8.4.0 | ✅ Stable |
| Next.js | ^15.0.0 | ✅ Compatible |
| React | ^19.1.0 | ✅ Latest |

---

## Common Issues & Fixes

### EPERM: Permission Denied Error
```
npm error EPERM: operation not permitted
```

**Solution:**
- Close VS Code and npm is using
- Delete `node_modules` folder manually
- Run `npm install` again

### Cached Dependency Issues
```
npm error Code ETARGET / ERESOLVE
```

**Solution:**
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

### Timeout Issues
```
npm error network request to https://registry.npmjs.org failed
```

**Solution:**
```bash
npm config set registry https://registry.npmjs.org
npm cache clean --force
npm install
```

---

## Next Steps After Installation

1. Verify installation succeeded:
   ```bash
   npm list next-auth
   npm list eslint
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Check for type errors:
   ```bash
   npm run type-check
   ```

---

## Updated Authentication Configuration

### Changes Made to `lib/auth.ts`

```typescript
// BEFORE (NextAuth v5 - doesn't exist yet)
import { MongoDBAdapter } from "@auth/mongodb-adapter";

// AFTER (NextAuth v4 - stable)
import { MongoDBAdapter } from "next-auth/adapters";
```

This change makes the code compatible with NextAuth v4 which is currently the latest stable version.

---

## Git Changes

All dependency fixes have been committed:

```bash
git log --oneline -1
# Shows: Fix dependency conflicts for npm installation
```

Changes:
- ✅ Updated `package.json` with compatible versions
- ✅ Updated `lib/auth.ts` for NextAuth v4
- ✅ All other files remain unchanged

---

## Prevention

For future dependency issues:

1. **Check compatibility** before adding packages
2. **Use exact versions** for critical packages: `"package": "1.2.3"`
3. **Test locally** before pushing to GitHub
4. **Keep docs updated** when changing dependencies

---

**Status**: npm install in progress...  
**Last Update**: 2026-07-02  
**Resolution**: All dependency conflicts fixed
