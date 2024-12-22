const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the client with your API key
const genAI = new GoogleGenerativeAI({
  apiKey: 'AIzaSyCkhZdfemYkpukVbvztC5ogWL3rfdtmATU', // Replace with your actual API key
});

async function generateSummary(text) {
  try {
    // Use the correct method for text generation
    const response = await genAI.generateText({
      model: 'models/text-bison-001-summarization', // Adjust the model name as needed
      prompt: `Summarize the following text: ${text}`,
    });

    // Extract the response text
    if (response && response.candidates && response.candidates.length > 0) {
      return response.candidates[0].output;
    } else {
      throw new Error('No candidates returned in the response.');
    }
  } catch (error) {
    console.error('Error generating summary:', error.message);
    // Handle specific error types (e.g., API rate limits, invalid API key)
    if (error.code === 429) {
      console.error('API rate limit exceeded. Please retry later.');
    }
    return null;
  }
}

// Example usage
generateSummary('Fictional Excerpt:"The old woman sat on the park bench, her gaze fixed on the pigeons pecking at crumbs. A melancholic sigh escaped her lips as she remembered the life she once had, filled with laughter and love. Now, she was alone, her memories her only companions. The city noises faded into a distant hum, and she drifted off, lost in a sea of forgotten dreams.').then((summary) => {
  console.log('Generated Summary:', summary);
});

module.exports = { generateSummary };