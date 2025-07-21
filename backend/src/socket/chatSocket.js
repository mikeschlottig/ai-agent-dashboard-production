const jwt = require('jsonwebtoken');
const database = require('../utils/database');
const logger = require('../utils/logger');

module.exports = (io) => {
  // Basic socket setup
  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });
};