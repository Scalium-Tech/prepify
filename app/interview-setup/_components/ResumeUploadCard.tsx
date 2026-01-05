"use client";

import { FileText, Upload, FileCheck2, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { m as motion, AnimatePresence } from "framer-motion";
import { useInterview } from "@/app/context/InterviewContext";
import { useState, useRef } from "react";
import { toast } from "sonner"; // Assuming sonner is installed or use alert

export function ResumeUploadCard() {
    const { setup, setSetup, setResumeFile } = useInterview();
    const [isUploading, setIsUploading] = useState(false);
    const [activeTab, setActiveTab] = useState<'resume' | 'jd'>('resume');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const jdFileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'jd') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/interview/parse-resume", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to parse file");
            }

            if (type === 'resume') {
                setSetup((prev) => ({ ...prev, resumeText: data.text }));
                setResumeFile(file); // Store file for later upload
            } else {
                setSetup((prev) => ({ ...prev, jobDescription: data.text }));
            }
            // toast.success(`${type === 'resume' ? 'Resume' : 'Job Description'} uploaded successfully!`);
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Error uploading file. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const hasResume = !!setup.resumeText;
    const hasJD = !!setup.jobDescription;

    return (
        <div className="h-full w-full flex flex-col">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.docx"
                onChange={(e) => handleFileChange(e, 'resume')}
            />
            <input
                type="file"
                ref={jdFileInputRef}
                className="hidden"
                accept=".pdf,.docx"
                onChange={(e) => handleFileChange(e, 'jd')}
            />

            <div className="flex items-center justify-between mb-6 px-2 gap-4">
                {/* Resume Tab */}
                <button
                    onClick={() => setActiveTab('resume')}
                    className={`flex-1 shadow-sm border px-4 py-2 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'resume'
                        ? hasResume
                            ? 'bg-green-50 border-green-200 text-green-700'
                            : 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                        }`}
                >
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-white ${hasResume ? 'bg-green-600' : activeTab === 'resume' ? 'bg-blue-600' : 'bg-gray-300'
                        }`}>
                        {hasResume ? "✓" : "1"}
                    </span>
                    {hasResume ? "Resume Uploaded" : "Resume"}
                </button>

                {/* JD Tab */}
                <button
                    onClick={() => setActiveTab('jd')}
                    className={`flex-1 shadow-sm border px-4 py-2 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'jd'
                        ? hasJD
                            ? 'bg-green-50 border-green-200 text-green-700'
                            : 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                        }`}
                >
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-white ${hasJD ? 'bg-green-600' : activeTab === 'jd' ? 'bg-blue-600' : 'bg-gray-300'
                        }`}>
                        {hasJD ? "✓" : "2"}
                    </span>
                    {hasJD ? "JD Added" : "Job Description"}
                </button>
            </div>

            <div className="relative flex-1 w-full rounded-[2.5rem] border-2 border-dashed border-gray-200 bg-white/60 overflow-hidden">
                <AnimatePresence mode="wait">
                    {activeTab === 'resume' ? (
                        <ResumeView
                            key="resume"
                            hasResume={hasResume}
                            isUploading={isUploading}
                            onUpload={() => fileInputRef.current?.click()}
                        />
                    ) : (
                        <JobDescriptionView
                            key="jd"
                            jdText={setup.jobDescription}
                            isUploading={isUploading}
                            onUpload={() => jdFileInputRef.current?.click()}
                            onTextChange={(text) => setSetup(prev => ({ ...prev, jobDescription: text }))}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function ResumeView({ hasResume, isUploading, onUpload }: { hasResume: boolean, isUploading: boolean, onUpload: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-colors ${hasResume ? 'bg-green-50/50' : 'hover:bg-blue-50/30'
                }`}
        >
            {!hasResume && (
                <>
                    <div className="absolute top-0 right-0 p-8 opacity-20">
                        <Sparkles className="w-24 h-24 text-blue-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 p-8 opacity-20">
                        <FileCheck2 className="w-32 h-32 text-indigo-300" />
                    </div>
                </>
            )}

            {isUploading ? (
                <div className="flex flex-col items-center">
                    <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-4" />
                    <p className="text-blue-600 font-medium">Parsing resume...</p>
                </div>
            ) : hasResume ? (
                <div className="flex flex-col items-center z-10">
                    <div className="h-24 w-24 rounded-3xl bg-green-100 flex items-center justify-center mb-6 shadow-sm">
                        <FileCheck2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Resume Ready!</h3>
                    <p className="text-gray-500 mb-6 text-sm max-w-[200px]">Successfully processed.</p>
                    <Button
                        variant="outline"
                        className="rounded-xl border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                        onClick={onUpload}
                    >
                        Replace File
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col items-center z-10">
                    <div className="h-24 w-24 rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Upload className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Resume</h3>
                    <p className="text-gray-500 mb-8 max-w-[250px]">Drag & drop or browse to personalize interview</p>
                    <Button
                        size="lg"
                        className="rounded-xl px-8 bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 font-bold shadow-sm"
                        onClick={onUpload}
                    >
                        Browse Files
                    </Button>
                </div>
            )}
        </motion.div>
    );
}

function JobDescriptionView({ jdText, isUploading, onUpload, onTextChange }: { jdText: string, isUploading: boolean, onUpload: () => void, onTextChange: (text: string) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute inset-0 flex flex-col p-6"
        >
            {isUploading ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-4" />
                    <p className="text-blue-600 font-medium">Parsing JD...</p>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-bold text-gray-700">Paste Job Description</label>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={onUpload}
                        >
                            <Upload className="w-3 h-3 mr-1.5" />
                            Upload File
                        </Button>
                    </div>

                    <textarea
                        className="flex-1 w-full bg-white/50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600 resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all placeholder:text-gray-400"
                        placeholder="Paste text here or upload a file..."
                        value={jdText || ""}
                        onChange={(e) => onTextChange(e.target.value)}
                    />

                    {/* Footer / Status */}
                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                        <div className={`w-2 h-2 rounded-full ${jdText ? 'bg-green-500' : 'bg-gray-300'}`} />
                        {jdText ? "JD content ready" : "Optional"}
                    </div>
                </>
            )}
        </motion.div>
    );
}
