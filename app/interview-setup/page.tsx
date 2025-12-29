"use client";

import { motion } from "@/components/motion";
import { Header } from "./_components/Header";
import { InterviewSetupForm } from "./_components/InterviewSetupForm";
import { ResumeUploadCard } from "./_components/ResumeUploadCard";

export default function InterviewSetupPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-violet-50 via-white to-purple-50" />
            <Header />

            <main className="container py-8 md:py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-6xl mx-auto"
                >
                    {/* Left Column - Resume Upload */}
                    <div className="h-full min-h-[500px] lg:h-[600px] lg:sticky lg:top-32">
                        <ResumeUploadCard />
                    </div>

                    {/* Right Column - Setup Form */}
                    <div className="w-full">
                        <InterviewSetupForm />
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
