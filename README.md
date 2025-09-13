# Multi-Chain Flash Loan DApp

## Project Overview
Production-ready mobile-first multi-chain flash loan DApp enabling TON → EOS → SUI cross-chain arbitrage with flash loan orchestration. This project is architecturally complete with all delta tracking (Δ1–Δ18) integrated.

## Architecture Overview
- **Frontend**: React Native/Expo mobile app
- **Backend**: Node.js orchestrator with multi-chain routing and AI optimization
- **Smart Contracts**: 
  - TON: FunC smart contracts
  - EOS: C++ smart contracts
  - SUI: Move smart contracts
- **Testing**: Comprehensive test suite across all components

## Features
- Cross-chain arbitrage between TON, EOS, and SUI blockchains
- Flash loan capabilities for efficient capital utilization
- AI-powered optimization for finding the best arbitrage opportunities
- Mobile-first design with React Native/Expo
- Comprehensive security features
- Complete testing framework

## Project Structure
- `/frontend`: React Native/Expo mobile app
- `/backend`: Node.js orchestrator with multi-chain routing
- `/contracts`: Smart contracts for all three chains
  - `/contracts/ton`: TON FunC contracts
  - `/contracts/eos`: EOS C++ contracts
  - `/contracts/sui`: SUI Move contracts
- `/tests`: Comprehensive test suite
- `/scripts`: Utility scripts for deployment and management
- `/docs`: Project documentation

## Quick Start
```bash
# Clone the repository
git clone https://github.com/No-Gas-Labs/multi-chain-flash-loan-dapp.git
cd multi-chain-flash-loan-dapp

# Install dependencies
npm install --legacy-peer-deps --force

# Install global packages
npm install -g @expo/cli
npm install -g @sui/cli
npm install -g @ton/cli

# Deploy contracts to testnet
npm run deploy:testnet

# Start development environment
npm run dev
```

## Deployment
Use the provided deployment script to deploy all contracts to their respective testnets:
```bash
./deploy-testnet.sh
```

## Testing
Run the comprehensive test suite:
```bash
npm run test
```

## Security Notice
⚠️ **Testnet Only**: This project is for educational purposes. Never deploy to mainnet without comprehensive audits.

## Delta Headers Implementation
All files contain embedded delta headers (Δ1–Δ18) for iterative improvement tracking.

## License
See the [LICENSE](LICENSE) file for details.