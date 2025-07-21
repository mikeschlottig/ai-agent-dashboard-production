const express = require('express');
const router = express.Router();
const database = require('../utils/database');

// Get all chats for user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const chats = await database.all(
      'SELECT id, title, model_used, total_tokens, total_cost, created_at, updated_at FROM chats WHERE user_id = ? ORDER BY updated_at DESC LIMIT 20',
      [userId]
    );
    res.json({ chats });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
});

// Create new chat
router.post('/', async (req, res) => {
  try {
    const { title, model } = req.body;
    const userId = req.user.id;

    const result = await database.run(
      'INSERT INTO chats (user_id, title, model_used, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [userId, title || `Chat with ${model}`, model, new Date().toISOString(), new Date().toISOString()]
    );

    const newChat = await database.get(
      'SELECT id, title, model_used, total_tokens, total_cost, created_at, updated_at FROM chats WHERE id = ?',
      [result.id]
    );

    res.status(201).json({ chat: newChat });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create chat' });
  }
});

module.exports = router;