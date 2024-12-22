const axios = require('axios');
require('dotenv').config();

console.log(process.env.TEXTRAZOR_API_KEY);
// Function to generate summary using TextRazor API
const generateSummary = async (content) => {
  try {
    const response = await axios.post(
      'https://api.textrazor.com',
      {
        text: content,  // Text you want to summarize
        'extractors': 'entities,topics',  // Requesting for summary along with entities and topics
      },
      {
        headers: {
          'x-textrazor-key': process.env.TEXTRAZOR_API_KEY , // Use your TextRazor API key
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log('TextRazor Response:', response.data); 
    // Check if the response has summary data
    if (response.data.response && response.data.response.summaries) {
      return response.data.response.summaries[0].summary.trim(); // Return the first summary from the response
    } else {
      throw new Error('No summary returned from TextRazor');
    }
  } catch (err) {
    console.error('Error generating summary:', err.response ? err.response.data : err.message);
    return 'Summary could not be generated';
  }
};

module.exports = { generateSummary };
