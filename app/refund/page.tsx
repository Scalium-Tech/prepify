import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RefreshCw, XCircle, CheckCircle, Clock, Mail, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cancellation & Refund Policy - Preply",
    description: "Cancellation and Refund Policy for Preply AI Interview Practice Platform.",
};

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-4xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <RefreshCw className="w-8 h-8 text-orange-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Cancellation & Refund Policy</h1>
                    <p className="text-gray-500">Last updated: December 31, 2024</p>
                </div>

                <div className="prose prose-gray max-w-none">
                    {/* Important Notice */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-amber-900 mb-1">Important</h3>
                                <p className="text-amber-800 text-sm">
                                    Preply offers digital services (AI-powered interview practice). Please read this
                                    policy carefully before making a purchase.
                                </p>
                            </div>
                        </div>
                    </div>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Subscription Model</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Preply Pro subscriptions are sold as one-time payments for a fixed duration:
                        </p>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <p className="font-bold text-gray-900">₹99</p>
                                <p className="text-sm text-gray-500">1 Month</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <p className="font-bold text-gray-900">₹399</p>
                                <p className="text-sm text-gray-500">6 Months</p>
                            </div>
                            <div className="bg-violet-50 rounded-xl p-4 text-center border-2 border-violet-200">
                                <p className="font-bold text-violet-700">₹999</p>
                                <p className="text-sm text-violet-600">12 Months</p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            Subscriptions do not auto-renew. You will need to manually purchase a new subscription
                            after your current plan expires.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <XCircle className="w-6 h-6 text-red-500" />
                            2. Cancellation Policy
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Since our subscriptions are one-time payments (not recurring), there is no cancellation
                            required. Your subscription will simply expire after the purchased duration.
                        </p>
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">Key Points:</h3>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>No auto-renewal means no surprise charges</li>
                                <li>Your access continues until the expiration date</li>
                                <li>No cancellation fees</li>
                                <li>You can continue using the service until expiry</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            3. Refund Policy
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We want you to be satisfied with our service. Refunds may be considered under the
                            following conditions:
                        </p>

                        <div className="space-y-4">
                            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                                <h3 className="font-semibold text-green-900 mb-2">✓ Eligible for Refund</h3>
                                <ul className="list-disc pl-6 text-green-800 space-y-1">
                                    <li>Request made within 24 hours of purchase</li>
                                    <li>No interviews have been conducted</li>
                                    <li>Technical issues preventing service usage (verified by our team)</li>
                                    <li>Duplicate or accidental payments</li>
                                </ul>
                            </div>

                            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                                <h3 className="font-semibold text-red-900 mb-2">✗ Not Eligible for Refund</h3>
                                <ul className="list-disc pl-6 text-red-800 space-y-1">
                                    <li>Request made after 24 hours of purchase</li>
                                    <li>If you have used the service (conducted interviews)</li>
                                    <li>Change of mind after using the platform</li>
                                    <li>Failure to achieve desired interview results</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Clock className="w-6 h-6 text-blue-500" />
                            4. Refund Process
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center shrink-0">
                                    <span className="font-bold text-violet-600">1</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Submit Request</p>
                                    <p className="text-gray-600 text-sm">
                                        Email us at nakuldafale7@gmail.com with your payment details and reason for refund
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center shrink-0">
                                    <span className="font-bold text-violet-600">2</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Review (1-2 business days)</p>
                                    <p className="text-gray-600 text-sm">
                                        Our team will review your request and verify eligibility
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center shrink-0">
                                    <span className="font-bold text-violet-600">3</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Processing (5-7 business days)</p>
                                    <p className="text-gray-600 text-sm">
                                        If approved, refund will be processed to your original payment method
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Free Plan Users</h2>
                        <p className="text-gray-600 leading-relaxed">
                            The Free plan provides 1 interview and 1 report download at no cost. Since no payment
                            is involved, refunds are not applicable for Free plan usage.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Mail className="w-6 h-6 text-violet-600" />
                            6. Contact Us
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            For refund requests or questions about this policy:
                        </p>
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-700">Email: nakuldafale7@gmail.com</p>
                            <p className="text-gray-500 text-sm mt-1">Response time: Within 24 hours</p>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
