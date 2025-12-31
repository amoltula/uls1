#!/usr/bin/env node

/**
 * Pre-flight check script
 * Validates environment and configuration before starting the application
 */

const fs = require('fs');
const path = require('path');

const ENV_MODE = process.env.NODE_ENV || 'development';
const IS_DOCKER = process.env.DOCKER_ENV === 'true';

console.log('\n🚀 Pre-flight Configuration Check\n');
console.log(`Environment: ${ENV_MODE}`);
console.log(`Docker: ${IS_DOCKER ? 'Yes' : 'No'}\n`);

// Check for required .env files
const requiredEnvFiles = ['.env'];
const optionalEnvFiles = [`.env.${ENV_MODE}`, `.env.local`, `.env.${ENV_MODE}.local`];

console.log('📁 Checking environment files:');
requiredEnvFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`  ${exists ? '✅' : '❌'} ${file} ${exists ? '(found)' : '(missing)'}`);
  if (!exists && ENV_MODE === 'production') {
    console.error(`\n❌ Error: ${file} is required for ${ENV_MODE} environment`);
    process.exit(1);
  }
});

optionalEnvFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  if (exists) {
    console.log(`  ✅ ${file} (found)`);
  }
});

// Check Docker-specific files
if (IS_DOCKER) {
  console.log('\n🐳 Docker-specific checks:');
  const dockerFiles = ['Dockerfile', 'docker-compose.yml', 'docker/nginx.conf'];
  dockerFiles.forEach(file => {
    const exists = fs.existsSync(path.join(process.cwd(), file));
    console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  });
}

// Check for critical directories
console.log('\n📂 Checking directory structure:');
const requiredDirs = ['src', 'src/config', 'public'];
requiredDirs.forEach(dir => {
  const exists = fs.existsSync(path.join(process.cwd(), dir));
  console.log(`  ${exists ? '✅' : '❌'} ${dir}`);
  if (!exists) {
    console.error(`\n❌ Error: Required directory ${dir} not found`);
    process.exit(1);
  }
});

// Check node_modules
const nodeModulesExists = fs.existsSync(path.join(process.cwd(), 'node_modules'));
if (!nodeModulesExists) {
  console.warn('\n⚠️  Warning: node_modules not found. Run npm install first.\n');
  process.exit(1);
}

// Warning for production deployment
if (ENV_MODE === 'production') {
  console.log('\n⚠️  Production Environment Warnings:');
  
  // Check for .env.example (should exist)
  if (!fs.existsSync('.env.example')) {
    console.warn('  ⚠️  .env.example not found (recommended for documentation)');
  }
  
  // Check for local env files (should NOT exist in production)
  if (fs.existsSync('.env.development')) {
    console.warn('  ⚠️  .env.development found (should only be on dev machines)');
  }
  
  console.log('\n  Remember to:');
  console.log('  - Set all VITE_* environment variables');
  console.log('  - Disable debug mode and Redux DevTools');
  console.log('  - Enable analytics and error tracking');
  console.log('  - Configure proper API URLs');
  console.log('  - Set up SSL certificates for HTTPS');
}

console.log('\n✅ Pre-flight check completed successfully!\n');
process.exit(0);
