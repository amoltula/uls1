# Data Externalization Guide

## Overview

All hardcoded data, metadata, and configuration values have been externalized into separate JSON files and constants. This allows for easier maintenance, configuration, and Docker deployment.

## Structure

```
src/
├── data/                          # External data files
│   ├── dashboard-data.json        # Dashboard metrics, charts, CRM data
│   ├── form-data.json            # Form options, validation rules
│   ├── menu-data.json            # Navigation and menu structures
│   ├── profile-data.json         # User profiles and team data
│   ├── table-data.json           # Table configurations and sample data
│   └── ui-constants.json         # UI labels, buttons, messages
├── config/
│   ├── constants.ts              # Application configuration (env-aware)
│   └── ui-constants.ts           # UI-specific constants
└── utils/
    └── dataLoader.ts             # Data loading utility functions
```

## Configuration Files

### 1. Application Constants (`src/config/constants.ts`)

Contains all environment-aware configuration:
- API endpoints and timeouts
- Server configuration
- Theme settings
- Feature flags
- Authentication settings
- Cache and logging configuration

**Environment Variables**: All values can be overridden via `.env` files or Docker environment variables.

Example:
```typescript
import { API_CONFIG, THEME_CONFIG } from './config/constants';

const apiUrl = API_CONFIG.BASE_URL; // Uses VITE_API_BASE_URL from env
const enableHeader = THEME_CONFIG.ENABLE_FIXED_HEADER; // Uses VITE_THEME_FIXED_HEADER
```

### 2. UI Constants (`src/config/ui-constants.ts`)

Contains UI-specific constants:
- CSS class names
- Icon names
- Sizes and breakpoints
- Animation configurations
- Chart, table, modal configurations

Example:
```typescript
import { CLASS_NAMES, ICONS } from './config/ui-constants';

<Button className={CLASS_NAMES.BTN_PILL}>
  <i className={ICONS.INBOX} />
</Button>
```

### 3. Data Files (`src/data/*.json`)

#### `dashboard-data.json`
- Analytics metrics
- Chart data
- Progress data
- CRM leads and highlights
- Sales summaries
- Notifications and activities

#### `profile-data.json`
- User profiles with avatars and backgrounds
- Team structures
- Status information

#### `table-data.json`
- Column configurations
- Table settings (pagination, sorting)
- Sample data options

#### `form-data.json`
- States, countries, regions
- Form validation rules
- Select options

#### `menu-data.json`
- Navigation structure
- User menu items
- Header menu items

#### `ui-constants.json`
- Button labels
- Status messages
- Form labels and placeholders
- Icons mapping
- Color schemes

## Usage Guide

### Loading Data

Use the `dataLoader` utility to access external data:

```typescript
import { 
  getProfiles, 
  getDashboardMetrics,
  getTableColumns,
  getStatusBadge 
} from '../utils/dataLoader';

// In your component
const profiles = getProfiles();
const metrics = getDashboardMetrics();
const columns = getTableColumns('standard');
const badge = getStatusBadge('completed');
```

### Using Constants

```typescript
import { CLASS_NAMES, ICONS, UI_TEXT } from '../config/ui-constants';
import { APP_CONFIG, API_CONFIG } from '../config/constants';

// CSS Classes
<Card className={CLASS_NAMES.CARD_HEADER_TAB}>
  <Button className={CLASS_NAMES.BTN_SHADOW}>
    {UI_TEXT.SAVE}
  </Button>
</Card>

// API Configuration
fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`);

// App Info
<title>{APP_CONFIG.TITLE}</title>
```

### Example: Refactored Component

**Before:**
```tsx
<Card className="mb-3 profile-block">
  <h5 className="menu-header-title">Jessica Walberg</h5>
  <Button className="btn-icon btn-pill me-2 btn-icon-only" color="link">
    <i className="lnr-inbox btn-icon-wrapper"> </i>
  </Button>
