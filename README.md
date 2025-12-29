<div align="center">
  <img src="https://img.shields.io/badge/Next.js-13.5-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-Auth_&_DB-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
</div>

<br />

<div align="center">
  <h1>🎯 Preply - AI Interview Practice</h1>
  <p><strong>Ace your next interview with AI-powered mock interviews and real-time feedback</strong></p>
  
  <a href="#demo">View Demo</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#tech-stack">Tech Stack</a>
</div>

<br />

---

## ✨ Overview

**Preply** is a modern AI-powered interview practice platform that helps job seekers prepare for their interviews with personalized mock sessions, instant feedback, and performance analytics.

Upload your resume, select your interview category, and practice with our AI interviewer that adapts questions based on your profile. Get detailed feedback on your responses and track your improvement over time.

---

## 🎬 Demo

<div align="center">
  <img src="public/demo-screenshot.png" alt="Preply Demo" width="800" />
</div>

> **Live Demo**: [Coming Soon]

---

## 🚀 Features

### 🎤 AI-Powered Interviews
- **Voice & Text Input** - Answer questions using your microphone or keyboard
- **Personalized Questions** - AI generates questions based on your resume and target role
- **Multiple Categories** - HR, Technical, Behavioral, Stress, and more
- **Adjustable Difficulty** - Easy, Medium, Hard levels

### 📊 Performance Analytics
- **Real-time Scoring** - Get instant feedback on your responses
- **Detailed Reports** - Strengths, weaknesses, and improvement suggestions
- **Progress Tracking** - Visual charts showing your growth over time
- **Downloadable PDFs** - Export your interview reports

### 🏠 User Dashboard
- **Interview History** - View all past interviews with scores
- **Performance Charts** - Line graphs and category breakdowns
- **Practice Streak** - Gamified motivation system
- **Quick Stats** - Total interviews, average score, improvement metrics

### 🔐 Secure Authentication
- **Supabase Auth** - Email/password and social login
- **Protected Routes** - Secure access to user data
- **Session Management** - Persistent login sessions

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 13.5 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | Radix UI, shadcn/ui |
| **Animations** | Framer Motion |
| **Authentication** | Supabase Auth |
| **Database** | Supabase PostgreSQL |
| **AI Model** | Google Gemini 2.0 Flash |
| **Charts** | Recharts |
| **Icons** | Lucide React |

---

## 📁 Project Structure

```
preply/
├── app/
│   ├── api/interview/        # API routes for AI interview
│   │   ├── generate-questions/
│   │   ├── generate-report/
│   │   ├── parse-resume/
│   │   └── save-result/
│   ├── context/              # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── InterviewContext.tsx
│   ├── dashboard/            # User dashboard
│   ├── interview-setup/      # Interview configuration
│   ├── active-interview/     # Live interview session
│   ├── result-page/          # Interview results
│   ├── login/                # Authentication
│   ├── signup/
│   └── page.tsx              # Landing page
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── dashboard/            # Dashboard-specific components
│   └── Header.tsx, Footer.tsx
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── utils.ts              # Utility functions
└── public/                   # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Scalium-Tech/preply_nakul.git
   cd preply_nakul
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Set up Supabase database**
   
   Run the migration to create the interviews table:
   ```sql
   -- supabase/migrations/20251225143000_create_interviews_table.sql
   CREATE TABLE interviews (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     category TEXT NOT NULL,
     difficulty TEXT NOT NULL,
     score INTEGER NOT NULL,
     strengths TEXT[],
     weaknesses TEXT[],
     overall_feedback TEXT,
     question_feedback JSONB,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

---

## 🗺️ User Flow

```
┌─────────────────┐
│   Landing Page  │
│   (Features,    │
│   Pricing, FAQ) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│     Sign Up     │ ◄── │      Login      │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     ▼
         ┌─────────────────┐
         │ Interview Setup │
         │ (Resume, Category│
         │  Difficulty)     │
         └────────┬────────┘
                  │
                  ▼
         ┌─────────────────┐
         │Active Interview │
         │ (Voice/Text     │
         │  Responses)     │
         └────────┬────────┘
                  │
                  ▼
         ┌─────────────────┐
         │  Result Page    │
         │ (Score, Feedback│
         │  Download PDF)  │
         └────────┬────────┘
                  │
                  ▼
         ┌─────────────────┐
         │   Dashboard     │
         │ (History, Stats,│
         │  Analytics)     │
         └─────────────────┘
```

---

## 🎨 Screenshots

<details>
<summary><b>Landing Page</b></summary>
<br />
Modern, animated landing page with features, pricing, testimonials, and FAQ sections.
</details>

<details>
<summary><b>Interview Setup</b></summary>
<br />
Configure your interview by uploading resume, selecting category, and setting difficulty.
</details>

<details>
<summary><b>Active Interview</b></summary>
<br />
Real-time interview session with voice input, AI questions, and progress tracking.
</details>

<details>
<summary><b>Dashboard</b></summary>
<br />
Comprehensive analytics with performance charts, interview history, and progress metrics.
</details>

---

## 🔒 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Google Gemini AI API key |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Nakul Dafale**

- GitHub: [@nakuldafale](https://github.com/nakuldafale)
- Twitter: [@DafaleNaku75724](https://x.com/DafaleNaku75724)

---

<div align="center">
  <p>Made with ❤️ using Next.js and AI</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
