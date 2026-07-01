# 📋 Production Upgrade - Setup & Installation Guide

This document provides step-by-step instructions to get the production-ready typing platform up and running.

---

## ✅ Phase 1: Project Foundation (Complete)

The following has been implemented:

### ✨ What's Been Done

1. **Next.js 15 Setup**
   - Modern App Router with TypeScript
   - Strict mode enabled for type safety
   - Optimized for Vercel deployment

2. **Database Infrastructure**
   - MongoDB Atlas connection pool
   - Mongoose models with indexes
   - Automatic connection management
   - Schemas for: Users, Sessions, Statistics, Achievements, Daily Progress

3. **Authentication**
   - NextAuth v5 with Google OAuth
   - Automatic user creation on first login
   - Secure session management
   - Protected API routes with middleware

4. **API Routes**
   - `/api/auth/*` - Authentication
   - `/api/session` - Record and retrieve typing sessions
   - `/api/statistics` - User statistics
   - `/api/user/profile` - User profile management
   - `/api/dashboard` - Dashboard data
   - `/api/leaderboard` - Global leaderboards

5. **Frontend Pages**
   - Home page
   - Sign-in page with Google OAuth
   - Protected dashboard
   - Practice mode (UI placeholder)
   - Leaderboard page
   - Auto session management

6. **Production-Ready Features**
   - Full TypeScript with strict mode
   - Input validation with Zod
   - Centralized error handling
   - SEO metadata setup
   - robots.txt for search engines
   - Tailwind CSS configured

---

## 🛠️ Setup Instructions

### Step 1: Install Dependencies

```bash
# Navigate to project directory
cd typing-platform

# Install all dependencies
npm install
```

### Step 2: Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Create a database user with a strong password
4. Get your connection string:
   - Click "Connect" → "Drivers" → Copy the connection string
   - Replace `<password>` and `<username>` with your credentials
   - Change `myFirstDatabase` to `typing_platform`

### Step 3: Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable "Google+ API"
4. Go to "Credentials" → "Create OAuth 2.0 Client ID"
5. Choose "Web Application"
6. Add authorized redirect URIs:
   - For local: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.vercel.app/api/auth/callback/google`
7. Copy Client ID and Client Secret

### Step 4: Configure Environment Variables

```bash
# Copy template to local environment file
cp .env.example .env.local
```

Edit `.env.local`:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/typing_platform?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-min-32-chars-long-like-this-one-12345

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here

# Analytics (Optional - set later)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Environment
NODE_ENV=development
```

**⚠️ Important:**
- `NEXTAUTH_SECRET`: Generate with: `openssl rand -base64 32`
- Never commit `.env.local` to Git
- Keep credentials secure

### Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Step 6: Test Features

1. **Home Page** - Should load without authentication
2. **Sign In** - Click "Sign In with Google"
3. **Dashboard** - After sign-in, should show your profile
4. **API Endpoints** - Test with curl or Postman:

```bash
# Get dashboard data (requires authentication)
curl -H "Authorization: Bearer token" http://localhost:3000/api/dashboard

# Get leaderboard (public)
curl http://localhost:3000/api/leaderboard?type=wpm&limit=10

# Record a typing session (requires authentication)
curl -X POST http://localhost:3000/api/session \
  -H "Content-Type: application/json" \
  -d '{
    "duration": 60,
    "wordsTyped": 250,
    "charactersTyped": 1250,
    "accuracy": 95.5,
    "wpm": 250,
    "mistakes": 5,
    "mode": "practice",
    "difficulty": "medium"
  }'
```

---

## 📊 Database Connection Test

To verify your MongoDB connection works:

1. Create a test file `test-db.js`:

```javascript
import { connectDB } from './lib/mongodb.ts';

async function test() {
  try {
    const db = await connectDB();
    console.log('✅ Connected to MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error);
    process.exit(1);
  }
}

test();
```

2. Run: `node test-db.js`

---

## 📝 API Testing with Examples

### Record a Typing Session

```javascript
const response = await fetch('/api/session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    duration: 60,
    wordsTyped: 250,
    charactersTyped: 1250,
    accuracy: 95.5,
    wpm: 250,
    mistakes: 5,
    mode: 'practice',
    difficulty: 'medium'
  })
});

const data = await response.json();
console.log(data);
```

### Get User Statistics

```javascript
const response = await fetch('/api/statistics');
const data = await response.json();
console.log(data.data);
```

### Get Leaderboard

```javascript
const response = await fetch('/api/leaderboard?type=wpm&limit=50');
const data = await response.json();
console.log(data.data);
```

### Get Dashboard

```javascript
const response = await fetch('/api/dashboard');
const data = await response.json();
console.log(data.data);
```

---

## 🔄 Next Steps (Phase 2)

1. **Migrate Frontend Components**
   - Convert React components from `frontend/src` to work with Next.js
   - Integrate existing typing UI into `/app/practice`

2. **Enhance Features**
   - Add achievements system
   - Implement daily streaks
   - Create admin dashboard

3. **Performance Optimization**
   - Image optimization
   - Code splitting
   - Caching strategies

---

## 🚀 Deploy to Vercel

### Initial Deployment

1. Push code to GitHub:
```bash
git add .
git commit -m "Complete Phase 1: Production setup"
git push origin main
```

2. Connect to Vercel:
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Create team (if needed)
   - Vercel will auto-detect Next.js

3. Add Environment Variables in Vercel:
   - MONGODB_URI
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL (set to your Vercel domain)
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - NEXT_PUBLIC_GA_ID

4. Update Google OAuth Redirect URIs:
   - Add: `https://your-app.vercel.app/api/auth/callback/google`

### Continuous Deployment

After initial setup, every push to `main` will automatically redeploy!

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas (allow all or specific IPs)
- Ensure password has no special characters (or URL encode them)

### Google OAuth Not Working
- Verify redirect URIs match exactly
- Check Client ID and Secret are correct
- Clear browser cookies and try again

### Build Fails on Vercel
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Run `npm run build` locally to test

### API Returns 401 Unauthorized
- Sign in first through Google OAuth
- Check authentication middleware in `middleware.ts`
- Verify session cookie is set

---

## 📊 Monitoring

### Check Logs

```bash
# Local development
npm run dev

# Vercel logs
vercel logs
```

### Monitor Analytics

- Google Analytics Dashboard
- Vercel Analytics (Speed Insights)
- MongoDB Atlas dashboard

---

## 🔐 Security Checklist

- [ ] `NEXTAUTH_SECRET` is min 32 characters
- [ ] `.env.local` is in `.gitignore`
- [ ] Google OAuth credentials are secure
- [ ] MongoDB IP whitelist is configured
- [ ] Vercel environment variables are set
- [ ] CORS headers are properly configured
- [ ] Rate limiting is ready for Phase 2

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [MongoDB Mongoose](https://mongoosejs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Zod Validation](https://zod.dev)

---

## ✨ What's Next?

After Phase 1 is verified working:

1. **Phase 2: Integrate Frontend UI** - Migrate your beautiful React components
2. **Phase 3: Advanced Features** - Achievements, streaks, analytics
3. **Phase 4: Optimization** - Performance tuning
4. **Phase 5: Polish** - Final SEO, polish, testing

---

**Status: Phase 1 Complete ✅**
**Ready for Phase 2: Frontend Integration**
