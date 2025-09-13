# Installation Guide for Multi-Chain Flash Loan DApp

This guide will walk you through the process of setting up the Multi-Chain Flash Loan DApp for development and testing.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v8 or higher)
- Git

## Global Dependencies

Install the following global dependencies:

```bash
# Install Expo CLI for React Native development
npm install -g @expo/cli

# Install SUI CLI for SUI blockchain development
npm install -g @sui/cli

# Install TON CLI for TON blockchain development
npm install -g @ton/cli

# Install EOS development tools (optional)
npm install -g eosjs-ecc
```

## Project Setup

1. Clone the repository:

```bash
git clone https://github.com/No-Gas-Labs/multi-chain-flash-loan-dapp.git
cd multi-chain-flash-loan-dapp
```

2. Install project dependencies:

```bash
# Use legacy peer deps and force flags to resolve dependency conflicts
npm install --legacy-peer-deps --force
```

## Environment Configuration

1. Create environment files for each component:

```bash
# Backend environment
cat > backend/.env << EOL
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/flash-loan-dapp
REDIS_URL=redis://localhost:6379
TON_NETWORK=testnet
EOS_NETWORK=testnet
SUI_NETWORK=testnet
EOL

# Frontend environment
cat > frontend/.env << EOL
EXPO_PUBLIC_API_URL=http://localhost:3001
EXPO_PUBLIC_TON_NETWORK=testnet
EXPO_PUBLIC_EOS_NETWORK=testnet
EXPO_PUBLIC_SUI_NETWORK=testnet
EOL
```

2. Configure blockchain networks:

```bash
# TON configuration
mkdir -p contracts/ton/config
cat > contracts/ton/config/testnet.json << EOL
{
  "network": "testnet",
  "endpoint": "https://testnet.toncenter.com/api/v2/jsonRPC",
  "apiKey": "YOUR_TON_API_KEY"
}
EOL

# SUI configuration
mkdir -p contracts/sui/config
cat > contracts/sui/config/testnet.json << EOL
{
  "network": "testnet",
  "endpoint": "https://fullnode.testnet.sui.io:443",
  "faucet": "https://faucet.testnet.sui.io/gas"
}
EOL

# EOS configuration
mkdir -p contracts/eos/config
cat > contracts/eos/config/testnet.json << EOL
{
  "network": "jungle",
  "endpoint": "https://jungle4.cryptolions.io:443",
  "chainId": "73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d"
}
EOL
```

## Development Setup

1. Start the backend development server:

```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend development server:

```bash
cd frontend
npm start
```

## Contract Deployment

Deploy the smart contracts to their respective testnets:

```bash
# Deploy all contracts
npm run deploy:testnet

# Or deploy individual contracts
npm run deploy:ton
npm run deploy:eos
npm run deploy:sui
```

## Testing

Run the comprehensive test suite:

```bash
# Run all tests
npm run test

# Run specific test suites
npm run test:frontend
npm run test:backend
npm run test:contracts
```

## Troubleshooting

### Dependency Issues

If you encounter dependency issues, try the following:

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules
rm -rf */node_modules

# Reinstall dependencies
npm install --legacy-peer-deps --force
```

### Network Issues

If you encounter network issues with the blockchain connections:

1. Verify your API keys are correct
2. Check that the testnet endpoints are operational
3. Ensure your firewall allows connections to the testnet endpoints

### Build Issues

If you encounter build issues:

```bash
# Clean the build directories
npm run clean

# Rebuild the project
npm run build
```

## Next Steps

After successful installation, refer to the [Developer Guide](docs/developer/guide.md) for more information on developing with the Multi-Chain Flash Loan DApp.