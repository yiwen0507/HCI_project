const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const port = 5500;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'combi')));
app.use(express.json());

// Serve the main.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'combi', 'main.html'));
});

// Handle POST request to write data to CSV
app.post('/writeData', async (req, res) => {
  const { data } = req.body;

  // CSV header
  const csvHeader = 'review_id,course_name,prof_name,year_taken,review_box,scoring_star,workload_star,recommend_star,user\n';

  // Convert data to CSV format
  const csvContent = data.map(entry => `${entry.review_id},${entry.course_name},${entry.prof_name},${entry.year_taken},"${entry.review_box}",${entry.scoring_star},${entry.workload_star},${entry.recommend_star},${entry.user}`).join('\n');

  // Write to CSV file (replace with your actual CSV file path)
  const csvFilePath = path.join(__dirname, 'combi', 'review_sheet.csv');
  try {
    await fs.writeFile(csvFilePath, csvHeader + csvContent);
    // res.json({ success: true });
  } catch (error) {
    console.error('Error writing to CSV:', error);
    // res.status(500).json({ success: false, error: 'Error writing to CSV' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
