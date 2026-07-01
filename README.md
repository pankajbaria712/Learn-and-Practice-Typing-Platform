# 🧠 Learn & Practice Typing Platform

A **production-ready, modern, and scalable typing practice platform** to learn, practice, and improve typing speed and accuracy.

🌐 **Live Demo:** [https://learn-and-practice-typing-platform.vercel.app](https://learn-and-practice-typing-platform.vercel.app)

---

## 🚀 Features

✅ **User Authentication** – Seamless Google OAuth login  
✅ **Real-time Typing Practice** – Track WPM and accuracy instantly  
✅ **User Dashboard** – View statistics, history, and progress  
✅ **Global Leaderboards** – Rank by WPM, accuracy, and streaks  
✅ **Session Tracking** – Automatically save all practice sessions  
✅ **Daily Progress** – Track your daily practice habits  
✅ **Achievements** – Unlock badges and milestones  
✅ **Responsive UI** – Perfect on desktop, tablet, and mobile  
✅ **Dark Mode** – Eye-friendly interface  
✅ **SEO Optimized** – Full metadata, sitemap, and robots.txt  
✅ **Analytics** – Google Analytics 4 + Vercel Analytics  
✅ **Production-Ready** – Deployed on Vercel with auto-scaling

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript (strict mode) |
| **Database** | MongoDB Atlas + Mongoose |
| **Authentication** | Auth.js (NextAuth v5) |
| **Styling** | Tailwind CSS + SCSS |
| **Validation** | Zod |
| **Analytics** | Google Analytics 4 + Vercel |
| **Deployment** | Vercel |

---

## 📋 Project Structure

```
├── app/                          # Next.js App Router
│   ├── api/                      # API Route Handlers
│   │   ├── auth/                 # Authentication routes
│   │   ├── session/              # Session recording
│   │   ├── user/                 # User management
│   │   ├── statistics/           # Stats API
│   │   ├── leaderboard/          # Leaderboard API
│   │   └── dashboard/            # Dashboard data
│   ├── dashboard/                # Protected dashboard page
│   ├── auth/                     # Auth pages
│   ├── practice/                 # Practice mode
│   ├── leaderboard/              # Leaderboard page
│   └── layout.tsx                # Root layout
├── lib/                          # Utility functions
│   ├── mongodb.ts                # MongoDB connection
│   ├── auth.ts                   # NextAuth configuration
│   ├── api-response.ts           # API response helpers
│   ├── validation.ts             # Zod schemas
│   └── statistics.ts             # Statistics calculations
├── models/                       # Mongoose schemas
│   ├── TypingSession.ts          # Typing session model
│   ├── TypingStatistics.ts       # User statistics model
│   ├── Achievement.ts            # Achievement model
│   └── DailyProgress.ts          # Daily progress model
├── types/                        # TypeScript interfaces
│   └── index.ts                  # Type definitions
├── middleware.ts                 # NextAuth middleware
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript config
└── .env.example                  # Environment variables template
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pankajbaria712/Learn-and-Practice-Typing-Platform.git
   cd typing-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your values:
   ```env
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/typing_platform
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=generate-a-secure-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

---

## 📊 Database Schema

### User (Created by NextAuth)
- `email` - User email
- `name` - User name
- `image` - Profile image URL
- `createdAt` - Account creation date

### TypingSession
- `userId` - Reference to user
- `date` - Session date
- `duration` - Session duration (seconds)
- `wordsTyped` - Total words typed
- `charactersTyped` - Total characters typed
- `accuracy` - Accuracy percentage (0-100)
- `wpm` - Words per minute
- `mistakes` - Number of mistakes
- `mode` - Practice/Race/Lesson
- `difficulty` - Easy/Medium/Hard
- `lesson` - Lesson reference

### TypingStatistics
- `userId` - Reference to user
- `totalSessions` - Total practice sessions
- `totalPracticeTime` - Total practice time (seconds)
- `highestWPM` - Highest WPM achieved
- `averageWPM` - Average WPM across sessions
- `averageAccuracy` - Average accuracy percentage
- `totalWordsTyped` - Total words typed
- `totalMistakes` - Total mistakes made
- `dailyStreak` - Current daily practice streak
- `lastActiveDate` - Last practice date

### DailyProgress
- `userId` - Reference to user
- `date` - Date of progress
- `sessionsCompleted` - Sessions completed that day
- `totalPracticeTime` - Practice time that day
- `averageWPM` - Average WPM for the day
- `averageAccuracy` - Average accuracy for the day

### Achievement
- `userId` - Reference to user
- `name` - Achievement name
- `description` - Achievement description
- `icon` - Icon reference
- `unlockedAt` - When achievement was unlocked

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signin` - Sign in with Google
- `GET /api/auth/signout` - Sign out

### Sessions
- `POST /api/session` - Record a typing session
- `GET /api/session` - Get user's sessions (paginated)

### Statistics
- `GET /api/statistics` - Get user statistics

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Dashboard
- `GET /api/dashboard` - Get dashboard data (stats, recent sessions, today)

### Leaderboard
- `GET /api/leaderboard?type=wpm` - Get leaderboard (wpm/accuracy/streak)

---

## 🔐 Security

✅ Input validation with Zod  
✅ Protected API routes with authentication  
✅ Secure cookie handling  
✅ Environment variables for secrets  
✅ NextAuth security best practices  
✅ Sanitized user input  
✅ Rate limiting ready (can add later)

---

## 📈 SEO Implementation

✅ **Metadata** - Complete Open Graph and Twitter Cards  
✅ **Robots.txt** - Search engine directives  
✅ **Sitemap.xml** - Automatic URL generation  
✅ **Canonical URLs** - Prevent duplicate content  
✅ **Structured Data** - JSON-LD ready  
✅ **Meta Tags** - Keywords, description, theme color  
✅ **Google Search Console Ready** - Indexable pages  

---

## 📊 Analytics

Integrated with:
- **Google Analytics 4** - Page views, user behavior, events
- **Vercel Analytics** - Performance metrics
- **Vercel Speed Insights** - Core Web Vitals monitoring

---

## 🚀 Deployment on Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy (automatic on push to main)

```bash
git add .
git commit -m "Production setup complete"
git push origin main
```

---

## 🎯 Upcoming Features

- [ ] Typing challenges and contests
- [ ] Friends and social features
- [ ] XP system and badges
- [ ] Typing certificates
- [ ] AI typing coach
- [ ] Daily goals and reminders
- [ ] Premium subscription
- [ ] Multiple language support
- [ ] Typing courses
- [ ] Custom lesson creation

---

## 📝 API Response Format

All APIs follow a consistent response format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Pankaj Baria**  
🎓 3rd Year B.E. Student | 💻 Web Developer  
🌐 [GitHub](https://github.com/pankajbaria712)

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review API documentation

---

## 🎉 Acknowledgments

- Next.js team for amazing framework
- Vercel for hosting and deployment
- MongoDB for reliable database
- NextAuth for authentication
- Tailwind CSS for utility-first styling

---

**⭐ If you find this helpful, please star the repository!**
