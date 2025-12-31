import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Shield, CreditCard, RefreshCw, HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms and Conditions - Preply",
    description: "Terms and Conditions for using Preply AI Interview Practice Platform.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-4xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-8 h-8 text-violet-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
                    <p className="text-gray-500">Last updated: December 31, 2024</p>
                </div>

                <div className="prose prose-gray max-w-none">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Welcome to Preply, an AI-powered interview practice platform. By accessing or using our
                            website and services, you agree to be bound by these Terms and Conditions. Please read
                            them carefully before using our platform.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Offered</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Preply provides AI-powered mock interview practice services, including:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>AI-generated interview questions based on your resume and preferences</li>
                            <li>Real-time interview practice sessions with voice and text input</li>
                            <li>AI-powered feedback and performance analysis</li>
                            <li>Downloadable interview reports in PDF format</li>
                            <li>Performance tracking and analytics dashboard</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To access our services, you must create an account with a valid email address. You are
                            responsible for maintaining the confidentiality of your account credentials and for all
                            activities that occur under your account. You must notify us immediately of any
                            unauthorized use of your account.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscription Plans</h2>
                        <div className="bg-gray-50 rounded-xl p-6 mb-4">
                            <h3 className="font-semibold text-gray-900 mb-3">Free Plan</h3>
                            <ul className="list-disc pl-6 text-gray-600 space-y-1">
                                <li>1 interview session (lifetime)</li>
                                <li>1 report download</li>
                                <li>Limited access to features</li>
                            </ul>
                        </div>
                        <div className="bg-violet-50 rounded-xl p-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Pro Plan</h3>
                            <ul className="list-disc pl-6 text-gray-600 space-y-1">
                                <li>Unlimited interview sessions</li>
                                <li>Unlimited report downloads</li>
                                <li>Full dashboard access</li>
                                <li>Progress tracking and analytics</li>
                                <li>Interview history</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment Terms</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Pro subscriptions are billed as one-time payments for the selected duration (monthly,
                            6-month, or yearly). Payments are processed securely through Razorpay. All prices are
                            in Indian Rupees (INR). Subscriptions do not auto-renew; you will need to manually
                            renew after expiration.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User Conduct</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">You agree not to:</p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Use the service for any unlawful purpose</li>
                            <li>Share your account credentials with others</li>
                            <li>Attempt to bypass or circumvent any access restrictions</li>
                            <li>Upload malicious content or attempt to harm our systems</li>
                            <li>Reverse engineer or copy our AI algorithms</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
                        <p className="text-gray-600 leading-relaxed">
                            All content, features, and functionality of Preply, including but not limited to text,
                            graphics, logos, and software, are the exclusive property of Preply and are protected
                            by copyright, trademark, and other intellectual property laws.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimer</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Preply is an AI-powered practice tool and does not guarantee job placement or interview
                            success. The feedback provided by our AI is for educational purposes only and should not
                            be considered professional career advice. We are not responsible for any decisions made
                            based on our AI&apos;s feedback.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To the maximum extent permitted by law, Preply shall not be liable for any indirect,
                            incidental, special, consequential, or punitive damages arising from your use of our
                            services.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
                        <p className="text-gray-600 leading-relaxed">
                            For any questions regarding these Terms and Conditions, please contact us at:
                        </p>
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-700">Email: nakuldafale7@gmail.com</p>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
