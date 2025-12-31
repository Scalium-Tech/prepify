import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";

// Pricing configuration
const PRICING = {
    monthly: { amount: 9900, duration: 1 }, // ₹99 = 9900 paise, 1 month
    half_yearly: { amount: 39900, duration: 6 }, // ₹399, 6 months
    yearly: { amount: 99900, duration: 12 }, // ₹999, 12 months
};

export async function POST(request: NextRequest) {
    try {
        // Check environment variables
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.error("Razorpay credentials not configured");
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

        // Initialize clients inside handler (lazy initialization)
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        const { billingCycle, userId } = await request.json();

        // Validate billing cycle
        if (!billingCycle || !PRICING[billingCycle as keyof typeof PRICING]) {
            return NextResponse.json(
                { error: "Invalid billing cycle" },
                { status: 400 }
            );
        }

        if (!userId) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

        const pricing = PRICING[billingCycle as keyof typeof PRICING];

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: pricing.amount,
            currency: "INR",
            receipt: `preply_${userId}_${Date.now()}`,
            notes: {
                userId,
                billingCycle,
                plan: "pro",
            },
        });

        // Create payment record in Supabase
        await supabaseAdmin.from("payments").insert({
            user_id: userId,
            plan: "pro",
            billing_cycle: billingCycle,
            amount: pricing.amount,
            razorpay_order_id: order.id,
            status: "created",
        });

        return NextResponse.json({
            orderId: order.id,
            amount: pricing.amount,
            currency: "INR",
            keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}
