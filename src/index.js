import express from 'express';
import { config } from 'dotenv';
import { appraisalRouter } from './routes/appraisal.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { createRateLimiter } from './utils/rateLimit.js';
import { securityMiddleware } from './middleware/security.js';
import logger from './utils/logger.js';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(securityMiddleware);

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(createRateLimiter());
app.use(express.static('public'));

// Routes
app.use('/api/appraisal', appraisalRouter);

// Error handling
app.use(errorHandler);

// Handle unhandled routes
app.all('*', (req, res) => {
  logger.warn(`Route not found: ${req.originalUrl}`);
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`
  });
});

// Start server
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Process terminated!');
  });
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...', {
    error: err.name,
    message: err.message,
    stack: err.stack
  });
  server.close(() => {
    process.exit(1);
  });
});