#!/usr/bin/env node
// Δ9 Delta Versioning System - Programmatic Iteration Tracking

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class DeltaVersioningSystem {
  constructor() {
    this.deltaPath = path.join(__dirname, '..', '.delta_cache');
    this.ensureDeltaDir();
  }

  ensureDeltaDir() {
    if (!fs.existsSync(this.deltaPath)) {
      fs.mkdirSync(this.deltaPath, { recursive: true });
    }
  }

  // Δ9 Delta tracking with on-chain hash proof
  trackDelta(deltaNumber, component, changes) {
    const timestamp = new Date().toISOString();
    const deltaHash = this.generateDeltaHash(deltaNumber, component, changes, timestamp);
    
    const deltaRecord = {
      delta: `Δ${deltaNumber}`,
      component,
      timestamp,
      changes,
      hash: deltaHash,
      gitCommit: this.getGitCommit(),
      fileChecksums: this.getFileChecksums(component)
    };

    const filename = `delta_${deltaNumber}_${component}_${timestamp.replace(/:/g, '-')}.json`;
    fs.writeFileSync(path.join(this.deltaPath, filename), JSON.stringify(deltaRecord, null, 2));

    console.log(`Δ${deltaNumber} tracked for ${component}: ${deltaHash}`);
    return deltaHash;
  }

  generateDeltaHash(deltaNumber, component, changes, timestamp) {
    const data = `${deltaNumber}${component}${JSON.stringify(changes)}${timestamp}`;
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  getGitCommit() {
    try {
      const { execSync } = require('child_process');
      return execSync('git rev-parse HEAD').toString().trim();
    } catch {
      return 'development';
    }
  }

  getFileChecksums(component) {
    const componentPath = path.join(__dirname, '..', component);
    if (!fs.existsSync(componentPath)) return {};

    const checksums = {};
    this.walkDir(componentPath, (filePath) => {
      const content = fs.readFileSync(filePath);
      const hash = crypto.createHash('sha256').update(content).digest('hex');
      checksums[filePath] = hash;
    });

    return checksums;
  }

  walkDir(dir, callback) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.walkDir(filePath, callback);
      } else {
        callback(filePath);
      }
    }
  }

  // Δ9 Iteration validation
  validateIteration(deltaNumber, component) {
    const pattern = `delta_${deltaNumber}_${component}_*.json`;
    const files = fs.readdirSync(this.deltaPath).filter(f => f.startsWith(`delta_${deltaNumber}_${component}`));
    
    if (files.length === 0) {
      throw new Error(`Δ${deltaNumber} validation failed: no records found for ${component}`);
    }

    const latest = JSON.parse(fs.readFileSync(path.join(this.deltaPath, files[files.length - 1])));
    
    // Validate checksums
    const currentChecksums = this.getFileChecksums(component);
    const storedChecksums = latest.fileChecksums;
    
    const mismatched = Object.keys(currentChecksums).filter(key => 
      currentChecksums[key] !== storedChecksums[key]
    );

    if (mismatched.length > 0) {
      console.warn(`Δ${deltaNumber} validation: ${mismatched.length} files changed`);
    }

    return {
      valid: mismatched.length === 0,
      mismatchedFiles: mismatched,
      deltaHash: latest.hash
    };
  }

  // Δ9 On-chain proof generation
  generateOnChainProof(deltaNumber, component) {
    const record = this.getLatestDeltaRecord(deltaNumber, component);
    if (!record) return null;

    return {
      delta: record.delta,
      component: record.component,
      hash: record.hash,
      timestamp: record.timestamp,
      proof: this.createMerkleProof(record)
    };
  }

  createMerkleProof(record) {
    const leaves = [
      record.delta,
      record.component,
      record.hash,
      record.timestamp
    ];
    
    const tree = crypto.createHash('sha256');
    leaves.forEach(leaf => tree.update(leaf));
    
    return tree.digest('hex');
  }

  getLatestDeltaRecord(deltaNumber, component) {
    const files = fs.readdirSync(this.deltaPath)
      .filter(f => f.startsWith(`delta_${deltaNumber}_${component}`))
      .sort()
      .reverse();
    
    if (files.length === 0) return null;
    
    return JSON.parse(fs.readFileSync(path.join(this.deltaPath, files[0])));
  }
}

// CLI Interface
if (require.main === module) {
  const tracker = new DeltaVersioningSystem();
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: node delta-tracker.js <delta-number> <component>');
    process.exit(1);
  }

  const deltaNumber = parseInt(args[0]);
  const component = args[1];
  
  if (args[2] === 'validate') {
    const validation = tracker.validateIteration(deltaNumber, component);
    console.log(JSON.stringify(validation, null, 2));
  } else if (args[2] === 'proof') {
    const proof = tracker.generateOnChainProof(deltaNumber, component);
    console.log(JSON.stringify(proof, null, 2));
  } else {
    const changes = args[2] || 'standard implementation';
    tracker.trackDelta(deltaNumber, component, changes);
  }
}

module.exports = DeltaVersioningSystem;