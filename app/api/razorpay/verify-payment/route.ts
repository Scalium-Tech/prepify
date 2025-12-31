import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// Duration mapping for calculating expiry
const DURATION_MONTHS: Record<string, number> = {
    monthly: 1,
    half_yearly: 6,
    yearly: 12,
};

export async function POST(request: NextRequest) {
    try {
        // Check environment variables
        if (!process.env.RAZORPAY_KEY_SECRET) {
            console.error("Razorpay secret not configured");
            return NextResponse.json(
                { error: "Payment service not configured" },
                { status: 503 }
            );
        }

        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
            console.error("Supabase credentials not configured");
            return NextResponse.json(
                { error: "Database service not configured" },
                { status: 503 }
            );
        }

        // Initialize Supabase inside handler (lazy initialization)
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            userId,
            billingCycle,
        } = await request.json();

        // Verify signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json(
                { error: "Invalid payment signature" },
                { status: 400 }
            );
        }

        // Calculate expiry date
        const durationMonths = DURATION_MONTHS[billingCycle] || 1;
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + durationMonths);

        // Update payment record
        await supabaseAdmin
            .from("payments")
            .update({
                razorpay_payment_id,
                razorpay_signature,
                status: "captured",
            })
            .eq("razorpay_order_id", razorpay_order_id);

        // Upsert subscription (update if exists, insert if not)
        const { error: subscriptionError } = await supabaseAdmin
            .from("subscriptions")
            .upsert(
                {
                    user_id: userId,
                    plan: "pro",
                    billing_cycle: billingCycle,
                    status: "active",
                    started_at: new Date().toISOString(),
                    expires_at: expiresAt.toISOString(),
                    updated_at: new Date().toISOString(),
                },
                {
                    onConflict: "user_id",
                }
            );

        if (subscriptionError) {
            console.error("Error updating subscription:", subscriptionError);
            return NextResponse.json(
                { error: "Failed to update subscription" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Payment verified and subscription activated",
            expiresAt: expiresAt.toISOString(),
        });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json(
            { error: "Failed to verify payment" },
            { status: 500 }
        );
    }
}
