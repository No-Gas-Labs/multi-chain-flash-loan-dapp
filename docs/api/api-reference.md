# API Reference - Δ15 Cross-Module Documentation

## Base URL
```
https://api.flash-loan-dapp.com/v1
```

## Authentication
All API endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Delta Tracking
All responses include delta headers for iteration tracking:
```
X-Delta-Version: Δ15
X-Iteration-ID: <unique_iteration_id>
```

## Endpoints

### 1. Flash Loan Operations

#### POST /flash-loan/simulate
Simulate a flash loan operation across multiple chains.

**Request Body:**
```json
{
  "amount": "1000000000000",
  "chains": ["TON", "EOS", "SUI"],
  "pools": ["pool_ton_1", "pool_eos_1", "pool_sui_1"],
  "delta": "Δ15 Simulation"
}
```

**Response:**
```json
{
  "delta": "Δ15 Simulation Result",
  "route_id": "route_1234567890",
  "expected_profit": 15.5,
  "total_gas_cost": 2.3,
  "risk_level": "low",
  "steps": [
    {
      "chain": "TON",
      "action": "borrow",
      "amount": "1000000000000",
      "pool_address": "pool_ton_1",
      "expected_rate": 1.0
    }
  ],
  "confidence": 0.85
}
```

#### POST /flash-loan/execute
Execute a flash loan operation.

**Request Body:**
```json
{
  "route_id": "route_1234567890",
  "user_address": "user_address_123",
  "signature": "signature_123",
  "delta": "Δ15 Execution"
}
```

**Response:**
```json
{
  "delta": "Δ15 Execution Result",
  "transaction_id": "tx_1234567890",
  "status": "pending",
  "estimated_completion": "2024-12-19T20:00:00Z",
  "tracking_url": "https://track.flash-loan-dapp.com/tx_1234567890"
}
```

### 2. Pool Management

#### GET /pools
Get available pools across all chains.

**Query Parameters:**
- `chain`: Filter by chain (TON, EOS, SUI)
- `token`: Filter by token
- `delta`: Include delta tracking

**Response:**
```json
{
  "delta": "Δ15 Pool List",
  "pools": [
    {
      "id": "pool_ton_1",
      "chain": "TON",
      "token": "TON",
      "tvl": "5000000000000",
      "apy": 0.08,
      "available_liquidity": "4000000000000"
    }
  ],
  "total": 15
}
```

#### GET /pools/:id
Get specific pool details.

**Response:**
```json
{
  "delta": "Δ15 Pool Details",
  "pool": {
    "id": "pool_ton_1",
    "chain": "TON",
    "address": "EQ...",
    "tvl": "5000000000000",
    "apy": 0.08,
    "available_liquidity": "4000000000000",
    "total_borrowed": "1000000000000",
    "fees": {
      "borrow": 0.001,
      "repay": 0.001
    }
  }
}
```

### 3. Wallet Operations

#### POST /wallet/connect
Connect a wallet.

**Request Body:**
```json
{
  "chain": "TON",
  "wallet_type": "tonconnect",
  "delta": "Δ15 Wallet Connect"
}
```

**Response:**
```json
{
  "delta": "Δ15 Wallet Connected",
  "address": "EQ...",
  "balance": "1000000000000",
  "tokens": [
    {
      "symbol": "TON",
      "balance": "1000000000000"
    }
  ]
}
```

#### GET /wallet/balance/:address
Get wallet balance across all chains.

**Response:**
```json
{
  "delta": "Δ15 Wallet Balance",
  "balances": {
    "TON": "1000000000000",
    "EOS": "5000000000",
    "SUI": "7500000000"
  },
  "total_usd": 2500.50
}
```

### 4. Monitoring & Analytics

#### GET /analytics/overview
Get system analytics.

**Response:**
```json
{
  "delta": "Δ15 Analytics Overview",
  "total_loans": 127,
  "total_profit": "15200.50",
  "success_rate": 0.95,
  "average_gas_cost": "2.3",
  "chains": {
    "TON": { "count": 45, "profit": "5500.20" },
    "EOS": { "count": 42, "profit": "4800.30" },
    "SUI": { "count": 40, "profit": "4900.00" }
  }
}
```

#### GET /monitoring/alerts
Get current alerts and opportunities.

**Response:**
```json
{
  "delta": "Δ15 Monitoring Alerts",
  "alerts": [
    {
      "type": "opportunity",
      "chains": ["TON", "EOS", "SUI"],
      "expected_profit": 25.3,
      "urgency": "high",
      "expires_at": "2024-12-19T20:30:00Z"
    }
  ]
}
```

### 5. Security & Validation

#### POST /security/validate
Validate transaction parameters.

**Request Body:**
```json
{
  "amount": "1000000000000",
  "chains": ["TON", "EOS", "SUI"],
  "delta": "Δ15 Security Validation"
}
```

**Response:**
```json
{
  "delta": "Δ15 Security Validation Result",
  "is_valid": true,
  "warnings": [],
  "estimated_risk": "low",
  "security_score": 95
}
```

#### POST /security/scan
Scan for vulnerabilities.

**Request Body:**
```json
{
  "contract_address": "EQ...",
  "chain": "TON",
  "delta": "Δ15 Security Scan"
}
```

**Response:**
```json
{
  "delta": "Δ15 Security Scan Result",
  "vulnerabilities": [],
  "security_score": 100,
  "recommendations": []
}
```

### 6. AI Integration (Δ15)

#### POST /ai/optimize
Optimize route using AI.

**Request Body:**
```json
{
  "amount": "1000000000000",
  "chains": ["TON", "EOS", "SUI"],
  "preferences": {
    "risk_tolerance": "medium",
    "gas_preference": "normal"
  },
  "delta": "Δ15 AI Optimization"
}
```

**Response:**
```json
{
  "delta": "Δ15 AI Optimization Result",
  "optimized_route": {
    "expected_profit": 18.7,
    "confidence": 0.92,
    "suggested_adjustments": ["lower_gas", "different_pool"],
    "ai_reasoning": "Based on current market conditions..."
  }
}
```

### 7. Delta Tracking

#### GET /delta/status
Get current delta status.

**Response:**
```json
{
  "delta": "Δ15 Status",
  "current_iteration": 15,
  "total_iterations": 18,
  "components": {
    "frontend": "Δ15 Complete",
    "backend": "Δ15 Complete",
    "contracts": "Δ15 Complete",
    "tests": "Δ15 Complete"
  },
  "on_chain_hash": "0x1234567890abcdef"
}
```

### 8. Error Handling

#### Error Response Format
```json
{
  "error": {
    "code": "INVALID_AMOUNT",
    "message": "Amount exceeds maximum limit",
    "delta": "Δ15 Error",
    "details": {
      "max_amount": "1000000000000",
      "provided_amount": "1500000000000"
    }
  }
}
```

### Rate Limits
- 100 requests per 15 minutes per IP
- 1000 requests per day per API key
- Burst limit: 10 requests per second

### Delta Headers
All responses include:
```
X-Delta-Version: Δ15
X-Request-ID: <unique_request_id>
X-Processing-Time: <ms>
X-Cache-Status: <hit/miss>
```

### Webhooks
Register for real-time updates:
```
POST /webhooks/register
{
  "url": "https://your-app.com/webhook",
  "events": ["loan_completed", "opportunity_detected"],
  "delta": "Δ15 Webhook"
}
```