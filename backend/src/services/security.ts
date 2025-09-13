// Δ10 Security Hardening & Emergency Response System
import { logger } from '../utils/logger';
import { DeltaTracker } from '../utils/logger';
import { Request, Response, NextFunction } from 'express';

const deltaTracker = DeltaTracker.getInstance();

export class SecurityService {
  private static instance: SecurityService;
  private emergencyPause = false;
  private blacklistedAddresses = new Set<string>();
  private suspiciousActivities = new Map<string, number>();

  static getInstance(): SecurityService {
    if (!SecurityService.instance) {
      SecurityService.instance = new SecurityService();
    }
    return SecurityService.instance;
  }

  // Δ10 Emergency pause mechanism
  async triggerEmergencyPause(reason: string, initiator: string) {
    this.emergencyPause = true;
    
    deltaTracker.logDeltaProgress(10, 'Security', 'Emergency pause triggered', {
      reason,
      initiator,
      timestamp: new Date().toISOString()
    });

    logger.error('Δ10 Emergency pause activated', { reason, initiator });
    
    // Notify all connected services
    await this.broadcastEmergencyAlert(reason);
  }

  async releaseEmergencyPause(adminKey: string) {
    // Validate admin key
    if (!this.validateAdminKey(adminKey)) {
      throw new Error('Invalid admin key');
    }

    this.emergencyPause = false;
    
    deltaTracker.logDeltaProgress(10, 'Security', 'Emergency pause released', {
      adminKey: this.hashAdminKey(adminKey),
      timestamp: new Date().toISOString()
    });
  }

  // Δ10 Input validation and sanitization
  validateFlashLoanRequest(request: any): boolean {
    if (this.emergencyPause) {
      throw new Error('System in emergency pause mode');
    }

    const validation = {
      amount: this.validateAmount(request.amount),
      chains: this.validateChains(request.chains),
      pools: this.validatePools(request.pools),
      address: this.validateAddress(request.userAddress),
      timestamp: this.validateTimestamp(request.timestamp)
    };

    const isValid = Object.values(validation).every(v => v.isValid);
    
    if (!isValid) {
      this.recordSuspiciousActivity(request.userAddress, 'validation_failed');
      
      deltaTracker.logDeltaProgress(10, 'Security', 'Validation failed', {
        request,
        validation
      });
    }

    return isValid;
  }

  private validateAmount(amount: any) {
    const isValid = typeof amount === 'string' && 
                   !isNaN(parseFloat(amount)) && 
                   parseFloat(amount) > 0 && 
                   parseFloat(amount) <= 1000000000000; // 1000 TON max
    
    return { isValid, value: amount };
  }

  private validateChains(chains: any) {
    const validChains = ['TON', 'EOS', 'SUI'];
    const isValid = Array.isArray(chains) && 
                   chains.length >= 2 && 
                   chains.every(chain => validChains.includes(chain));
    
    return { isValid, value: chains };
  }

  private validatePools(pools: any) {
    const isValid = Array.isArray(pools) && 
                   pools.length >= 2 && 
                   pools.every(pool => typeof pool === 'string');
    
    return { isValid, value: pools };
  }

  private validateAddress(address: any) {
    // Basic address validation
    const isValid = typeof address === 'string' && 
                   address.length >= 32 && 
                   address.length <= 64;
    
    return { isValid, value: address };
  }

  private validateTimestamp(timestamp: any) {
    const now = Date.now();
    const requestTime = parseInt(timestamp);
    const isValid = !isNaN(requestTime) && 
                   Math.abs(now - requestTime) <= 300000; // 5 minutes
    
    return { isValid, value: timestamp };
  }

  // Δ10 Reentrancy protection
  async checkReentrancy(transactionId: string): Promise<boolean> {
    const recentTransactions = await this.getRecentTransactions(transactionId);
    const duplicateFound = recentTransactions.some(tx => 
      tx.transactionId === transactionId && 
      tx.status === 'pending'
    );

    if (duplicateFound) {
      this.recordSuspiciousActivity(transactionId, 'reentrancy_attempt');
      
      deltaTracker.logDeltaProgress(10, 'Security', 'Reentrancy detected', {
        transactionId
      });
    }

    return !duplicateFound;
  }

