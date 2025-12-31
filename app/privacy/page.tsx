import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Eye, Lock, Database, UserCheck, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - Preply",
    description: "Privacy Policy for Preply AI Interview Practice Platform.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-4xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                    <p className="text-gray-500">Last updated: December 31, 2024</p>
                </div>

                <div className="prose prose-gray max-w-none">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                        <p className="text-gray-600 leading-relaxed">
                            At Preply, we are committed to protecting your privacy. This Privacy Policy explains how
                            we collect, use, disclose, and safeguard your information when you use our AI-powered
                            interview practice platform.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Database className="w-6 h-6 text-violet-600" />
                            2. Information We Collect
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                                    <li>Email address (for account creation and communication)</li>
                                    <li>Name (if provided in your profile)</li>
                                    <li>Payment information (processed securely by Razorpay)</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="font-semibold text-gray-900 mb-2">Usage Data</h3>
                                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                                    <li>Resume content (for generating personalized interview questions)</li>
                                    <li>Interview responses and performance data</li>
                                    <li>Device information and IP address</li>
                                    <li>Usage patterns and preferences</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Eye className="w-6 h-6 text-violet-600" />
                            3. How We Use Your Information
                        </h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>To provide and maintain our interview practice services</li>
                            <li>To generate personalized interview questions based on your resume</li>
                            <li>To analyze your performance and provide AI-powered feedback</li>
                            <li>To process payments and manage subscriptions</li>
                            <li>To communicate with you about your account or our services</li>
                            <li>To improve our AI algorithms and user experience</li>
                            <li>To comply with legal obligations</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Lock className="w-6 h-6 text-violet-600" />
                            4. Data Security
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We implement appropriate technical and organizational measures to protect your personal
                            data, including:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Encrypted data transmission using SSL/TLS</li>
                            <li>Secure database storage with Supabase</li>
                            <li>Row-level security policies to ensure data isolation</li>
                            <li>Regular security audits and updates</li>
                            <li>Secure payment processing through Razorpay (PCI-DSS compliant)</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We retain your personal data only for as long as necessary to provide our services and
                            fulfill the purposes described in this policy. Interview data and reports are retained
                            for the duration of your account. You may request deletion of your data at any time by
                            contacting us.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Third-Party Services</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">We use the following third-party services:</p>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-violet-100 rounded flex items-center justify-center shrink-0">
                                    <span className="text-sm font-bold text-violet-600">G</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Google Gemini AI</p>
                                    <p className="text-sm text-gray-500">For generating interview questions and feedback</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center shrink-0">
                                    <span className="text-sm font-bold text-green-600">S</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Supabase</p>
                                    <p className="text-sm text-gray-500">For authentication and database storage</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center shrink-0">
                                    <span className="text-sm font-bold text-blue-600">R</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Razorpay</p>
                                    <p className="text-sm text-gray-500">For secure payment processing</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <UserCheck className="w-6 h-6 text-violet-600" />
                            7. Your Rights
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Access your personal data</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Withdraw consent for data processing</li>
                            <li>Data portability</li>
                            <li>Lodge a complaint with a supervisory authority</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We use essential cookies to maintain your login session and preferences. These cookies
                            are necessary for the proper functioning of our platform. We do not use tracking or
                            advertising cookies.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any changes
                            by posting the new policy on this page and updating the &quot;Last updated&quot; date.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Mail className="w-6 h-6 text-violet-600" />
                            10. Contact Us
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us:
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
