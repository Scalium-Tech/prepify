"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, X, Play } from "lucide-react";

// FAQ Accordion Component
export function FAQItem({
    question,
    answer,
    isOpen,
    onClick,
}: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}) {
    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-violet-200">
            <button
                onClick={onClick}
                className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-violet-50/50 transition-colors"
            >
                <span className="font-semibold text-gray-900 pr-4">{question}</span>
                <ChevronDown
                    className={`w-5 h-5 text-violet-600 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}
            >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">{answer}</div>
            </div>
        </div>
    );
}

// FAQ Section with state management
export function FAQSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
    const [openFAQ, setOpenFAQ] = useState<number | null>(0);

    return (
        <div className="space-y-4">
            {faqs.map((faq, i) => (
                <FAQItem
                    key={i}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQ === i}
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                />
            ))}
        </div>
    );
}

// Video Modal Component
export function VideoModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!isOpen && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-4xl animate-scale-in">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
                >
                    <X className="w-8 h-8" />
                </button>

                {/* Video container */}
                <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                    <video
                        ref={videoRef}
                        src="/demo.mp4"
                        controls
                        autoPlay
                        className="w-full aspect-video"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
}

// Watch Demo Button with modal state
export function WatchDemoButton() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsVideoOpen(true)}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-violet-300 hover:text-violet-600 transition-all duration-300"
            >
                <Play className="w-5 h-5" />
                Watch Demo
            </button>
            <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
        </>
    );
}
