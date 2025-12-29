import { X } from "lucide-react";
import { m as motion, AnimatePresence } from "framer-motion";

interface ScriptModalProps {
    isOpen: boolean;
    onClose: () => void;
    script: any;
}

export function ScriptModal({ isOpen, onClose, script }: ScriptModalProps) {
    if (!isOpen) return null;

    // Safe parsing if script is string
    let parsedScript = script;
    if (typeof script === "string") {
        try {
            parsedScript = JSON.parse(script);
        } catch (e) {
            // If it's just a text string, we'll display it as is, or handle error
            parsedScript = { questions: [], answers: [] };
        }
    }

    // Assuming script structure is { questions: [], answers: [] } logic from Result page
    const questions = parsedScript.questions || [];
    const answers = parsedScript.answers || [];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl"
                >
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Interview Script</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto space-y-6">
                        {questions.map((q: any, i: number) => {
                            // Find answer for this question
                            const ans = answers.find((a: any) => a.questionId === q.id);
                            return (
                                <div key={i} className="space-y-2">
                                    <p className="font-semibold text-gray-900">Q{i + 1}: {q.text}</p>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {ans?.userAnswer || "No answer recorded"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                        {questions.length === 0 && (
                            <p className="text-center text-gray-500">No script data available.</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
