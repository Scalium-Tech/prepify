import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Truck, Monitor, Zap, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shipping Policy - Preply",
    description: "Shipping and Delivery Policy for Preply AI Interview Practice Platform.",
};

export default function ShippingPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-4xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Truck className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping & Delivery Policy</h1>
                    <p className="text-gray-500">Last updated: December 31, 2024</p>
                </div>

                <div className="prose prose-gray max-w-none">
                    {/* Digital Product Notice */}
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-8 mb-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                                <Monitor className="w-6 h-6 text-violet-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">100% Digital Product</h2>
                                <p className="text-gray-600">No physical shipping required</p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Preply is a digital service platform. All our products and services are delivered
                            electronically through our website. There are no physical goods to ship.
                        </p>
                    </div>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Zap className="w-6 h-6 text-yellow-500" />
                            Instant Access
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Upon successful payment, you will receive instant access to Preply Pro features:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="font-semibold text-gray-900">Immediate Activation</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Your Pro subscription is activated instantly after payment confirmation
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="font-semibold text-gray-900">No Waiting Period</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Start practicing interviews immediately - no delays
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="font-semibold text-gray-900">24/7 Access</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Access your account and practice anytime, anywhere
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="font-semibold text-gray-900">Email Confirmation</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Receive payment confirmation via email for your records
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Get</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            With your Preply Pro subscription, you receive digital access to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Unlimited AI-powered interview practice sessions</li>
                            <li>Personalized interview questions based on your resume</li>
                            <li>Instant AI feedback and performance analysis</li>
                            <li>Downloadable PDF interview reports</li>
                            <li>Performance dashboard and analytics</li>
                            <li>Interview history and progress tracking</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Confirmation</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Delivery is confirmed when:
                        </p>
                        <ol className="list-decimal pl-6 text-gray-600 space-y-2 mt-4">
                            <li>Payment is successfully processed by Razorpay</li>
                            <li>Your subscription status is updated in our system</li>
                            <li>Pro features become accessible in your account</li>
                        </ol>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            If you experience any issues accessing your subscription after payment, please
                            contact us immediately at nakuldafale7@gmail.com.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Requirements</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            To access Preply services, you need:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>A modern web browser (Chrome, Firefox, Safari, Edge)</li>
                            <li>Stable internet connection</li>
                            <li>Microphone access (for voice-based interview practice)</li>
                            <li>Valid email address for account access</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                            For any questions about service delivery:
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