  // Δ10 Rate limiting per user
  async checkRateLimit(userAddress: string): Promise<boolean> {
    const currentCount = this.suspiciousActivities.get(userAddress) || 0;
    
    if (currentCount > 10) { // 10 requests per 5 minutes
      this.blacklistedAddresses.add(userAddress);
      
      deltaTracker.logDeltaProgress(10, 'Security', 'Rate limit exceeded', {
        userAddress,
        count: currentCount
      });
      
      return false;
    }

    return true;
  }

  // Δ10 Slippage protection
  calculateSlippageProtection(expectedRate: number, actualRate: number): boolean {
    const slippage = Math.abs((expectedRate - actualRate) / expectedRate);
    const maxSlippage = 0.05; // 5% max slippage
    
    const isSafe = slippage <= maxSlippage;
    
    if (!isSafe) {
      deltaTracker.logDeltaProgress(10, 'Security', 'Slippage protection triggered', {
        expectedRate,
        actualRate,
        slippage
      });
    }

    return isSafe;
  }

  // Δ10 Emergency alert system
  private async broadcastEmergencyAlert(reason: string) {
    const alert = {
      type: 'EMERGENCY_PAUSE',
      reason,
      timestamp: new Date().toISOString(),
      delta: 'Δ10 Emergency Response'
    };

    // Send to monitoring services
    logger.error('Δ10 Emergency Alert', alert);
    
    // Send to Telegram if configured
    await this.sendTelegramAlert(alert);
  }

  private async sendTelegramAlert(alert: any) {
    // Implementation for Telegram bot integration
    // This would integrate with the Δ11 Telegram bot
  }

  private validateAdminKey(key: string): boolean {
    // Implementation for admin key validation
    const expectedHash = 'sha256_hash_of_admin_key';
    return this.hashAdminKey(key) === expectedHash;
  }

  private hashAdminKey(key: string): string {
    return require('crypto').createHash('sha256').update(key).digest('hex');
  }

  private recordSuspiciousActivity(address: string, reason: string) {
    const count = this.suspiciousActivities.get(address) || 0;
    this.suspiciousActivities.set(address, count + 1);
    
    if (count + 1 > 5) {
      this.blacklistedAddresses.add(address);
    }
  }

  private async getRecentTransactions(transactionId: string): Promise<any[]> {
    // Mock implementation - replace with actual transaction history
    return [];
  }

  // Security middleware for Express
  securityMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (this.emergencyPause) {
        return res.status(503).json({
          error: 'System in emergency pause',
          delta: 'Δ10 Emergency Response'
        });
      }

      next();
    };
  }
}

// Δ10 Security middleware factory
export const createSecurityMiddleware = () => {
  const securityService = SecurityService.getInstance();
  
  return {
    validateRequest: (req: Request, res: Response, next: NextFunction) => {
      try {
        const isValid = securityService.validateFlashLoanRequest(req.body);
        
        if (!isValid) {
          return res.status(400).json({
            error: 'Invalid request parameters',
            delta: 'Δ10 Security Validation Failed'
          });
        }

        next();
      } catch (error) {
        res.status(500).json({
          error: 'Security validation error',
          delta: 'Δ10 Security Error'
        });
      }
    },

    rateLimit: async (req: Request, res: Response, next: NextFunction) => {
      const securityService = SecurityService.getInstance();
      const userAddress = req.body.userAddress || req.ip;
      
      const isAllowed = await securityService.checkRateLimit(userAddress);
      
      if (!isAllowed) {
        return res.status(429).json({
          error: 'Rate limit exceeded',
          delta: 'Δ10 Rate Limit Exceeded'
        });
      }

      next();
    }
  };
};