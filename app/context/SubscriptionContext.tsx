"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { createBrowserClient } from "@supabase/ssr";

interface Subscription {
    plan: "free" | "pro";
    billingCycle: "monthly" | "half_yearly" | "yearly" | null;
    status: "active" | "expired" | "cancelled";
    expiresAt: Date | null;
}

interface SubscriptionContextType {
    subscription: Subscription | null;
    loading: boolean;
    isPro: boolean;
    canTakeInterview: boolean;
    interviewsTaken: number;
    refreshSubscription: () => Promise<void>;
}

const defaultSubscription: Subscription = {
    plan: "free",
    billingCycle: null,
    status: "active",
    expiresAt: null,
};

const SubscriptionContext = createContext<SubscriptionContextType>({
    subscription: null,
    loading: true,
    isPro: false,
    canTakeInterview: true,
    interviewsTaken: 0,
    refreshSubscription: async () => { },
});

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
    const { user, loading: authLoading } = useAuth();
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [interviewsTaken, setInterviewsTaken] = useState(0);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const fetchSubscription = useCallback(async () => {
        if (!user) {
            setSubscription(defaultSubscription);
            setInterviewsTaken(0);
            setLoading(false);
            return;
        }

        try {
            // Fetch subscription
            const { data: subData } = await supabase
                .from("subscriptions")
                .select("*")
                .eq("user_id", user.id)
                .single();

            if (subData) {
                // Check if subscription is expired
                const isExpired = subData.expires_at && new Date(subData.expires_at) < new Date();

                setSubscription({
                    plan: isExpired ? "free" : subData.plan,
                    billingCycle: subData.billing_cycle,
                    status: isExpired ? "expired" : subData.status,
                    expiresAt: subData.expires_at ? new Date(subData.expires_at) : null,
                });
            } else {
                setSubscription(defaultSubscription);
            }

            // Fetch interview count for Free plan limit
            const { count } = await supabase
                .from("interviews")
                .select("*", { count: "exact", head: true })
                .eq("user_id", user.id);

            setInterviewsTaken(count || 0);
        } catch (error) {
            console.error("Error fetching subscription:", error);
            setSubscription(defaultSubscription);
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        if (!authLoading) {
            fetchSubscription();
        }
    }, [authLoading, fetchSubscription]);

    const isPro = subscription?.plan === "pro" && subscription?.status === "active";

    // Free users can only take 1 interview
    const canTakeInterview = isPro || interviewsTaken < 1;

    return (
        <SubscriptionContext.Provider
            value={{
                subscription,
                loading,
                isPro,
                canTakeInterview,
                interviewsTaken,
                refreshSubscription: fetchSubscription,
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
}

export function useSubscription() {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error("useSubscription must be used within a SubscriptionProvider");
    }
    return context;
}
