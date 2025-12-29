"use client";

import { X, Trophy, CheckCircle2, AlertTriangle, FileText, Download, Loader2, MessageSquare } from "lucide-react";
import { m as motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";

interface QuestionFeedback {
    questionNumber: number;
    question: string;
    answer: string;
    feedback: string;
    rating: "good" | "average" | "needs_improvement";
}

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    reportData: any;
}

export function ReportModal({ isOpen, onClose, reportData }: ReportModalProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isPrintMode, setIsPrintMode] = useState(false);

    if (!isOpen) return null;

    const feedback = reportData?.feedback || reportData || {};
    const score = feedback.score || 0;
    const strengths = feedback.strengths || [];
    const weaknesses = feedback.weaknesses || [];
    const detailedFeedback = feedback.feedback || "No detailed feedback available.";
    const questionFeedback: QuestionFeedback[] = feedback.questionFeedback || [];

    const handleDownload = async () => {
        setIsGenerating(true);
        setIsPrintMode(true);

        // Wait for the print container to render
        await new Promise(resolve => setTimeout(resolve, 100));

        window.print();

        // Reset after print dialog closes
        setTimeout(() => {
            setIsPrintMode(false);
            setIsGenerating(false);
        }, 500);
    };

    const getScoreColor = () => {
        if (score >= 80) return "#22c55e";
        if (score >= 60) return "#eab308";
        return "#ef4444";
    };

    const getRatingBadge = (rating: string) => {
        switch (rating) {
            case "good":
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                        ✓ Good
                    </span>
                );
            case "average":
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                        → Average
                    </span>
                );
            case "needs_improvement":
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
                        ✗ Needs Work
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {/* Global Print Styles */}
            <style jsx global>{`
                @media print {
                    html, body {
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                    }
                    
                    body * {
                        visibility: hidden;
                    }
                    
                    #print-report-container,
                    #print-report-container * {
                        visibility: visible;
                    }
                    
                    #print-report-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        background: white !important;
                    }
                    
                    @page {
                        size: A4;
                        margin: 12mm 15mm;
                    }
                    
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    
                    .question-block {
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                    }
                    
                    .no-print {
                        display: none !important;
                    }
                }
            `}</style>

            {/* Print Container - Rendered when print mode is active */}
            {isPrintMode && (
                <div id="print-report-container" className="bg-white p-8">
                    <ReportContent
                        score={score}
                        getScoreColor={getScoreColor}
                        strengths={strengths}
                        weaknesses={weaknesses}
                        detailedFeedback={detailedFeedback}
                        questionFeedback={questionFeedback}
                        getRatingBadge={getRatingBadge}
                    />
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm no-print">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-50/50 flex-shrink-0">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-violet-600" />
                                Performance Report
                            </h2>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleDownload}
                                    disabled={isGenerating}
                                    className="hover:bg-violet-50 hover:text-violet-600"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-4 h-4 mr-2" />
                                            Download PDF
                                        </>
                                    )}
                                </Button>
                                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Report Content */}
                        <div className="p-8 overflow-y-auto flex-1">
                            <ReportContent
                                score={score}
                                getScoreColor={getScoreColor}
                                strengths={strengths}
                                weaknesses={weaknesses}
                                detailedFeedback={detailedFeedback}
                                questionFeedback={questionFeedback}
                                getRatingBadge={getRatingBadge}
                            />
                        </div>
                    </motion.div>
                </div>
            </AnimatePresence>
        </>
    );
}

// Separate component for report content
function ReportContent({
    score,
    getScoreColor,
    strengths,
    weaknesses,
    detailedFeedback,
    questionFeedback,
    getRatingBadge,
}: {
    score: number;
    getScoreColor: () => string;
    strengths: string[];
    weaknesses: string[];
    detailedFeedback: string;
    questionFeedback: QuestionFeedback[];
    getRatingBadge: (rating: string) => React.ReactNode;
}) {
    return (
        <div className="space-y-8 bg-white">
            {/* Header */}
            <div className="text-center pb-6 border-b-2 border-violet-200">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Interview Performance Report</h1>
                </div>
                <p className="text-gray-500 mt-2">
                    Generated on {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </p>
            </div>

            {/* Score Section */}
            <div className="flex items-center justify-center py-8">
                <div className="relative w-44 h-44 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                        <circle cx="80" cy="80" r="70" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                        <circle
                            cx="80" cy="80" r="70"
                            stroke={getScoreColor()}
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={440}
                            strokeDashoffset={440 - (440 * score) / 100}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className="text-5xl font-bold text-gray-900">{score}%</span>
                        <span className="text-sm text-gray-500 font-medium uppercase tracking-wider mt-1">Overall Score</span>
                    </div>
                </div>
            </div>

            {/* Strengths and Weaknesses Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-200">
                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2 mb-4 pb-3 border-b border-green-200">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Strengths
                    </h3>
                    <ul className="space-y-3">
                        {strengths.map((s: string, i: number) => (
                            <li key={i} className="text-gray-700 flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                                <span className="leading-relaxed">{s}</span>
                            </li>
                        ))}
                        {strengths.length === 0 && (
                            <li className="text-gray-500 italic">No strengths recorded</li>
                        )}
                    </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-200">
                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2 mb-4 pb-3 border-b border-red-200">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        Areas for Improvement
                    </h3>
                    <ul className="space-y-3">
                        {weaknesses.map((w: string, i: number) => (
                            <li key={i} className="text-gray-700 flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                                <span className="leading-relaxed">{w}</span>
                            </li>
                        ))}
                        {weaknesses.length === 0 && (
                            <li className="text-gray-500 italic">No areas for improvement recorded</li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Overall Feedback */}
            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                    <FileText className="w-5 h-5 text-violet-600" />
                    Overall Feedback
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                    {detailedFeedback}
                </p>
            </div>

            {/* Question-wise Feedback Section */}
            {questionFeedback.length > 0 && (
                <div className="space-y-6">
                    <h3 className="font-bold text-2xl text-gray-900 flex items-center gap-3 pb-3 border-b-2 border-violet-200">
                        <MessageSquare className="w-6 h-6 text-violet-600" />
                        Question-wise Feedback
                    </h3>

                    {questionFeedback.map((qf, index) => (
                        <div
                            key={index}
                            className="question-block bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm"
                        >
                            {/* Question Header */}
                            <div className="bg-gradient-to-r from-violet-100 to-purple-100 px-6 py-5 border-b-2 border-violet-200">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-bold text-violet-700 bg-violet-200 px-3 py-1 rounded-full">
                                        Question {qf.questionNumber}
                                    </span>
                                    {getRatingBadge(qf.rating)}
                                </div>
                                <p className="text-gray-900 font-semibold text-lg leading-relaxed">{qf.question}</p>
                            </div>

                            {/* Answer */}
                            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Your Answer</p>
                                <p className="text-gray-700 leading-relaxed text-base">
                                    {qf.answer || "No answer provided"}
                                </p>
                            </div>

                            {/* Feedback */}
                            <div className="px-6 py-5 bg-white">
                                <p className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-3">Feedback</p>
                                <p className="text-gray-700 leading-relaxed text-base">
                                    {qf.feedback}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div className="text-center pt-6 mt-8 border-t-2 border-gray-200">
                <p className="text-sm text-gray-400 font-medium">
                    Preply Interview Preparation Platform
                </p>
            </div>
        </div>
    );
}
