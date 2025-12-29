"use client";

import dynamic from "next/dynamic";
import { Heart, Target, Zap, Users, Quote, Sparkles, CheckCircle2, ArrowRight, Lightbulb, Code, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

// Lazy load framer-motion components
const MotionDiv = dynamic(
    () => import("@/components/motion").then((mod) => mod.FadeInUp),
    { ssr: false }
);
const MotionLeft = dynamic(
    () => import("@/components/motion").then((mod) => mod.FadeInLeft),
    { ssr: false }
);
const MotionRight = dynamic(
    () => import("@/components/motion").then((mod) => mod.FadeInRight),
    { ssr: false }
);
const MotionScale = dynamic(
    () => import("@/components/motion").then((mod) => mod.ScaleIn),
    { ssr: false }
);

export default function AboutContent() {
    const router = useRouter();
    const { user } = useAuth();

    // Handle conditional navigation for CTA buttons
    const handleGetStarted = () => {
        if (user) {
            // Authenticated users go directly to interview setup
            router.push("/interview-setup");
        } else {
            // Unauthenticated users go to login with redirect
            router.push("/login?redirect=/interview-setup");
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-white py-20 lg:py-32">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-200 rounded-full blur-3xl opacity-30" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-30" />
                </div>

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <MotionLeft>
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-6">
                                <Heart className="w-4 h-4" />
                                Our Story
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                Built by a Student,{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                                    For Students
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                Preply was born from countless sleepless nights preparing for interviews,
                                the anxiety of not knowing what to expect, and a dream to make interview preparation
                                accessible to everyone.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={handleGetStarted}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-all shadow-lg shadow-violet-200"
                                >
                                    Start Your Journey <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </MotionLeft>

                        {/* Founder Image */}
                        <MotionRight delay={0.2} className="flex justify-center lg:justify-end">
                            <div className="relative">
                                {/* Decorative Ring */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-violet-400 to-purple-400 rounded-3xl blur-xl opacity-30" />

                                {/* Image Container */}
                                <div className="relative bg-white p-3 rounded-3xl shadow-2xl">
                                    <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden group">
                                        <Image
                                            src="/founder.jpg"
                                            alt="Nakul Dafale - Founder of Preply"
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            priority
                                        />
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <div className="text-white">
                                                <p className="font-bold text-lg">Nakul Dafale</p>
                                                <p className="text-white/80 text-sm">Founder & Developer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <MotionScale delay={0.5} className="absolute -bottom-4 -left-4 bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100">
                                    <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Code className="w-4 h-4 text-violet-600" />
                                        CS Student & Builder
                                    </span>
                                </MotionScale>
                            </div>
                        </MotionRight>
                    </div>
                </div>
            </section>

            {/* The Journey Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <MotionDiv className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                            <BookOpen className="w-4 h-4" />
                            The Journey
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            From Frustration to Innovation
                        </h2>
                    </MotionDiv>

                    <div className="space-y-8">
                        {/* Story Card 1 */}
                        <MotionDiv className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-3xl p-8 border border-violet-100">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center shrink-0">
                                    <Quote className="w-6 h-6 text-violet-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">The Beginning</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        As a Computer Science engineering student, I spent countless hours preparing for campus placements
                                        and off-campus interviews. I watched tutorials, read countless articles, and practiced with friends.
                                        But something was always missing – the realistic pressure of an actual interview.
                                    </p>
                                </div>
                            </div>
                        </MotionDiv>

                        {/* Story Card 2 */}
                        <MotionDiv delay={0.1} className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center shrink-0">
                                    <Target className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">The Problem</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        I realized the biggest challenge wasn&apos;t knowledge – it was <strong>confidence and practice</strong>.
                                        Mock interviews with friends felt awkward, scheduling sessions with mentors was difficult, and
                                        there was no way to get honest, unbiased feedback on my responses. Every interview felt like
                                        jumping into the deep end without knowing how to swim.
                                    </p>
                                </div>
                            </div>
                        </MotionDiv>

                        {/* Story Card 3 */}
                        <MotionDiv delay={0.2} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center shrink-0">
                                    <Lightbulb className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">The Solution</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        That&apos;s when the idea struck me – what if AI could be your personal interview coach?
                                        Available 24/7, never judging, always patient, and brutally honest with feedback.
                                        I combined my passion for building web applications with AI technology to create
                                        <strong> Preply</strong> – a platform where anyone can practice interviews
                                        anytime, anywhere, and get real feedback to improve.
                                    </p>
                                </div>
                            </div>
                        </MotionDiv>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <MotionDiv className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-4">
                            <Sparkles className="w-4 h-4" />
                            Our Mission
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Democratizing Interview Preparation
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We believe everyone deserves access to quality interview preparation,
                            regardless of their background, network, or financial situation.
                        </p>
                    </MotionDiv>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Target className="w-6 h-6" />,
                                title: "Realistic Practice",
                                description: "AI-powered interviews that simulate real scenarios, complete with follow-up questions and pressure.",
                                color: "violet"
                            },
                            {
                                icon: <Zap className="w-6 h-6" />,
                                title: "Instant Feedback",
                                description: "Get detailed, actionable feedback on your responses immediately after each interview session.",
                                color: "purple"
                            },
                            {
                                icon: <Users className="w-6 h-6" />,
                                title: "For Everyone",
                                description: "Whether you're a student, career switcher, or seasoned professional – Preply adapts to you.",
                                color: "pink"
                            }
                        ].map((item, index) => (
                            <MotionDiv
                                key={item.title}
                                delay={index * 0.1}
                                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className={`w-14 h-14 bg-${item.color}-100 rounded-2xl flex items-center justify-center text-${item.color}-600 mb-6`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </MotionDiv>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Preply Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <MotionLeft>
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                                <CheckCircle2 className="w-4 h-4" />
                                Why Choose Us
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                What Makes Preply Different
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                This isn&apos;t just another interview prep tool. It&apos;s built by someone who
                                understands the struggles, the anxiety, and the pressure of being a student
                                facing the interview battlefield.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Practice anytime, anywhere – no scheduling needed",
                                    "AI that adapts questions based on your resume",
                                    "Honest, detailed feedback on every response",
                                    "Track your progress and improvement over time",
                                    "Multiple interview categories and difficulty levels",
                                    "Download reports to review and share"
                                ].map((point, i) => (
                                    <MotionDiv
                                        key={i}
                                        delay={i * 0.05}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span className="text-gray-700">{point}</span>
                                    </MotionDiv>
                                ))}
                            </div>
                        </MotionLeft>

                        <MotionRight className="relative">
                            <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl p-8 text-white">
                                <Quote className="w-12 h-12 text-white/30 mb-6" />
                                <p className="text-xl leading-relaxed mb-6">
                                    &ldquo;I built Preply because I wish I had something like this when I was
                                    preparing for my placements. Every student deserves a fair chance to practice
                                    and improve, without barriers.&rdquo;
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                                        <Image
                                            src="/founder.jpg"
                                            alt="Nakul Dafale"
                                            width={48}
                                            height={48}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold">Nakul Dafale</p>
                                        <p className="text-white/70 text-sm">Founder & Developer</p>
                                    </div>
                                </div>
                            </div>
                        </MotionRight>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-violet-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center">
                    <MotionDiv>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Ace Your Next Interview?
                        </h2>
                        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                            Join thousands of students and professionals who are preparing smarter,
                            not harder. Start your first practice interview today – it&apos;s free!
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={handleGetStarted}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-600 font-bold rounded-xl hover:bg-violet-50 transition-all shadow-lg hover:-translate-y-1"
                            >
                                Get Started Free <ArrowRight className="w-5 h-5" />
                            </button>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/30"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </MotionDiv>
                </div>
            </section>
        </>
    );
}
