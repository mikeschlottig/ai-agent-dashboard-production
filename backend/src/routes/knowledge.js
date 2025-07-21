const express = require('express');
const router = express.Router();
const database = require('../utils/database');

// Get user's documents
router.get('/documents', async (req, res) => {
  try {
    const userId = req.user.id;
    const documents = await database.all(
      'SELECT id, filename, original_name, file_type, file_size, uploaded_at FROM documents WHERE user_id = ? ORDER BY uploaded_at DESC',
      [userId]
    );
    res.json({ documents });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

module.exports = router;