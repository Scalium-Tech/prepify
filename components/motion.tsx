"use client";

import { m as motion } from "framer-motion";
import { ComponentProps, forwardRef } from "react";

// Pre-configured motion components with common animations
export const FadeInUp = forwardRef<
    HTMLDivElement,
    ComponentProps<typeof motion.div> & { delay?: number }
>(({ delay = 0, children, ...props }, ref) => (
    <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        {...props}
    >
        {children}
    </motion.div>
));
FadeInUp.displayName = "FadeInUp";

export const FadeInLeft = forwardRef<
    HTMLDivElement,
    ComponentProps<typeof motion.div> & { delay?: number }
>(({ delay = 0, children, ...props }, ref) => (
    <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        {...props}
    >
        {children}
    </motion.div>
));
FadeInLeft.displayName = "FadeInLeft";

export const FadeInRight = forwardRef<
    HTMLDivElement,
    ComponentProps<typeof motion.div> & { delay?: number }
>(({ delay = 0, children, ...props }, ref) => (
    <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        {...props}
    >
        {children}
    </motion.div>
));
FadeInRight.displayName = "FadeInRight";

export const ScaleIn = forwardRef<
    HTMLDivElement,
    ComponentProps<typeof motion.div> & { delay?: number }
>(({ delay = 0, children, ...props }, ref) => (
    <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        {...props}
    >
        {children}
    </motion.div>
));
ScaleIn.displayName = "ScaleIn";

// Re-export motion for direct use when needed
export { motion };
