import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HelpCenterContent from "./HelpCenterContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center - Preply",
  description: "Find answers to common questions about Preply's AI interview practice platform.",
};

// FAQ data - static, rendered on server
const faqCategories = [
  {
    category: "Getting Started",
    questions: [
      {
        id: "gs-1",
        question: "How do I create an account?",
        answer:
          "Creating an account is simple. Click the Sign Up button in the header, fill in your details including your email and password, and verify your email address. You'll be ready to start practicing interviews in minutes. We also support social login with Google for faster access.",
      },
      {
        id: "gs-2",
        question: "What are the system requirements?",
        answer:
          "Preply is a cloud-based platform that works on any modern web browser. We recommend using the latest version of Chrome, Firefox, Safari, or Edge for the best experience. For voice-based interviews, you'll need a working microphone. A stable internet connection is recommended for seamless AI interactions.",
      },
      {
        id: "gs-3",
        question: "How do I start my first interview?",
        answer:
          "After logging in, click the 'New Interview' button on your dashboard. Select your interview category (HR, Technical, etc.), choose the difficulty level, upload your resume (optional), and set the number of questions. Click 'Start Interview' and our AI interviewer will begin asking questions!",
      },
      {
        id: "gs-4",
        question: "What interview categories are available?",
        answer:
          "We offer multiple interview categories including: HR/Behavioral interviews for soft skills assessment, Technical interviews for programming and system design, Case Study interviews for consulting practice, Leadership interviews for management positions, and Industry-specific interviews for specialized roles.",
      },
    ],
  },
  {
    category: "Interview Features",
    questions: [
      {
        id: "if-1",
        question: "How does the AI interviewer work?",
        answer:
          "Our AI interviewer uses advanced language models to conduct realistic interview simulations. It asks contextual questions based on your resume and selected category, listens to your spoken or typed responses, and provides detailed feedback on your performance including strengths and areas for improvement.",
      },
      {
        id: "if-2",
        question: "Can I practice with voice or text?",
        answer:
          "Yes! Preply supports both voice and text-based interviews. Voice mode uses your microphone to capture spoken responses for a realistic interview experience. Text mode lets you type your answers if you prefer. You can switch between modes based on your preference.",
      },
      {
        id: "if-3",
        question: "How is my interview scored?",
        answer:
          "Your interview is scored on a 0-100 scale based on multiple factors: content relevance, communication clarity, structure of responses, use of specific examples (STAR method), and overall confidence. Each question receives individual feedback, and you get an aggregate score at the end.",
      },
      {
        id: "if-4",
        question: "What feedback do I receive after an interview?",
        answer:
          "After each interview, you receive a comprehensive performance report including: overall score, breakdown of strengths and weaknesses, question-by-question feedback with ratings, specific suggestions for improvement, and actionable tips for your next interview. You can download this report as a PDF.",
      },
    ],
  },
  {
    category: "Account & Billing",
    questions: [
      {
        id: "ab-1",
        question: "Is Preply free to use?",
        answer:
          "Preply offers a free tier with limited interviews per month. For unlimited access, advanced features, and detailed analytics, you can upgrade to our Pro or Business plans. Check our Pricing page for current plans and features.",
      },
      {
        id: "ab-2",
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express) and support payment via bank transfer for annual plans. All payments are processed securely through our payment partner. We also support PayPal and UPI for select regions.",
      },
      {
        id: "ab-3",
        question: "Can I change my plan later?",
        answer:
          "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and we'll prorate any charges or credits. No long-term contracts required.",
      },
      {
        id: "ab-4",
        question: "Do you offer refunds?",
        answer:
          "We offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied, contact our support team within 30 days of your initial purchase for a full refund. No questions asked.",
      },
    ],
  },
  {
    category: "Dashboard & Analytics",
    questions: [
      {
        id: "da-1",
        question: "What can I see on my dashboard?",
        answer:
          "Your dashboard shows: total interviews taken, average score across all interviews, your best performance score, recent score improvement, practice streak, category-wise performance breakdown, aggregated strengths and weaknesses, and a table of all past interviews with quick access to reports.",
      },
      {
        id: "da-2",
        question: "How do I track my improvement over time?",
        answer:
          "The Performance Growth chart on your dashboard shows your scores plotted over time, helping you visualize improvement trends. After 2+ interviews, you'll see a line graph of your progress. The 'Last Change' metric shows how your latest interview compared to the previous one.",
      },
      {
        id: "da-3",
        question: "Can I download my interview reports?",
        answer:
          "Yes! Each interview report can be downloaded as a PDF. Click 'View Report' on any interview in your dashboard, then click 'Download PDF'. The PDF includes your score, strengths, weaknesses, overall feedback, and question-by-question analysis.",
      },
    ],
  },
  {
    category: "Technical Issues",
    questions: [
      {
        id: "ti-1",
        question: "My microphone isn't working. What should I do?",
        answer:
          "First, ensure your browser has permission to access your microphone (check the lock icon in the address bar). Try refreshing the page, or use a different browser. Make sure no other app is using your microphone. If issues persist, switch to text-based interview mode.",
      },
      {
        id: "ti-2",
        question: "The interview is stuck or not loading. How do I fix it?",
        answer:
          "Try refreshing the page first. Clear your browser cache and cookies if the issue persists. Check your internet connection stability. Disable browser extensions that might interfere. If the problem continues, contact our support team with details about your browser and device.",
      },
      {
        id: "ti-3",
        question: "Is my data secure?",
        answer:
          "Yes. We use bank-level encryption (AES-256) for all data at rest and in transit. Your interview recordings and personal data are stored securely. We never share your data with third parties without consent. You can delete your data anytime from account settings.",
      },
      {
        id: "ti-4",
        question: "How do I report a bug or issue?",
        answer:
          "You can report bugs by clicking 'Contact Support' at the bottom of this page, or email us at support@preply.com. Please include: a description of the issue, steps to reproduce it, your browser and device info, and screenshots if possible. We typically respond within 24 hours.",
      },
    ],
  },
];

// Server Component - fast initial render, FAQ data rendered on server
export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HelpCenterContent faqCategories={faqCategories} />
      <Footer />
    </div>
  );
}
