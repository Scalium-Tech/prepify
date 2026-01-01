"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useSubscription } from "@/app/context/SubscriptionContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Sparkles, Zap, Crown, ArrowRight, Loader2 } from "lucide-react";

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface PlanFeature {
    text: string;
    included: boolean;
}

interface Plan {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    period: string;
    billingCycle: "monthly" | "half_yearly" | "yearly";
    features: PlanFeature[];
    popular?: boolean;
    badge?: string;
}

const PLANS: Plan[] = [
    {
        id: "free",
        name: "Free",
        price: 0,
        period: "forever",
        billingCycle: "monthly",
        features: [
            { text: "1 interview (lifetime)", included: true },
            { text: "1 report download", included: true },
            { text: "AI-powered feedback", included: true },
            { text: "Dashboard access", included: false },
            { text: "Progress tracking", included: false },
            { text: "Interview history", included: false },
        ],
    },
    {
        id: "pro-monthly",
        name: "Pro Monthly",
        price: 99,
        period: "/month",
        billingCycle: "monthly",
        features: [
            { text: "Unlimited interviews", included: true },
            { text: "Unlimited report downloads", included: true },
            { text: "AI-powered feedback", included: true },
            { text: "Dashboard access", included: true },
            { text: "Progress tracking", included: true },
            { text: "Interview history", included: true },
        ],
    },
    {
        id: "pro-half-yearly",
        name: "Pro 6-Month",
        price: 399,
        originalPrice: 594,
        period: "/6 months",
        billingCycle: "half_yearly",
        badge: "Save 33%",
        features: [
            { text: "Unlimited interviews", included: true },
            { text: "Unlimited report downloads", included: true },
            { text: "AI-powered feedback", included: true },
            { text: "Dashboard access", included: true },
            { text: "Progress tracking", included: true },
            { text: "Interview history", included: true },
        ],
    },
    {
        id: "pro-yearly",
        name: "Pro Yearly",
        price: 999,
        originalPrice: 1188,
        period: "/year",
        billingCycle: "yearly",
        popular: true,
        badge: "Best Value",
        features: [
            { text: "Unlimited interviews", included: true },
            { text: "Unlimited report downloads", included: true },
            { text: "AI-powered feedback", included: true },
            { text: "Dashboard access", included: true },
            { text: "Progress tracking", included: true },
            { text: "Interview history", included: true },
        ],
    },
];

