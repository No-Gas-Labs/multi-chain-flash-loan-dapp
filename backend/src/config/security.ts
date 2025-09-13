// Δ3 Security Configuration - Testnet Only
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { RateLimiterRedis } from 'rate-limiter-flexible';

export const SECURITY_CONSTANTS = {
  MAX_LOAN_AMOUNT: '1000000000000', // 1000 tokens max for testnet
  MAX_SLIPPAGE: 0.05, // 5% max slippage
  TRANSACTION_TIMEOUT: 300000, // 5 minutes
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: 100,
  DELTA_HEADER: 'Δ3 Security Framework - Testnet Only'
} as const;

// Rate limiting configuration
export const rateLimiter = rateLimit({
  windowMs: SECURITY_CONSTANTS.RATE_LIMIT_WINDOW,
  max: SECURITY_CONSTANTS.RATE_LIMIT_MAX_REQUESTS,
  message: {
    error: 'Too many requests',
    delta: 'Δ3 Rate limit exceeded',
    retryAfter: '15 minutes'
  }
});

// Input validation middleware
export const validateFlashLoanInput = (req: Request, res: Response, next: NextFunction) => {
  const { amount, chains, pools } = req.body;
  
  if (!amount || amount <= 0 || amount > SECURITY_CONSTANTS.MAX_LOAN_AMOUNT) {
    return res.status(400).json({
      error: 'Invalid loan amount',
      delta: 'Δ3 Validation failed',
      maxAmount: SECURITY_CONSTANTS.MAX_LOAN_AMOUNT
    });
  }

  if (!chains || !Array.isArray(chains) || chains.length < 2) {
    return res.status(400).json({
      error: 'Invalid chain configuration',
      delta: 'Δ3 Chain validation failed'
    });
  }

  next();
};

// Security headers
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://testnet.toncenter.com", "https://testnet.eos.io", "https://fullnode.testnet.sui.io"]
    }
  }
});