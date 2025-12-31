# Configuration Quick Reference

## 🚀 Quick Start

```bash
# 1. Copy environment template
cp .env.example .env.development.local

# 2. Edit your settings
nano .env.development.local

# 3. Start application
npm run dev
```

## 📝 Common Environment Variables

### Essential Variables

```env
# Application Identity
VITE_APP_NAME=ArchitectUI React Theme
VITE_APP_VERSION=4.2.0

# API Configuration
VITE_API_BASE_URL=http://localhost:4000/api
VITE_API_TIMEOUT=30000

# Server Configuration
VITE_SERVER_BASE_URL=http://localhost:3001
VITE_PORT=3001
```

### Development Mode

```env
# Features
VITE_DEBUG_MODE=true
VITE_ENABLE_REDUX_DEVTOOLS=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_TRACKING=false
VITE_ENABLE_MOCK_API=true
```

### Production Mode

```env
# Features
VITE_DEBUG_MODE=false
VITE_ENABLE_REDUX_DEVTOOLS=false
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=true
VITE_ENABLE_MOCK_API=false
```

## 💻 Usage in Code

### Import Configuration

```typescript
import { CONFIG } from './config/constants';

// Or import specific modules
import { API_CONFIG, FEATURES, THEME_CONFIG } from './config/constants';
```

### Common Patterns

```typescript
// API calls
const response = await fetch(`${CONFIG.API.BASE_URL}/users`, {
  headers: CONFIG.API.DEFAULT_HEADERS,
  signal: AbortSignal.timeout(CONFIG.API.TIMEOUT)
});

// Feature flags
if (CONFIG.FEATURES.ENABLE_DEBUG_MODE) {
  console.log('Debug info:', data);
}

// Theme settings
const theme = {
  sidebarColor: CONFIG.THEME.SIDEBAR_BG_COLOR,
  headerColor: CONFIG.THEME.HEADER_BG_COLOR,
};

// Authentication
localStorage.setItem(CONFIG.AUTH.TOKEN_STORAGE_KEY, token);

// Caching
const CACHE_TTL = CONFIG.CACHE.API_CACHE_TTL;
```

## 🐳 Docker Commands

```bash
# Development with hot reload
docker-compose up dev

# Production build
docker-compose up app

# Build only
docker-compose build app

# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Rebuild from scratch
docker-compose build --no-cache app
```

## ✅ Validation Commands

```bash
# Pre-flight check
npm run preflight

# Validate configuration
npm run validate:config

# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 🔍 Troubleshooting

### Issue: Variables not loading

```bash
# Solution 1: Check file naming
ls -la .env*

# Solution 2: Restart dev server
# Vite only reads .env files on startup

# Solution 3: Check variable prefix
# Must start with VITE_
```

### Issue: Configuration validation fails

```bash
# Run validation with details
npm run preflight

# Check for syntax errors in .env files
cat .env.development | grep "="
```

### Issue: Docker not picking up variables

```bash
# Solution 1: Rebuild without cache
docker-compose build --no-cache

# Solution 2: Check env_file in docker-compose.yml
cat docker-compose.yml | grep env_file

# Solution 3: Pass variables directly
docker-compose up --build app
```

## 📋 Environment File Priority

```
Highest Priority → Lowest Priority

.env.[mode].local    # Local overrides (not committed)
     ↓
.env.local           # Local defaults (not committed)
     ↓
.env.[mode]          # Environment-specific (committed)
     ↓
.env                 # Base defaults (committed)
```

## 🔐 Security Checklist

### ✅ DO

- ✅ Use `.env.example` as template
- ✅ Commit `.env.example` to git
- ✅ Set production vars in deployment platform
- ✅ Use secrets manager for sensitive data
- ✅ Disable debug mode in production
- ✅ Enable HTTPS in production
- ✅ Rotate API keys regularly

### ❌ DON'T

- ❌ Commit `.env.local` or `.env.*.local` files
- ❌ Put real secrets in `.env.example`
- ❌ Enable debug mode in production
- ❌ Use same API keys for dev/prod
- ❌ Hardcode secrets in source code
- ❌ Share `.env` files via chat/email

## 📦 Package.json Scripts

```bash
npm run dev              # Start dev server with preflight
npm run build            # Build for production with preflight
npm run preview          # Preview production build
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run preflight        # Run preflight checks
npm run validate:config  # Validate configuration
npm run docker:up        # Start Docker production
npm run docker:up:dev    # Start Docker development
npm run docker:down      # Stop Docker services
```

## 🎯 Configuration Modules

| Module | Purpose | Key Variables |
|--------|---------|---------------|
| `API_CONFIG` | API endpoints | BASE_URL, TIMEOUT, HEADERS |
| `APP_CONFIG` | App metadata | NAME, VERSION, DESCRIPTION |
| `SERVER_CONFIG` | Server settings | BASE_URL, PORT, PROXY |
| `THEME_CONFIG` | UI theme | COLORS, LAYOUT, SIDEBAR |
| `FEATURES` | Feature flags | DEBUG, ANALYTICS, MOCKING |
| `REDUX_CONFIG` | Redux setup | DEVTOOLS, PERSIST |
| `AUTH_CONFIG` | Authentication | TOKEN_KEY, SESSION_TIMEOUT |
| `CACHE_CONFIG` | Caching | TTL values |
| `LOG_CONFIG` | Logging | LEVEL, CONSOLE, FILE |
| `BUILD_CONFIG` | Build info | ENV, MODE, VERSION |
| `PERFORMANCE_CONFIG` | Performance | THRESHOLDS, LIMITS |

## 🔗 Documentation Links

- **Full Configuration Reference:** [CONFIGURATION.md](./CONFIGURATION.md)
- **Migration Guide:** [MIGRATION.md](./MIGRATION.md)
- **Docker Guide:** [DOCKER.md](./DOCKER.md)
- **Testing Guide:** [TESTING.md](./TESTING.md)
- **System Summary:** [CONFIGURATION_SUMMARY.md](./CONFIGURATION_SUMMARY.md)

## 📞 Getting Help

1. **Configuration errors?** → Check `CONFIGURATION.md` troubleshooting section
2. **Migration help?** → Follow `MIGRATION.md` step-by-step guide
3. **Docker issues?** → See `DOCKER.md` for container setup
4. **Test failures?** → Review `TESTING.md` for test configuration

## 🎓 Learning Path

### Day 1: Basics
1. Read this quick reference
2. Copy `.env.example` to `.env.development.local`
3. Start dev server: `npm run dev`
4. Experiment with changing variables

### Day 2: Deep Dive
1. Read `CONFIGURATION.md` sections 1-3
2. Review `src/config/constants.ts`
3. Try Docker: `docker-compose up dev`
4. Run tests: `npm test`

### Day 3: Advanced
1. Read `MIGRATION.md`
2. Update component to use `CONFIG`
3. Add validation for new variable
4. Create custom configuration module

### Day 4: Production
1. Read `CONFIGURATION.md` security section
2. Set up production `.env.production`
3. Test production build: `npm run build`
4. Deploy with Docker: `docker-compose up app`

---

**Keep this card handy for daily development! 📌**

For detailed information, see [CONFIGURATION.md](./CONFIGURATION.md)
