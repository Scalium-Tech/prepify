"use client";

import { Search, ChevronDown, Copy, Check, Sparkles, MessageSquare, ArrowRight, X } from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";

interface FAQ {
    id: string;
    question: string;
    answer: string;
}

interface FAQCategory {
    category: string;
    questions: FAQ[];
}

interface SearchResult extends FAQ {
    category: string;
    relevanceScore: number;
    matchedKeywords: string[];
}

export default function HelpCenterContent({ faqCategories }: { faqCategories: FAQCategory[] }) {
    const [openFaq, setOpenFaq] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const toggleFaq = (id: string) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    // Flatten all FAQs for search
    const allFaqs = useMemo(() => {
        return faqCategories.flatMap((cat) =>
            cat.questions.map((q) => ({
                ...q,
                category: cat.category,
            }))
        );
    }, [faqCategories]);

    // Search function with relevance scoring
    const searchResults = useMemo((): SearchResult[] => {
        if (!searchQuery.trim()) return [];

        const query = searchQuery.toLowerCase().trim();
        const queryWords = query.split(/\s+/).filter((w) => w.length > 2);

        return allFaqs
            .map((faq) => {
                const questionLower = faq.question.toLowerCase();
                const answerLower = faq.answer.toLowerCase();
                const matchedKeywords: string[] = [];
                let relevanceScore = 0;

                // Exact phrase match in question (highest priority)
                if (questionLower.includes(query)) {
                    relevanceScore += 100;
                    matchedKeywords.push(query);
                }

                // Exact phrase match in answer
                if (answerLower.includes(query)) {
                    relevanceScore += 50;
                    if (!matchedKeywords.includes(query)) matchedKeywords.push(query);
                }

                // Individual word matches
                queryWords.forEach((word) => {
                    if (questionLower.includes(word)) {
                        relevanceScore += 20;
                        if (!matchedKeywords.includes(word)) matchedKeywords.push(word);
                    }
                    if (answerLower.includes(word)) {
                        relevanceScore += 10;
                        if (!matchedKeywords.includes(word)) matchedKeywords.push(word);
                    }
                });

                return {
                    ...faq,
                    relevanceScore,
                    matchedKeywords,
                };
            })
            .filter((r) => r.relevanceScore > 0)
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, 5);
    }, [searchQuery, allFaqs]);

    // Copy to clipboard
    const copyToClipboard = useCallback(async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    }, []);

    // Highlight matched text
    const highlightText = (text: string, keywords: string[]) => {
        if (!keywords.length) return text;

        let result = text;
        keywords.forEach((keyword) => {
            const regex = new RegExp(`(${keyword})`, "gi");
            result = result.replace(
                regex,
                '<mark class="bg-violet-200 text-violet-900 px-0.5 rounded">$1</mark>'
            );
        });
        return result;
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className="bg-gradient-to-b from-violet-50/50 via-white to-white py-20 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Help Center
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        Find answers to common questions
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Ask a question or search for help..."
                                className="w-full pl-12 pr-12 py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all shadow-sm hover:border-violet-300"
                            />
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-600" />
                                </button>
                            )}
                        </div>

                        {/* Search Results */}
                        {searchQuery.trim() && (
                            <div className="mt-4 text-left animate-fade-in">
                                {searchResults.length > 0 ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                            <Sparkles className="w-4 h-4 text-violet-500" />
                                            <span>Found {searchResults.length} relevant answers</span>
                                        </div>

                                        {searchResults.map((result, index) => (
                                            <div
                                                key={result.id}
                                                className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-200"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                            >
                                                {/* Category Badge */}
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-xs font-medium bg-violet-100 text-violet-700 px-3 py-1 rounded-full">
                                                        {result.category}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            copyToClipboard(
                                                                `Q: ${result.question}\n\nA: ${result.answer}`,
                                                                result.id
                                                            )
                                                        }
                                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all"
                                                        title="Copy answer"
                                                    >
                                                        {copiedId === result.id ? (
                                                            <>
                                                                <Check className="w-3.5 h-3.5 text-green-500" />
                                                                <span className="text-green-600">Copied!</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Copy className="w-3.5 h-3.5" />
                                                                <span>Copy</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Question */}
                                                <h3
                                                    className="font-bold text-gray-900 mb-3 text-lg"
                                                    dangerouslySetInnerHTML={{
                                                        __html: highlightText(
                                                            result.question,
                                                            result.matchedKeywords
                                                        ),
                                                    }}
                                                />

                                                {/* Answer */}
                                                <p
                                                    className="text-gray-600 leading-relaxed"
                                                    dangerouslySetInnerHTML={{
                                                        __html: highlightText(
                                                            result.answer,
                                                            result.matchedKeywords
                                                        ),
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 border-2 border-gray-100 rounded-2xl p-8 text-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <MessageSquare className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <h3 className="font-bold text-gray-700 mb-2">
                                            No results found
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-4">
                                            We couldn&apos;t find anything matching &quot;{searchQuery}&quot;
                                        </p>
                                        <button
                                            onClick={clearSearch}
                                            className="text-violet-600 hover:text-violet-700 text-sm font-medium flex items-center gap-1 mx-auto"
                                        >
                                            Browse all topics <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* FAQ Categories - Shown when not searching */}
                {!searchQuery.trim() && (
                    <div className="space-y-12">
                        {faqCategories.map((category) => (
                            <div key={category.category}>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    {category.category}
                                </h2>

                                <div className="space-y-4">
                                    {category.questions.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-200"
                                        >
                                            <button
                                                onClick={() => toggleFaq(item.id)}
                                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                            >
                                                <span className="font-bold text-gray-900 text-base pr-4">
                                                    {item.question}
                                                </span>
                                                <ChevronDown
                                                    className={`w-5 h-5 text-violet-600 flex-shrink-0 transition-transform duration-300 ${openFaq === item.id ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>

                                            <div
                                                className={`overflow-hidden transition-all duration-300 ${openFaq === item.id ? "max-h-96" : "max-h-0"
                                                    }`}
                                            >
                                                <div className="px-6 py-5 bg-violet-50/30 border-t border-gray-100">
                                                    <div className="flex justify-between items-start gap-4">
                                                        <p className="text-gray-700 leading-relaxed flex-1">
                                                            {item.answer}
                                                        </p>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                copyToClipboard(
                                                                    `Q: ${item.question}\n\nA: ${item.answer}`,
                                                                    item.id
                                                                );
                                                            }}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-violet-600 hover:bg-violet-100 rounded-lg transition-all shrink-0"
                                                            title="Copy answer"
                                                        >
                                                            {copiedId === item.id ? (
                                                                <>
                                                                    <Check className="w-3.5 h-3.5 text-green-500" />
                                                                    <span className="text-green-600">Copied!</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Copy className="w-3.5 h-3.5" />
                                                                    <span>Copy</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Contact Support */}
                <div className="mt-16 bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-3">
                        Still have questions?
                    </h3>
                    <p className="text-white/80 mb-6">
                        Can&apos;t find the answer you&apos;re looking for? Our support
                        team is here to help.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-3 text-base font-semibold text-violet-600 bg-white rounded-xl hover:bg-violet-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-violet-600"
                        aria-label="Contact our support team"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>

            {/* CSS Animation */}
            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
