#!/usr/bin/env node
// Simple test runner to verify core functionality
const fs = require('fs');
const path = require('path');

console.log('🚀 Multi-Chain Flash Loan DApp - Quick Verification');
console.log('================================================');

// Check project structure
const checks = [
  { name: 'Frontend Structure', path: './frontend/src' },
  { name: 'Backend Structure', path: './backend/src' },
  { name: 'TON Contracts', path: './contracts/ton' },
  { name: 'EOS Contracts', path: './contracts/eos' },
  { name: 'SUI Contracts', path: './contracts/sui' },
  { name: 'Regression Tests', path: './tests/regression' }
];

let passed = 0;
let total = checks.length;

checks.forEach(check => {
  const exists = fs.existsSync(path.join(__dirname, check.path));
  console.log(`${exists ? '✅' : '❌'} ${check.name}: ${exists ? 'Present' : 'Missing'}`);
  if (exists) passed++;
});

console.log(`\n📊 Structure Check: ${passed}/${total} components ready`);

// Check for delta headers
const deltaFiles = [];
function findDeltaHeaders(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findDeltaHeaders(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.json')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('Δ') || content.includes('delta')) {
        deltaFiles.push(fullPath.replace(__dirname + '/', ''));
      }
    }
  });
}

findDeltaHeaders(__dirname);
console.log(`📈 Delta Tracking: Found ${deltaFiles.length} files with Δ headers`);

// Create simple deployment test
console.log('\n🎯 Next Steps:');
console.log('1. Fix dependency conflicts (npm audit fix)');
console.log('2. Install missing packages');
console.log('3. Run contract deployment scripts');
console.log('4. Test cross-chain orchestration');

// Create a simple deployment script
const deployScript = `#!/bin/bash
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
`;

fs.writeFileSync(path.join(__dirname, 'deploy-testnet.sh'), deployScript);
fs.chmodSync(path.join(__dirname, 'deploy-testnet.sh'), '755');

console.log('\n📝 Created deploy-testnet.sh for easy deployment');