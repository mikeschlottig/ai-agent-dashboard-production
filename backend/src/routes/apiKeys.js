const express = require('express');
const router = express.Router();
const database = require('../utils/database');

// Get user's API keys (masked)
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const apiKeys = await database.all(
      'SELECT id, provider, key_name, is_active, created_at FROM api_keys WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    res.json({ apiKeys });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch API keys' });
  }
});

module.exports = router;