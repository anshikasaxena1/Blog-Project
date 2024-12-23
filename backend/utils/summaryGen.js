import { GoogleGenerativeAI } from "@google/generative-ai";

async function generateSummary(content) {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyCzB_V2LWcUrA2RkH77BBltH1JqWWgiALw");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Summarize the following content:\n\n${content}`;
    const result = await model.generateContent(prompt);

    // Extract the summary text
    const summary =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!summary) {
      throw new Error("Failed to extract summary text from API response");
    }

    console.log("Extracted Summary:", summary);
    return summary; // Return the plain text summary
  } catch (error) {
    console.error("Error during summarization:", error);
    throw new Error("Error during summarization");
  }
}

export { generateSummary };
