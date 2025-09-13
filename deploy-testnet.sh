#!/bin/bash
echo "🚀 Deploying Multi-Chain Flash Loan DApp"

# Deploy TON contracts
echo "📱 Deploying TON contracts..."
cd contracts/ton && npm run deploy:testnet

# Deploy EOS contracts  
echo "🪐 Deploying EOS contracts..."
cd ../eos && npm run deploy:testnet

# Deploy SUI contracts
echo "⚡ Deploying SUI contracts..."
cd ../sui && npm run deploy:testnet

echo "✅ All contracts deployed successfully!"