export default function PricingPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const { subscription, isPro, loading: subLoading, interviewsTaken } = useSubscription();
    const [processingPlan, setProcessingPlan] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (!subLoading && !isPro && interviewsTaken > 0) {
            setShowPopup(true);
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [subLoading, isPro, interviewsTaken]);

    const loadRazorpayScript = (): Promise<boolean> => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleSelectPlan = async (plan: Plan) => {
        if (plan.id === "free") {
            router.push("/interview-setup");
            return;
        }

        if (!user) {
            router.push("/login?redirect=/pricing");
            return;
        }

        if (isPro) {
            router.push("/dashboard");
            return;
        }

        setProcessingPlan(plan.id);

        try {
            // Load Razorpay script
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                alert("Failed to load payment gateway. Please try again.");
                setProcessingPlan(null);
                return;
            }

            // Create order
            const orderResponse = await fetch("/api/razorpay/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    billingCycle: plan.billingCycle,
                    userId: user.id,
                }),
            });

            const orderData = await orderResponse.json();

            if (!orderData.orderId) {
                alert("Failed to create order. Please try again.");
                setProcessingPlan(null);
                return;
            }

            // Open Razorpay checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Preply",
                description: `Pro Plan - ${plan.name}`,
                order_id: orderData.orderId,
                handler: async (response: any) => {
                    // Verify payment
                    const verifyResponse = await fetch("/api/razorpay/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userId: user.id,
                            billingCycle: plan.billingCycle,
                        }),
                    });

                    const verifyData = await verifyResponse.json();

                    if (verifyData.success) {
                        router.push("/dashboard?payment=success");
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                    setProcessingPlan(null);
                },
                prefill: {
                    email: user.email,
                },
                theme: {
                    color: "#7c3aed",
                },
                modal: {
                    ondismiss: () => {
                        setProcessingPlan(null);
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Payment error:", error);
            alert("An error occurred. Please try again.");
            setProcessingPlan(null);
        }
    };

    if (authLoading || subLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Pop-up for Free users who have completed an interview */}
            {showPopup && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white px-8 py-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300 border-2 border-violet-100">
                        <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                            <Crown className="w-6 h-6 text-violet-600" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Get the Paid Version</h3>
                            <p className="text-gray-500 text-sm">Unlock unlimited potential</p>
                        </div>
                    </div>
                </div>
            )}

            <Header />

            <main className="max-w-7xl mx-auto px-6 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full text-violet-700 text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        Choose Your Plan
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Invest in Your Career
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Practice unlimited interviews, track your progress, and land your dream job with AI-powered feedback.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative bg-white rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-xl ${plan.popular
                                ? "border-violet-500 shadow-lg shadow-violet-100"
                                : "border-gray-200 hover:border-violet-300"
                                }`}
                        >
                            {/* Badge */}
                            {plan.badge && (
                                <div
                                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold ${plan.popular
                                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                                        : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    {plan.badge}
                                </div>
                            )}

                            {/* Plan Icon */}
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${plan.id === "free"
                                    ? "bg-gray-100"
                                    : plan.popular
                                        ? "bg-gradient-to-br from-violet-500 to-purple-600"
                                        : "bg-violet-100"
                                    }`}
                            >
                                {plan.id === "free" ? (
                                    <Zap className="w-6 h-6 text-gray-600" />
                                ) : (
                                    <Crown
                                        className={`w-6 h-6 ${plan.popular ? "text-white" : "text-violet-600"
                                            }`}
                                    />
                                )}
                            </div>

                            {/* Plan Name */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-gray-900">
                                        ₹{plan.price}
                                    </span>
                                    <span className="text-gray-500">{plan.period}</span>
                                </div>
                                {plan.originalPrice && (
                                    <p className="text-sm text-gray-400 line-through mt-1">
                                        ₹{plan.originalPrice}
                                    </p>
                                )}
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <Check
                                            className={`w-5 h-5 mt-0.5 flex-shrink-0 ${feature.included ? "text-green-500" : "text-gray-300"
                                                }`}
                                        />
                                        <span
                                            className={
                                                feature.included ? "text-gray-700" : "text-gray-400"
                                            }
                                        >
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button
                                onClick={() => handleSelectPlan(plan)}
                                disabled={processingPlan !== null}
                                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${plan.popular
                                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-200"
                                    : plan.id === "free"
                                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        : "bg-violet-100 text-violet-700 hover:bg-violet-200"
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {processingPlan === plan.id ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : isPro && plan.id !== "free" ? (
                                    "Current Plan"
                                ) : plan.id === "free" ? (
                                    <>
                                        Start Free
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                ) : (
                                    <>
                                        Upgrade to Pro
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Trust Badges */}
                <div className="text-center">
                    <p className="text-gray-500 mb-4">Trusted payment powered by</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                        <div className="flex items-center gap-2 text-gray-400">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span>Secure Checkout</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                            </svg>
                            <span>256-bit SSL</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <img
                                src="https://razorpay.com/favicon.png"
                                alt="Razorpay"
                                className="w-6 h-6"
                            />
                            <span>Razorpay</span>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-20 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Can I cancel anytime?
                            </h3>
                            <p className="text-gray-600">
                                Yes! Your Pro subscription is one-time payment. It expires after the selected duration with no auto-renewal.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                What happens after my Free interview?
                            </h3>
                            <p className="text-gray-600">
                                After using your free interview, you&apos;ll need to upgrade to Pro to continue practicing. Your free report can be downloaded once.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Is my payment secure?
                            </h3>
                            <p className="text-gray-600">
                                Absolutely! We use Razorpay, India&apos;s most trusted payment gateway with bank-grade security.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
