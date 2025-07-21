const express = require('express');
const router = express.Router();

// Simple models endpoint for basic functionality
router.get('/', async (req, res) => {
  try {
    const models = [
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openai' },
      { id: 'gpt-4', name: 'GPT-4', provider: 'openai' },
      { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', provider: 'anthropic' },
      { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet', provider: 'anthropic' }
    ];
    res.json({ models });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch models' });
  }
});

router.get('/providers', async (req, res) => {
  try {
    const providers = ['openai', 'anthropic', 'google', 'openrouter'];
    res.json({ providers });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
});

router.post('/chat', async (req, res) => {
  try {
    // Simplified chat endpoint for basic functionality
    res.json({
      response: 'This is a test response. AI integration will be added in the next update.',
      tokens_used: 50,
      cost: 0.001,
      model: req.body.model || 'gpt-3.5-turbo'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

module.exports = router;