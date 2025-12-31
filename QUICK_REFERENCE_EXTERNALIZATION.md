# Quick Reference - Data Externalization

## Import Statements

### Data Loading
```typescript
// Load all data types
import { 
  getProfiles, 
  getDashboardMetrics,
  getTableColumns,
  getStates,
  getNavigation 
} from './utils/dataLoader';

// Or use hooks (React components)
import { 
  useProfiles, 
  useDashboardMetrics,
  useTableColumns 
} from './utils/dataHooks';
```

### Constants
```typescript
// UI Constants
import { 
  CLASS_NAMES, 
  ICONS, 
  UI_TEXT,
  CHART_CONFIG,
  TABLE_CONFIG 
} from './config/ui-constants';

// App Configuration
import { 
  API_CONFIG, 
  APP_CONFIG,
  THEME_CONFIG,
  FEATURES 
} from './config/constants';
```

### Helpers
```typescript
import { 
  formatCurrency, 
  getTrendClass, 
  buildClassName 
} from './utils/dataHooks';
```

## Common Patterns

### Loading Data in Class Components
```typescript
class MyComponent extends Component {
  render() {
    const profiles = getProfiles();
    const metrics = getDashboardMetrics();
    
    return (
      <div>
        {profiles.map(profile => (
          <div key={profile.id}>{profile.name}</div>
        ))}
      </div>
    );
  }
}
```

### Loading Data in Functional Components
```typescript
const MyComponent: React.FC = () => {
  const profiles = useProfiles();
  const { buttons } = useUIConstants();
  
  return (
    <div>
      {profiles.map(profile => (
        <div key={profile.id}>{profile.name}</div>
      ))}
    </div>
  );
};
```

### Using Class Names
```typescript
// Single class
<Button className={CLASS_NAMES.BTN_SHADOW}>

// Multiple classes with buildClassName
<Button className={buildClassName(
  CLASS_NAMES.BTN_SHADOW,
  CLASS_NAMES.BTN_PILL,
  'me-2'
)}>

// Conditional classes
<Card className={buildClassName(
  'mb-3',
  CLASS_NAMES.CARD_HOVER_SHADOW,
  isActive && CLASS_NAMES.BG_PRIMARY
)}>
```

### Using Icons
```typescript
<i className={ICONS.INBOX} />
<i className={buildClassName(ICONS.CAMERA, 'btn-icon-wrapper')} />
```

### Using UI Text
```typescript
<Button>{UI_TEXT.SAVE}</Button>
<span>{UI_TEXT.LOADING}</span>
```

### Dynamic Asset Loading
```typescript
// In render/return
const avatarSrc = require(`../../assets/utils/images/${profile.avatar}`);
<img src={avatarSrc} alt={profile.name} />

// With hook
const avatarSrc = useAssetPath('avatars', '1.jpg');
<img src={avatarSrc} alt="Avatar" />
```

### Status Badges
```typescript
const badge = getStatusBadge('completed');
<span className={buildClassName('badge', badge.class)}>
  {badge.label}
</span>
```

### API Calls
```typescript
const apiUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`;
fetch(apiUrl, { timeout: API_CONFIG.TIMEOUT });
```

### Theme Settings
```typescript
const isFixedHeader = THEME_CONFIG.ENABLE_FIXED_HEADER;
const colorScheme = THEME_CONFIG.DEFAULT_COLOR_SCHEME;
```

### Feature Flags
```typescript
if (FEATURES.ENABLE_ANALYTICS) {
  // Initialize analytics
}

if (FEATURES.ENABLE_DEBUG_MODE) {
  console.log('Debug info');
}
```

### Currency Formatting
```typescript
formatCurrency(1234.56) // "$1235"
formatCurrency(1234.56, { decimals: 2 }) // "$1234.56"
formatCurrency(1234, { prefix: '', suffix: 'K' }) // "1234K"
```

### Table Configuration
```typescript
const columns = getTableColumns('standard');
const settings = getTableSettings();

<DataTable
  data={data}
  columns={columns}
  pagination={settings.pagination.enabled}
  paginationPerPage={settings.pagination.rowsPerPage}
  fixedHeader={settings.fixedHeader.enabled}
  fixedHeaderScrollHeight={settings.fixedHeader.scrollHeight}
