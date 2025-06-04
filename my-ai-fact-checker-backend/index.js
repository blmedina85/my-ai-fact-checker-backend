const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Example endpoint that relays to local Langflow/Ollama stack
app.post('/api/ask', async (req, res) => {
  try {
    const { question } = req.body;
    const response = await axios.post('http://localhost:7860/ask', { question }); // Replace with your local Langflow endpoint
    res.json({ success: true, answer: response.data });
  } catch (error) {
    console.error('[Proxy Error]', error.message);
    res.status(500).json({ success: false, error: 'Failed to contact local AI engine' });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Proxy server running on port ${PORT}`);
});
