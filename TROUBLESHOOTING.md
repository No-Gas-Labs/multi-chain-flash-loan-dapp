# Troubleshooting Guide for Multi-Chain Flash Loan DApp

This guide addresses common issues you might encounter when setting up, developing, or deploying the Multi-Chain Flash Loan DApp.

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [Dependency Conflicts](#dependency-conflicts)
3. [Blockchain Connection Issues](#blockchain-connection-issues)
4. [Smart Contract Deployment Issues](#smart-contract-deployment-issues)
5. [Frontend Issues](#frontend-issues)
6. [Backend Issues](#backend-issues)
7. [Cross-Chain Orchestration Issues](#cross-chain-orchestration-issues)

## Installation Issues

### Node.js Version Compatibility

**Issue**: Installation fails due to Node.js version incompatibility.

**Solution**:
- Ensure you're using Node.js v16 or higher
- Use nvm to manage multiple Node.js versions:
  ```bash
  nvm install 16
  nvm use 16
  ```

### Global Package Installation Failures

**Issue**: Unable to install global packages.

**Solution**:
- Try using sudo (on Linux/macOS):
  ```bash
  sudo npm install -g @expo/cli
  ```
- Or fix npm permissions:
  ```bash
  mkdir ~/.npm-global
  npm config set prefix '~/.npm-global'
  export PATH=~/.npm-global/bin:$PATH
  ```

## Dependency Conflicts

### Package Resolution Issues

**Issue**: Dependency conflicts between packages.

**Solution**:
- Use the recommended installation flags:
  ```bash
  npm install --legacy-peer-deps --force
  ```
- If issues persist, try clearing the cache:
  ```bash
  npm cache clean --force
  ```

### Specific Package Issues

**Issue**: Issues with specific packages like `@scallop-io/sui-kit` or `@tonconnect/ui-react`.

**Solution**:
- Check for updated versions:
  ```bash
  npm view @scallop-io/sui-kit versions
  npm view @tonconnect/ui-react versions
  ```
- Install specific versions if needed:
  ```bash
  npm install @scallop-io/sui-kit@1.4.2 --save --legacy-peer-deps
  ```

## Blockchain Connection Issues

### TON Network Connection

**Issue**: Unable to connect to TON network.

**Solution**:
- Verify your API key in `contracts/ton/config/testnet.json`
- Check if the TON testnet is operational
- Try an alternative endpoint:
  ```json
  {
    "network": "testnet",
    "endpoint": "https://testnet.toncenter.com/api/v2/jsonRPC",
    "apiKey": "YOUR_TON_API_KEY"
  }
  ```

### SUI Network Connection

**Issue**: Unable to connect to SUI network.

**Solution**:
- Check if the SUI testnet is operational
- Try an alternative endpoint:
  ```json
  {
    "network": "testnet",
    "endpoint": "https://fullnode.testnet.sui.io:443",
    "faucet": "https://faucet.testnet.sui.io/gas"
  }
  ```

### EOS Network Connection

**Issue**: Unable to connect to EOS network.

**Solution**:
- Check if the Jungle testnet is operational
- Try an alternative endpoint:
  ```json
  {
    "network": "jungle",
    "endpoint": "https://jungle3.cryptolions.io:443",
    "chainId": "2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840"
  }
  ```

## Smart Contract Deployment Issues

### TON Contract Deployment Failures

**Issue**: Unable to deploy TON contracts.

**Solution**:
- Ensure you have sufficient test TON for gas fees
- Verify your contract code compiles correctly:
  ```bash
  cd contracts/ton
  func -o output.fif FlashLoan.fc
  ```
- Check deployment logs for specific errors:
  ```bash
  npm run deploy:ton -- --verbose
  ```

### SUI Contract Deployment Failures

**Issue**: Unable to deploy SUI contracts.

**Solution**:
- Ensure you have sufficient test SUI for gas fees
- Verify your contract compiles correctly:
  ```bash
  cd contracts/sui
  sui move build
  ```
- Check for specific error messages:
  ```bash
  npm run deploy:sui -- --verbose
  ```

### EOS Contract Deployment Failures

**Issue**: Unable to deploy EOS contracts.

**Solution**:
- Ensure you have sufficient test EOS for resources
- Verify your contract compiles correctly:
  ```bash
  cd contracts/eos
  eosio-cpp -o flashloan.wasm flashloan.cpp
  ```
- Check for specific error messages:
  ```bash
  npm run deploy:eos -- --verbose
  ```

## Frontend Issues

### Expo Build Failures

**Issue**: Expo build fails.

**Solution**:
- Clear Expo cache:
  ```bash
  expo r -c
  ```
- Check for TypeScript errors:
  ```bash
  cd frontend
  npx tsc --noEmit
  ```
- Verify dependencies are correctly installed:
  ```bash
  cd frontend
  npm install --legacy-peer-deps
  ```

### Wallet Connection Issues

**Issue**: Unable to connect to wallets.

**Solution**:
- For TON wallet issues:
  - Verify `@tonconnect/ui-react` is correctly configured
  - Check manifest URL is accessible
  
- For SUI wallet issues:
  - Verify `@scallop-io/sui-kit` is correctly configured
  - Check network configuration

- For EOS wallet issues:
  - Verify `@greymass/eosio` is correctly configured
  - Check network configuration

## Backend Issues

### Server Start Failures

**Issue**: Backend server fails to start.

**Solution**:
- Check for TypeScript compilation errors:
  ```bash
  cd backend
  npx tsc --noEmit
  ```
- Verify environment variables are set correctly:
  ```bash
  cat backend/.env
  ```
- Check for port conflicts:
  ```bash
  lsof -i :3001
  ```

### Database Connection Issues

**Issue**: Unable to connect to MongoDB or Redis.

**Solution**:
- Verify MongoDB is running:
  ```bash
  mongod --version
  ```
- Verify Redis is running:
  ```bash
  redis-cli ping
  ```
- Check connection strings in environment variables

## Cross-Chain Orchestration Issues

### Arbitrage Execution Failures

**Issue**: Cross-chain arbitrage fails to execute.

**Solution**:
- Check blockchain connection status for all three chains
- Verify smart contracts are deployed correctly
- Check gas/resource availability on all chains
- Review orchestration service logs:
  ```bash
  cd backend
  npm run dev -- --verbose
  ```

### Optimization Service Issues

**Issue**: AI optimization service not finding opportunities.

**Solution**:
- Verify price feed connections
- Check optimization parameters in configuration
- Review service logs for specific errors:
  ```bash
  cd backend
  tail -f logs/optimization.log
  ```

## Additional Resources

If you encounter issues not covered in this guide:

1. Check the [GitHub Issues](https://github.com/No-Gas-Labs/multi-chain-flash-loan-dapp/issues) for similar problems
2. Review the [Developer Guide](docs/developer/guide.md) for more information
3. Consult the documentation for specific components:
   - [TON Documentation](https://docs.ton.org/)
   - [EOS Documentation](https://developers.eos.io/)
   - [SUI Documentation](https://docs.sui.io/)
   - [React Native Documentation](https://reactnative.dev/docs/getting-started)
   - [Expo Documentation](https://docs.expo.dev/)