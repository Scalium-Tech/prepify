"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export default function ContactForm() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Require authentication
        if (!user) {
            router.push("/login?redirect=/contact");
            return;
        }

        // Validation
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            const { supabase } = await import("@/lib/supabase");

            const { error: insertError } = await supabase
                .from("contact_messages")
                .insert({
                    user_id: user.id,
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    message: formData.message.trim(),
                });

            if (insertError) {
                console.error("Supabase Error:", insertError);
                throw new Error(insertError.message);
            }

            setIsSubmitted(true);
            setFormData({ name: "", email: "", message: "" });
        } catch (err: any) {
            console.error("Submit Error:", err);
            setError(err.message || "Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loading while checking auth
    if (authLoading) {
        return (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    // Success state
    if (isSubmitted) {
        return (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
            {!user && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm">
                    Please <button onClick={() => router.push("/login?redirect=/contact")} className="font-semibold underline">log in</button> to send a message.
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your name"
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                        }
                        rows={6}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us how we can help you..."
                        disabled={isSubmitting}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !user}
                    className="w-full px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Send Message
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

