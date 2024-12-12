import { rateLimit } from 'express-rate-limit';
import { API_RATE_LIMITS } from '../config/constants.js';
import logger from './logger.js';

export const createRateLimiter = (options = {}) => rateLimit({
  windowMs: API_RATE_LIMITS.WINDOW_MS,
  max: API_RATE_LIMITS.MAX_REQUESTS,
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      status: 'error',
      message: 'Too many requests, please try again later.'
    });
  },
  ...options
});