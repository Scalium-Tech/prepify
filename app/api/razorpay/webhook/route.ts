import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// Duration mapping
const DURATION_MONTHS: Record<string, number> = {
    monthly: 1,
    half_yearly: 6,
    yearly: 12,
};

export async function POST(request: NextRequest) {
    try {
        // Check environment variables
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

        const body = await request.text();
        const signature = request.headers.get("x-razorpay-signature");

        // Verify webhook signature if secret is configured
        if (process.env.RAZORPAY_WEBHOOK_SECRET && signature) {
            const expectedSignature = crypto
                .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
                .update(body)
                .digest("hex");

            if (signature !== expectedSignature) {
                console.error("Invalid webhook signature");
                return NextResponse.json(
                    { error: "Invalid signature" },
                    { status: 400 }
                );
            }
        }

        const event = JSON.parse(body);
        const eventType = event.event;

        console.log("Razorpay webhook event:", eventType);

        if (eventType === "payment.captured") {
            const payment = event.payload.payment.entity;
            const orderId = payment.order_id;
            const paymentId = payment.id;
            const notes = payment.notes || {};

            const userId = notes.userId;
            const billingCycle = notes.billingCycle || "monthly";

            if (userId) {
                // Calculate expiry
                const durationMonths = DURATION_MONTHS[billingCycle] || 1;
                const expiresAt = new Date();
                expiresAt.setMonth(expiresAt.getMonth() + durationMonths);

                // Update payment status
                await supabaseAdmin
                    .from("payments")
                    .update({
                        razorpay_payment_id: paymentId,
                        status: "captured",
                    })
                    .eq("razorpay_order_id", orderId);

                // Upsert subscription
                await supabaseAdmin.from("subscriptions").upsert(
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

                console.log(`Subscription activated for user ${userId}`);
            }
        }

        if (eventType === "payment.failed") {
            const payment = event.payload.payment.entity;
            const orderId = payment.order_id;

            // Update payment status to failed
            await supabaseAdmin
                .from("payments")
                .update({ status: "failed" })
                .eq("razorpay_order_id", orderId);

            console.log("Payment failed for order:", orderId);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        );
    }
}