/>
```

### Chart Configuration
```typescript
const chartData = getDashboardChartData('sales');

<Chart
  data={chartData}
  height={CHART_CONFIG.DEFAULT_HEIGHT}
  colors={Object.values(CHART_CONFIG.COLORS)}
/>
```

## Environment Variables

### Access in Code
```typescript
// Already wrapped in constants
const apiUrl = API_CONFIG.BASE_URL; // reads VITE_API_BASE_URL

// Direct access (not recommended)
const customVar = import.meta.env.VITE_CUSTOM_VAR;
```

### Set in .env file
```bash
VITE_API_BASE_URL=https://api.example.com
VITE_DEBUG_MODE=true
```

### Set in Docker
```bash
docker run -e VITE_API_BASE_URL=https://api.example.com myapp
```

### Set in docker-compose.yml
```yaml
services:
  app:
    environment:
      - VITE_API_BASE_URL=https://api.example.com
```

## Data Structure Examples

### Profile Data
```typescript
interface Profile {
  id: number;
  name: string;
  title: string;
  subtitle?: string;
  avatar: string;
  background: string;
  backgroundClass?: string;
  avatarShape: 'rounded' | 'rounded-circle';
  salary: number;
  location: string;
  status: string;
}
```

### Dashboard Metric
```typescript
interface Metric {
  id: number;
  title: string;
  value: number;
  prefix: string;
  suffix: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: number;
  icon: string;
  color: string;
}
```

### Table Column
```typescript
interface TableColumn {
  id: string;
  name: string;
  selector: string;
  sortable: boolean;
  width?: string;
}
```

## File Locations

```
src/
├── data/                    # JSON data files
│   ├── profile-data.json
│   ├── dashboard-data.json
│   ├── table-data.json
│   ├── form-data.json
│   ├── menu-data.json
│   └── ui-constants.json
├── config/                  # Configuration
│   ├── constants.ts        # Env-aware config
│   └── ui-constants.ts     # UI constants
├── utils/                   # Utilities
│   ├── dataLoader.ts       # Data loading functions
│   └── dataHooks.ts        # React hooks
└── examples/                # Usage examples
    └── ProfileBlocksExample.tsx
```

## Migration Checklist

- [ ] Import dataLoader or hooks
- [ ] Import CLASS_NAMES, ICONS, UI_TEXT
- [ ] Replace hardcoded strings with UI_TEXT
- [ ] Replace hardcoded class names with CLASS_NAMES
- [ ] Replace hardcoded icon names with ICONS
- [ ] Replace hardcoded data with loaded data
- [ ] Use buildClassName for multiple classes
- [ ] Dynamic asset loading for images
- [ ] Test component

## Common Issues

### Data not loading
```typescript
// Check import path
import { getProfiles } from '../utils/dataLoader'; // ✓
import { getProfiles } from './utils/dataLoader';  // ✗ wrong path
```

### Class names not applying
```typescript
// Use buildClassName for multiple classes
className={buildClassName(CLASS_NAMES.BTN_PILL, 'me-2')} // ✓
className={CLASS_NAMES.BTN_PILL + ' me-2'}               // ✗ harder to read
```

### Assets not loading
```typescript
// Use require for dynamic paths
const img = require(`../../assets/${path}`);           // ✓
const img = `../../assets/${path}`;                    // ✗ won't work
```

### Environment variables not working
```bash
# Must start with VITE_
VITE_API_URL=...    # ✓
API_URL=...         # ✗ won't be exposed
```

## Tips

1. **Always use data loaders** - Don't import JSON directly
2. **Use buildClassName** - Makes multiple classes easier
3. **Use constants** - Never hardcode class names or text
4. **Document new data** - Add to JSON files with comments
5. **Test thoroughly** - Verify data loads correctly
6. **Keep fallbacks** - Handle missing data gracefully

## Resources

- [Full Guide](./DATA_EXTERNALIZATION_GUIDE.md)
- [Docker Guide](./DOCKER_CONFIG_GUIDE.md)
- [Implementation Summary](./EXTERNALIZATION_SUMMARY.md)
- [Example Component](./src/examples/ProfileBlocksExample.tsx)