</Card>
```

**After:**
```tsx
import { getProfiles } from '../utils/dataLoader';
import { CLASS_NAMES, ICONS } from '../config/ui-constants';

const profiles = getProfiles();

{profiles.map(profile => (
  <Card className={`mb-3 ${CLASS_NAMES.CARD_PROFILE_BLOCK}`} key={profile.id}>
    <h5 className={CLASS_NAMES.MENU_HEADER_TITLE}>{profile.name}</h5>
    <Button 
      className={`${CLASS_NAMES.BTN_ICON} ${CLASS_NAMES.BTN_PILL} me-2 ${CLASS_NAMES.BTN_ICON_ONLY}`} 
      color="link"
    >
      <i className={`${ICONS.INBOX} btn-icon-wrapper`}> </i>
    </Button>
  </Card>
))}
```

## Environment Variables

### Development

Create `.env.development`:
```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_DEBUG_MODE=true
VITE_ENABLE_REDUX_DEVTOOLS=true
```

### Production

Create `.env.production` or set in Docker:
```bash
VITE_API_BASE_URL=https://api.production.com
VITE_DEBUG_MODE=false
VITE_ENABLE_REDUX_DEVTOOLS=false
VITE_ENABLE_ANALYTICS=true
```

### Docker Configuration

Set environment variables in `docker-compose.yml`:

```yaml
services:
  app:
    environment:
      - VITE_API_BASE_URL=https://api.production.com
      - VITE_THEME_COLOR_SCHEME=dark
      - VITE_ENABLE_ANALYTICS=true
```

Or use `.env` file:
```yaml
services:
  app:
    env_file:
      - .env.production
```

## Benefits

1. **Maintainability**: All data in one place, easy to update
2. **Reusability**: Same data across multiple components
3. **Flexibility**: Easy to switch data sources or add new data
4. **Configuration**: Environment-based configuration for different deployments
5. **Testing**: Easy to mock data for testing
6. **Docker**: Simple configuration through environment variables
7. **Consistency**: Centralized constants ensure consistent UI

## Migration Checklist

When refactoring components:

- [ ] Identify hardcoded strings, numbers, and data
- [ ] Check if data exists in JSON files, or add it
- [ ] Import `dataLoader` functions
- [ ] Replace hardcoded values with loaded data
- [ ] Replace hardcoded CSS classes with `CLASS_NAMES`
- [ ] Replace hardcoded icons with `ICONS`
- [ ] Replace hardcoded text with `UI_TEXT`
- [ ] Test component with new data source

## Adding New Data

### 1. Add to JSON file

```json
// src/data/custom-data.json
{
  "widgets": [
    {
      "id": 1,
      "title": "New Widget",
      "value": 100
    }
  ]
}
```

### 2. Add loader function

```typescript
// src/utils/dataLoader.ts
import customData from '../data/custom-data.json';

export const getWidgets = () => {
  return customData.widgets || [];
};
```

### 3. Use in component

```typescript
import { getWidgets } from '../utils/dataLoader';

const widgets = getWidgets();
```

## Best Practices

1. **Always use data loaders** instead of direct imports
2. **Use constants** for all CSS classes and text
3. **Environment variables** for configuration that changes per environment
4. **JSON files** for data that might be externalized to API later
5. **TypeScript types** for data structures (recommended)
6. **Fallback values** in loaders for missing data
7. **Document** any new data structures added

## Troubleshooting

### Data not loading
- Check file path in import
- Verify JSON is valid
- Check dataLoader function exists

### Environment variable not working
- Must start with `VITE_`
- Restart dev server after changing `.env`
- Check `constants.ts` is using correct env var name

### Build errors with dynamic imports
- Use `require()` for dynamic asset imports
- Ensure path is relative and correct
- Check Vite/Webpack configuration

## Next Steps

To complete the externalization:

1. Update remaining components to use `dataLoader`
2. Add TypeScript interfaces for data structures
3. Consider moving to API endpoints for dynamic data
4. Add data validation
5. Implement caching for loaded data
6. Add error boundaries for data loading failures
