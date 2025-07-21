const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || ["http://localhost:5173"],
    methods: ["GET", "POST"]
  }
});

// Import routes
const authRoutes = require('./src/routes/auth');
const modelRoutes = require('./src/routes/models');
const chatRoutes = require('./src/routes/chats');
const apiKeyRoutes = require('./src/routes/apiKeys');
const knowledgeRoutes = require('./src/routes/knowledge');
const analyticsRoutes = require('./src/routes/analytics');

// Import middleware
const authMiddleware = require('./src/middleware/auth');
const logger = require('./src/utils/logger');

// Import socket handlers
const chatSocket = require('./src/socket/chatSocket');

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ["http://localhost:5173"],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/models', authMiddleware, modelRoutes);
app.use('/api/chats', authMiddleware, chatRoutes);
app.use('/api/api-keys', authMiddleware, apiKeyRoutes);
app.use('/api/knowledge', authMiddleware, knowledgeRoutes);
app.use('/api/analytics', authMiddleware, analyticsRoutes);

// Socket.io connection handling
chatSocket(io);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3001;

// Import database and initialize connection
const database = require('./src/utils/database');

// Initialize database connection on startup
database.connect().then(() => {
  server.listen(PORT, () => {
    logger.info(`🚀 AI Agent Dashboard Server running on port ${PORT}`);
    logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.info(`🔗 Socket.io enabled for real-time chat`);
    logger.info(`📊 Database connected and initialized`);
  });
}).catch((error) => {
  logger.error('Failed to connect to database:', error);
  process.exit(1);
});

module.exports = { app, server, io };