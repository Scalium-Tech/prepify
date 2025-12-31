"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "@/components/motion";
import { Header } from "./_components/Header";
import { InterviewSetupForm } from "./_components/InterviewSetupForm";
import { ResumeUploadCard } from "./_components/ResumeUploadCard";
import { useAuth } from "@/app/context/AuthContext";
import { useSubscription } from "@/app/context/SubscriptionContext";
import { Loader2 } from "lucide-react";

export default function InterviewSetupPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const { canTakeInterview, loading: subLoading, interviewsTaken, isPro } = useSubscription();

    useEffect(() => {
        if (authLoading || subLoading) return;

        if (!user) {
            router.push("/login?redirect=/interview-setup");
            return;
        }

        // Redirect Free users who have exhausted their interview
        if (!canTakeInterview) {
            router.push("/pricing?upgrade=interview");
            return;
        }
    }, [user, authLoading, subLoading, canTakeInterview, router]);

    // Show loading while checking auth and subscription
    if (authLoading || subLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
            </div>
        );
    }

    // Don't render if redirecting
    if (!user || !canTakeInterview) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
            </div>
        );
    }

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
