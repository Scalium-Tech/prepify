"use client";

import Link from "next/link";
import {
  Mic,
  Brain,
  Target,
  Trophy,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Star,
  Users,
  BarChart3,
  Zap,
  MessageSquare,
  ChevronRight,
  Check,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FAQSection, WatchDemoButton } from "./_components/HomeClientParts";

export default function Home() {
  const faqs = [
    {
      question: "How does the AI interview practice work?",
      answer:
        "Our AI generates personalized interview questions based on your resume and target role. You answer questions using your microphone or typing, and our AI analyzes your responses in real-time, providing detailed feedback on content, clarity, and delivery.",
    },
    {
      question: "Is the platform free to use?",
      answer:
        "Yes! We offer a free tier that includes 3 practice interviews per month with basic AI feedback. For unlimited interviews, detailed analytics, and premium features, you can upgrade to our Pro or Business plans.",
    },
    {
      question: "What types of interviews can I practice?",
      answer:
        "We support HR interviews, behavioral interviews, technical interviews, stress interviews, fresher interviews, managerial interviews, and more. You can select different difficulty levels from easy to hard.",
    },
    {
      question: "How accurate is the AI feedback?",
      answer:
        "Our AI is powered by advanced language models and has been trained on thousands of successful interview responses. While no AI is perfect, our feedback provides actionable insights that have helped 95% of our users improve their interview performance.",
    },
    {
      question: "Can I use this for any industry?",
      answer:
        "Absolutely! Our AI adapts questions based on your resume and target role, whether you are in tech, finance, healthcare, marketing, or any other field. The platform covers a wide range of industries and job levels.",
    },
    {
      question: "How do I track my progress?",
      answer:
        "Your dashboard displays all your past interviews with scores, feedback summaries, and performance trends. You can see how your scores improve over time and identify areas that need more practice.",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden scroll-smooth">
      <Header />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50/50 to-white" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-violet-200/30 via-purple-300/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-200/20 via-violet-300/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        {/* Floating elements */}
        <div className="absolute top-20 left-[10%] w-20 h-20 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl opacity-20 animate-float-slow" />
        <div className="absolute top-40 right-[15%] w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl opacity-30 animate-float-delayed" />
        <div className="absolute bottom-32 left-[20%] w-16 h-16 bg-gradient-to-br from-violet-300 to-purple-400 rounded-full opacity-20 animate-float" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full text-violet-700 text-sm font-medium animate-fade-in-up">
                <Sparkles className="w-4 h-4" />
                AI-Powered Interview Preparation
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight animate-fade-in-up animation-delay-100">
                Ace Your Next Interview with{" "}
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-violet-700 bg-clip-text text-transparent">
                  AI Confidence
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl animate-fade-in-up animation-delay-200">
                Practice unlimited mock interviews, get instant AI feedback, and track your
                progress. Land your dream job with personalized interview coaching.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
                <Link
                  href="/interview-setup"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Start Free Interview
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <WatchDemoButton />
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 pt-4 animate-fade-in-up animation-delay-400">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">Trusted by 10,000+ job seekers</span>
                </div>
              </div>
            </div>

            {/* Right - Hero Visual */}
            <div className="relative lg:h-[600px] flex items-center justify-center animate-fade-in-up animation-delay-200">
              {/* Main Card */}
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-violet-600 rounded-3xl blur-2xl opacity-40 animate-pulse-slow" />
                <div className="relative bg-gradient-to-br from-violet-500 via-purple-500 to-violet-600 rounded-3xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <Mic className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Mock Interview</h3>
                        <p className="text-white/70 text-sm">In Progress...</p>
                      </div>
                    </div>

                    {/* Waveform visualization */}
                    <div className="flex items-center gap-1 h-16 justify-center">
                      {[40, 60, 80, 45, 70, 50, 85, 55, 75, 40, 65, 50].map((height, i) => (
                        <div
                          key={i}
                          className="w-2 bg-white/30 rounded-full animate-soundwave"
                          style={{
                            height: `${height}%`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>

                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <p className="text-white/90 text-sm leading-relaxed">
                        &quot;Tell me about a challenging project you led and how you handled
                        obstacles...&quot;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">92%</p>
                      <p className="text-xs text-gray-500">Avg Score</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                      <Brain className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">AI Feedback</p>
                      <p className="text-xs text-gray-500">Real-time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Interviews Completed", icon: MessageSquare },
              { value: "95%", label: "Success Rate", icon: Target },
              { value: "200+", label: "Question Categories", icon: BarChart3 },
              { value: "4.9/5", label: "User Rating", icon: Star },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-violet-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white via-violet-50/30 to-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive interview preparation tools designed
              to help you land your dream job.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Analysis",
                description:
                  "Get detailed feedback on your answers, body language cues, and speaking patterns with our advanced AI.",
                gradient: "from-violet-500 to-purple-500",
              },
              {
                icon: Target,
                title: "Personalized Questions",
                description:
                  "Questions tailored to your resume, target role, and industry for the most relevant practice.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: BarChart3,
                title: "Progress Tracking",
                description:
                  "Track your improvement over time with detailed analytics and performance insights.",
                gradient: "from-violet-500 to-indigo-500",
              },
              {
                icon: Users,
                title: "Multiple Categories",
                description:
                  "Practice HR, behavioral, technical, and stress interviews - we cover all interview types.",
                gradient: "from-purple-500 to-violet-500",
              },
              {
                icon: Zap,
                title: "Instant Feedback",
                description:
                  "Receive real-time AI feedback immediately after each answer to improve faster.",
                gradient: "from-violet-500 to-purple-500",
              },
              {
                icon: Trophy,
                title: "Success Stories",
                description:
                  "Join thousands who have landed jobs at top companies using our platform.",
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent hover:-translate-y-2 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-purple-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-violet-50/50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Start Practicing in{" "}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                3 Easy Steps
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-violet-200 via-purple-300 to-violet-200" />

            {[
              { step: "01", title: "Upload Resume", description: "Upload your resume and select your target job role", icon: "📄" },
              { step: "02", title: "Practice Interview", description: "Answer AI-generated questions tailored to your profile", icon: "🎤" },
              { step: "03", title: "Get Feedback", description: "Review detailed AI feedback and improve your skills", icon: "🎯" },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-violet-500/25">
                    {item.icon}
                  </div>
                  <span className="inline-block text-violet-600 font-bold text-sm mb-2">
                    Step {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/interview-setup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Started Now
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-violet-50/50 via-white to-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-4">
              Simple Pricing
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade as you grow. All plans include AI-powered feedback and
              progress tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-gray-600 mb-6">Perfect for getting started</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">₹0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {["3 interviews per month", "Basic AI feedback", "Email support", "Progress dashboard"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block w-full py-4 text-center font-semibold text-violet-600 border-2 border-violet-200 rounded-2xl hover:bg-violet-50 hover:border-violet-300 transition-all duration-300"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-white/80 mb-6">Best for serious job seekers</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">₹499</span>
                <span className="text-white/70">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {["Unlimited interviews", "Advanced AI analysis", "Priority support", "Detailed analytics", "Resume optimization tips"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <Check className="w-5 h-5 text-green-300 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block w-full py-4 text-center font-bold text-violet-600 bg-white rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Start Pro Trial
              </Link>
            </div>

            {/* Business Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
              <p className="text-gray-600 mb-6">For teams & organizations</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">₹999</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {["Everything in Pro", "Team management", "Custom question banks", "API access", "Dedicated support"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block w-full py-4 text-center font-semibold text-violet-600 border-2 border-violet-200 rounded-2xl hover:bg-violet-50 hover:border-violet-300 transition-all duration-300"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-4">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by{" "}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Job Seekers
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Priya Sharma", role: "Software Engineer @ Google", quote: "The AI feedback was incredibly detailed. I improved my interview skills significantly and landed my dream job!", avatar: "PS" },
              { name: "Rahul Verma", role: "Product Manager @ Microsoft", quote: "Practicing with realistic questions helped me feel confident. The progress tracking kept me motivated throughout.", avatar: "RV" },
              { name: "Ananya Patel", role: "Data Scientist @ Amazon", quote: "Best interview prep platform I have used. The personalized questions based on my resume were exactly what I needed.", avatar: "AP" },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-violet-50/50 to-purple-50/50 rounded-3xl p-8 border border-violet-100/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gradient-to-b from-white to-violet-50/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-4">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our AI interview platform
            </p>
          </div>

          <FAQSection faqs={faqs} />

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-violet-600 font-semibold hover:text-violet-700 transition-colors"
            >
              Contact our support team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float-delayed" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of successful candidates who prepared with our AI-powered platform.
            Start your free interview today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-violet-600 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 text-white font-semibold text-lg rounded-2xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

