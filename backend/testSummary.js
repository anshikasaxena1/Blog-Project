const { generateSummary } = require('../backend/utils/summaryGen');

const content = "Artificial intelligence is transforming industries globally by enhancing efficiency and innovation From healthcare to transportation, AI is driving significant advancements. For instance, machine learning algorithms are being used to detect diseases earlier than ever before, while autonomous vehicles are reshaping the way we think about mobility.";
generateSummary(content).then(summary => {
  console.log('Generated Summary:', summary);
  
}).catch(err => {
  console.error('Error:', err);
});










