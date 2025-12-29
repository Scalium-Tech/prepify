import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
        console.error("CRITICAL: NEXT_PUBLIC_GEMINI_API_KEY is not defined in environment variables.");
        return NextResponse.json(
            { error: "Configuration Error: API Key missing. Please check .env file." },
            { status: 500 }
        );
    }

    try {
        const body = await req.json();
        const { resumeText, category, difficulty, questionCount, jobDescription } = body;

        console.log("Generate Questions Request:", {
            hasResume: !!resumeText,
            hasJD: !!jobDescription,
            category,
            difficulty,
            count: questionCount
        });

        if (!resumeText && !jobDescription) {
            console.error("Validation Failed: Missing both Resume and JD");
            return NextResponse.json(
                { error: "Resume text or Job Description is required" },
                { status: 400 }
            );
        }

        // User requested "2.5 flash", mapping to "gemini-2.0-flash-exp"
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        console.log("Using Gemini Model: gemini-2.0-flash-exp");

        // Category-specific guidance
        const categoryGuidance: Record<string, string> = {
            "hr": "Focus on HR topics: company culture fit, salary expectations, career goals, work-life balance, team dynamics, and general suitability for the role.",
            "behavioral": "Use the STAR method (Situation, Task, Action, Result). Ask about past experiences, conflict resolution, teamwork, leadership moments, and problem-solving situations.",
            "technical": "Focus on technical skills, programming concepts, system design, algorithms, data structures, debugging scenarios, and technical problem-solving relevant to the candidate's tech stack.",
            "skill-based": "Assess specific job-related skills mentioned in the resume. Ask practical questions about tools, methodologies, and hands-on experience with technologies or frameworks.",
            "educational": "Focus on academic background, coursework, research projects, academic achievements, favorite subjects, learning approach, and how education prepared them for this role.",
            "communication": "Assess verbal and written communication skills, presentation abilities, explaining complex topics simply, active listening, and interpersonal skills.",
            "project": "Deep dive into projects mentioned in resume. Ask about project scope, role, challenges faced, technologies used, outcomes achieved, and lessons learned.",
            "managerial": "Focus on leadership style, team management, decision-making, delegation, mentoring, performance management, strategic thinking, and handling difficult team situations.",
            "stress": "Ask rapid-fire questions requiring quick thinking. Include hypothetical scenarios, time-pressure situations, and questions that test composure under stress.",
            "other": "Focus on extracurricular activities, hobbies, personal achievements, volunteer work, interests outside work, what drives and motivates them, and unique aspects of their personality."
        };

        const specificGuidance = categoryGuidance[category] || categoryGuidance["hr"];

        const prompt = `
      You are an expert interviewer. Generate exactly ${questionCount} interview questions for a candidate.
      
      Details:
      - Interview Category: ${category}
      - Difficulty Level: ${difficulty}
      - Resume Context: ${resumeText ? resumeText.substring(0, 3000) : "Not provided"}
      - Job Description: ${jobDescription ? jobDescription.substring(0, 1000) : "Not provided"}

      Category-Specific Focus:
      ${specificGuidance}

      STRICT RULES:
      1. The FIRST question MUST ALWAYS be exactly: "Please introduce yourself."
      2. Questions 2 onwards should be directly relevant to the "${category}" category using the guidance above.
      3. Tailor questions to the candidate's resume when available.
      4. Match the ${difficulty} difficulty level (easy = straightforward, medium = requires thought, hard = challenging/in-depth).
      5. Return ONLY a raw JSON array of strings. No markdown, no explanation.
      
      Example output format:
      ["Please introduce yourself.", "Question 2 here...", "Question 3 here..."]
    `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Clean up markdown if present
        const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

        const questions = JSON.parse(cleanedText);

        return NextResponse.json({ questions });
    } catch (error: any) {
        console.error("Error generating questions:", error);

        // Check for specific Gemini errors
        if (error.message?.includes("API key not found")) {
            return NextResponse.json(
                { error: "Server Configuration Error: Gemini API Key is missing." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: error.message || "Failed to generate questions" },
            { status: 500 }
        );
    }
}
