# ArchitectUI React Bootstrap Admin Dashboard Template (FREE)

**React 19 Compatible** - A modern, responsive admin dashboard template built with React 19, Bootstrap 5, and comprehensive component library.

![ArchitectUI Bootstrap 5 ReactJS Theme FREE](https://colorlib.com/wp/wp-content/uploads/sites/2/architectui-react-free.jpg)

## Overview

ArchitectUI React is a feature-rich, free admin dashboard template designed for modern web applications. Built with the latest React 19 and Bootstrap 5, it provides a solid foundation for creating professional admin panels, dashboards, and web applications.

This template offers clean, responsive design with a comprehensive set of UI components, charts, forms, and layout options. Perfect for startups, enterprises, and developers looking for a production-ready admin dashboard solution.

## Key Features

### Core Technologies
- **React 19.2.0** - Latest React with improved performance and features
- **Vite 7.2.6** - Lightning-fast build tool with instant HMR
- **Bootstrap 5.3.8** - Modern CSS framework with utilities
- **Redux Toolkit** - State management
- **React Router v7** - Navigation and routing
- **Sass/SCSS** - Advanced styling capabilities

### UI Components
- **30+ Ready-to-use Components** - Forms, tables, charts, modals, and more
- **Multiple Dashboard Layouts** - Analytics, CRM, Commerce, Sales, and Minimal
- **Advanced Form Elements** - Date pickers, file uploads, text editors, sliders
- **Data Visualization** - ApexCharts, Chart.js, Recharts integration
- **Interactive Maps** - Leaflet/OpenStreetMap and Vector Maps (no API key required)
- **Responsive Design** - Mobile-first approach with all device compatibility

### Layout Options
- **Flexible Sidebar** - Collapsible with custom themes
- **Header Variations** - Multiple header styles and configurations
- **Footer Components** - Fixed and dynamic footer options
- **Theme Customization** - 9 pre-built color schemes
- **Dark Mode Support** - Professional dark theme option

## Quick Start

### Prerequisites

- **Node.js** (LTS version) - [Download here](https://nodejs.org/en/download/)
- **npm** or **yarn** package manager

### Installation

1. **Clone or Download** the repository
   ```bash
   git clone https://github.com/DashboardPack/architectui-react-theme-free.git
   cd architectui-react-theme-free
   ```

2. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```
   
   The application will open in your browser at `http://localhost:3001`

### Build for Production

1. **Create Production Build**
   ```bash
   npm run build
   ```

2. **Preview Production Build**
   ```bash
   npm run preview
   ```

   View the production build at `http://localhost:4173`

## 📚 Documentation

This project includes comprehensive documentation:

- **[Quick Reference](./QUICK_REFERENCE.md)** - Essential commands and common patterns
- **[Configuration Guide](./CONFIGURATION.md)** - Complete environment variable reference
- **[Migration Guide](./MIGRATION.md)** - Step-by-step guide to configuration system
- **[Configuration Summary](./CONFIGURATION_SUMMARY.md)** - Overview of the configuration system
- **[Docker Guide](./DOCKER.md)** - Container deployment instructions
- **[Testing Guide](./TESTING.md)** - Testing framework and best practices

## Project Structure

```
architectui-react-theme-free/
├── public/                 # Static files
├── src/
│   ├── assets/            # Styles, images, and static assets
│   ├── components/        # Reusable UI components
│   ├── config/            # Configuration and constants
│   │   ├── constants.ts   # Centralized configuration
│   │   ├── validator.ts   # Configuration validation
│   │   └── configureStore.tsx # Redux store setup
│   ├── DemoPages/         # Demo pages and examples
│   │   ├── Dashboards/    # Dashboard variations
│   │   ├── Components/    # UI component examples
│   │   ├── Forms/         # Form examples
│   │   └── Tables/        # Table examples
│   ├── Layout/            # Layout components
│   │   ├── AppHeader/     # Header components
│   │   ├── AppSidebar/    # Sidebar components
│   │   └── AppFooter/     # Footer components
│   └── reducers/          # Redux store configuration
├── docker/                # Docker configuration files
├── scripts/               # Build and utility scripts
├── .env.example           # Environment variable template
├── vite.config.js        # Vite configuration
├── jest.config.js        # Jest testing configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## ⚙️ Configuration

This project uses environment-based configuration for maximum flexibility.

### Quick Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env.development.local
   ```

2. **Edit your settings:**
   ```env
   VITE_APP_NAME=My Application
   VITE_API_BASE_URL=http://localhost:4000/api
   VITE_PORT=3001
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```

### Environment Files

- `.env` - Base configuration (committed)
- `.env.development` - Development defaults (committed)
- `.env.production` - Production defaults (committed)
- `.env.local` - Local overrides (not committed)
- `.env.[mode].local` - Environment-specific local overrides (not committed)

### Key Configuration Variables

```env
# Application
VITE_APP_NAME=ArchitectUI React Theme
VITE_API_BASE_URL=http://localhost:4000/api

# Features
VITE_DEBUG_MODE=true
VITE_ENABLE_REDUX_DEVTOOLS=true
VITE_ENABLE_ANALYTICS=false

# Theme
VITE_ENABLE_FIXED_HEADER=true
VITE_ENABLE_FIXED_SIDEBAR=true
VITE_DEFAULT_COLOR_SCHEME=bg-royal
```

**See [CONFIGURATION.md](./CONFIGURATION.md) for complete variable reference.**

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with preflight checks |
| `npm run dev` | Start development server (alias for start) |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run preflight` | Validate configuration and environment |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run docker:up` | Start production Docker container |
| `npm run docker:up:dev` | Start development Docker container with hot reload |

## 🐳 Docker Support

This project includes full Docker support with optimized multi-stage builds.

### Quick Start with Docker

```bash
# Development with hot reload
docker-compose up dev

# Production build
docker-compose up app
```

### Docker Features

- ✅ **Multi-stage builds** - Optimized ~40MB production images
- ✅ **Development mode** - Hot reload with volume mounts
- ✅ **Environment variables** - Full configuration support
- ✅ **Nginx production server** - Configured with security headers
- ✅ **Docker Compose** - Easy orchestration

**See [DOCKER.md](./DOCKER.md) for complete Docker documentation.**

## 🧪 Testing

Comprehensive testing framework with Jest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Features

- ✅ **57 passing tests** - Component, reducer, and integration tests
- ✅ **80% coverage threshold** - Enforced code quality standards
- ✅ **TypeScript support** - Full type checking in tests
- ✅ **Custom test utilities** - Redux and Router test helpers
- ✅ **CI/CD ready** - GitHub Actions integration

**See [TESTING.md](./TESTING.md) for testing best practices.**

## Browser Support

ArchitectUI React supports all modern browsers:

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)
- **Opera** (latest)

## Customization

### Theme Colors
Customize the color scheme by modifying the Sass variables in:
- `src/assets/themes/[theme-name]/_variables.scss`

### Layout Configuration
Adjust layout settings in:
- `src/reducers/ThemeOptions.js`

### Adding New Components
Follow the existing component structure in:
- `src/DemoPages/Components/`

## Available Versions

ArchitectUI is available in multiple frameworks:

| Framework | Repository | Status |
|-----------|------------|---------|
| **React** | [Free Version](https://github.com/DashboardPack/architectui-react-theme-free) | ✅ Active |
| **Vue.js** | [Vue Version](https://dashboardpack.com/theme-details/architectui-dashboard-vue-pro/) | ✅ Available |
| **Angular** | [Angular Version](https://dashboardpack.com/theme-details/architectui-angular-7-bootstrap-material-design-pro?v=7516fd43adaa) | ✅ Available |
| **HTML/jQuery** | [HTML Version](https://dashboardpack.com/theme-details/architectui-dashboard-html-pro) | ✅ Available |

## Professional Version

Upgrade to **ArchitectUI React PRO** for additional features:

- **150+ Premium Components**
- **Advanced Dashboard Layouts**
- **Premium Chart Libraries**
- **Extended Form Elements**
- **Professional Support**
- **Regular Updates**
- **Commercial License**

[**Get PRO Version →**](https://dashboardpack.com/theme-details/architectui-dashboard-react-pro)

## Resources & Templates

### Discover More Templates

**DashboardPack.com** - Premium admin dashboard templates
- React, Vue, Angular, and HTML versions
- Professional support and documentation
- Regular updates and new features
- [Browse Templates](https://dashboardpack.com/)

**Colorlib.com** - Free web templates and themes
- Hundreds of free templates
- Various categories: admin, landing, blog, portfolio
- High-quality designs for every project
- [Explore Free Templates](https://colorlib.com/)

## Technical Details

### Dependencies
- **UI Framework**: Bootstrap 5.3.8, Reactstrap 9.2.3
- **Charts**: ApexCharts 5.3.6, Chart.js 4.5.1, Recharts 3.5.1
- **Icons**: FontAwesome 7.1.0, React Icons 5.5.0
- **Forms**: React Select, React Datepicker, React Input Mask
- **Animations**: Framer Motion 12.23.25, React Animations
- **State Management**: Redux Toolkit 2.11.0
- **Build Tools**: Vite 7.2.6, Sass 1.94.2

### Performance Features
- **Lightning-Fast HMR** - Instant hot module replacement with Vite
- **Code Splitting** - Automatic route-based code splitting
- **Tree Shaking** - Eliminate unused code
- **Optimized Builds** - Minified and compressed assets
- **Lazy Loading** - Components load on demand

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2023 DashboardPack

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

## Support & Community

### Get Help
- **Documentation**: Comprehensive guides and examples included
- **GitHub Issues**: Report bugs and request features
- **Community**: Join our developer community

### Stay Updated
- **GitHub**: Star the repository for updates
- **DashboardPack**: Follow for new template releases
- **Changelog**: Check [CHANGELOG.md](Changelog.md) for version history

## Credits

**Developed by**: [DashboardPack.com](https://dashboardpack.com/)  
**Design**: Professional UI/UX team  
**Maintained by**: Open source community  

---

**Made with care for the developer community**

[Website](https://dashboardpack.com/) • [Templates](https://dashboardpack.com/) • [Support](https://dashboardpack.com/contact/) • [Free Resources](https://colorlib.com/)
