"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "@/components/motion";
import {
    MessageSquare,
    Star,
    Send,
    ArrowLeft,
    CheckCircle2,
    Lightbulb,
    Bug,
    Heart,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/app/context/AuthContext";

type FeedbackType = "suggestion" | "bug" | "compliment" | "other";

interface FeedbackOption {
    type: FeedbackType;
    icon: React.ReactNode;
    label: string;
    description: string;
    gradient: string;
}

const feedbackOptions: FeedbackOption[] = [
    {
        type: "suggestion",
        icon: <Lightbulb className="w-6 h-6" />,
        label: "Suggestion",
        description: "Share an idea to improve our platform",
        gradient: "from-amber-500 to-orange-500",
    },
    {
        type: "bug",
        icon: <Bug className="w-6 h-6" />,
        label: "Bug Report",
        description: "Help us fix something that's broken",
        gradient: "from-red-500 to-pink-500",
    },
    {
        type: "compliment",
        icon: <Heart className="w-6 h-6" />,
        label: "Compliment",
        description: "Tell us what you love about Preply",
        gradient: "from-pink-500 to-rose-500",
    },
    {
        type: "other",
        icon: <MessageSquare className="w-6 h-6" />,
        label: "Other",
        description: "Anything else on your mind",
        gradient: "from-violet-500 to-purple-500",
    },
];

export default function FeedbackPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [selectedType, setSelectedType] = useState<FeedbackType | null>(null);
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login?redirect=/feedback");
        }
    }, [user, authLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedType || !feedback.trim() || !user) return;

        setIsSubmitting(true);
        setSubmitError("");

        try {
            const { supabase } = await import("@/lib/supabase");

            const { error: insertError } = await supabase
                .from("feedback")
                .insert({
                    user_id: user.id,
                    email: user.email,
                    message: `[${selectedType.toUpperCase()}] ${feedback.trim()}`,
                    stars: rating > 0 ? rating : null,
                });

            if (insertError) {
                console.error("Supabase Error:", insertError);
                throw new Error(insertError.message);
            }

            setIsSubmitted(true);
        } catch (err: any) {
            console.error("Submit Error:", err);
            setSubmitError(err.message || "Failed to submit feedback. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setSelectedType(null);
        setRating(0);
        setFeedback("");
        setIsSubmitted(false);
        setSubmitError("");
    };

    // Show loading while checking auth
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-50/50 via-white to-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
            </div>
        );
    }

    // Don't render if not authenticated (will redirect)
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-50/50 via-white to-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50/50 via-white to-white">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-16 pb-8 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-200/30 via-purple-200/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-200/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full text-violet-700 text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            We Value Your Feedback
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Help Us{" "}
                            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                                Improve
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Your feedback shapes the future of Preply. Share your thoughts, report issues, or tell us what you love.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="max-w-3xl mx-auto px-6">
                    {isSubmitted ? (
                        /* Success State */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 text-center"
                        >
                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25">
                                <CheckCircle2 className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                Thank You! 🎉
                            </h2>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                Your feedback has been received. We truly appreciate you taking the time to help us improve Preply.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={resetForm}
                                    variant="outline"
                                    className="rounded-xl px-6"
                                >
                                    Submit More Feedback
                                </Button>
                                <Link href="/">
                                    <Button className="rounded-xl px-6 bg-violet-600 hover:bg-violet-700">
                                        Back to Home
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100"
                        >
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Error Message */}
                                {submitError && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                        {submitError}
                                    </div>
                                )}

                                {/* Feedback Type Selection */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                                        What type of feedback do you have?
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {feedbackOptions.map((option) => (
                                            <button
                                                key={option.type}
                                                type="button"
                                                onClick={() => setSelectedType(option.type)}
                                                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 text-left group ${selectedType === option.type
                                                    ? "border-violet-500 bg-violet-50 shadow-lg"
                                                    : "border-gray-200 hover:border-violet-200 hover:bg-violet-50/50"
                                                    }`}
                                            >
                                                <div
                                                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}
                                                >
                                                    {option.icon}
                                                </div>
                                                <p className="font-semibold text-gray-900 text-sm">
                                                    {option.label}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1 hidden md:block">
                                                    {option.description}
                                                </p>
                                                {selectedType === option.type && (
                                                    <div className="absolute top-3 right-3 w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center">
                                                        <CheckCircle2 className="w-3 h-3 text-white" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Star Rating */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                                        How would you rate your overall experience?
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoveredRating(star)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                                className="p-2 rounded-xl hover:bg-violet-50 transition-colors"
                                            >
                                                <Star
                                                    className={`w-8 h-8 transition-all duration-200 ${star <= (hoveredRating || rating)
                                                        ? "fill-yellow-400 text-yellow-400 scale-110"
                                                        : "text-gray-300"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                        {rating > 0 && (
                                            <span className="ml-4 text-sm text-gray-500 self-center">
                                                {rating === 5
                                                    ? "Excellent!"
                                                    : rating === 4
                                                        ? "Great!"
                                                        : rating === 3
                                                            ? "Good"
                                                            : rating === 2
                                                                ? "Fair"
                                                                : "Poor"}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Feedback Text */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                                        Tell us more
                                    </label>
                                    <textarea
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Share your thoughts, ideas, or describe the issue you encountered..."
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Link href="/" className="sm:order-1">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full sm:w-auto rounded-xl px-6 h-12"
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Back
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        disabled={!selectedType || !feedback.trim() || isSubmitting}
                                        className="flex-1 sm:order-2 rounded-xl h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Send className="w-4 h-4" />
                                                Submit Feedback
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-gray-500 text-sm">
                            Have a more detailed inquiry?{" "}
                            <Link
                                href="/contact"
                                className="text-violet-600 font-medium hover:text-violet-700 transition-colors"
                            >
                                Contact our support team
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
