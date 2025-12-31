# Jest Testing Guide

## Overview

This project uses Jest and React Testing Library for unit testing with TypeScript support.

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

## Test Structure

Tests are organized alongside the code they test in `__tests__` directories:

```
src/
  components/
    ComponentName.tsx
    __tests__/
      ComponentName.test.tsx
  utils/
    helper.tsx
    __tests__/
      helper.test.tsx
```

## Writing Tests

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Testing with Redux and Router

Use the custom render function from `src/utils/test-utils.tsx`:

```typescript
import { render, screen } from 'src/utils/test-utils';
import ConnectedComponent from '../ConnectedComponent';

describe('ConnectedComponent', () => {
  it('works with Redux store', () => {
    render(<ConnectedComponent />);
    // Component has access to Redux store and React Router
  });
});
```

### Testing Redux Actions and Reducers

```typescript
import reducer, { actionCreator } from '../reducer';

describe('Reducer', () => {
  it('handles action correctly', () => {
    const action = actionCreator(value);
    const state = reducer(undefined, action);
    expect(state.property).toBe(value);
  });
});
```

## Coverage Reports

After running `npm run test:coverage`, coverage reports are generated in:

- `coverage/` - HTML report (open `coverage/index.html` in browser)
- `coverage/lcov.info` - LCOV format
- Console output - Summary table

### Coverage Thresholds

The project enforces minimum coverage thresholds:

- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

## Configuration Files

- `jest.config.js` - Main Jest configuration
- `src/setupTests.ts` - Global test setup and mocks
- `src/utils/test-utils.tsx` - Custom render with providers
- `src/__mocks__/fileMock.js` - Mock for static assets

## Best Practices

1. **Test behavior, not implementation**
   - Focus on what the component does, not how it does it

2. **Use data-testid sparingly**
   - Prefer queries by role, label, or text

3. **Keep tests isolated**
   - Each test should be independent

4. **Mock external dependencies**
   - API calls, third-party libraries, etc.

5. **Test error states**
   - Don't just test the happy path

## Troubleshooting

### Tests fail with import errors

Make sure all dependencies are installed:
```bash
npm install
```

### Coverage threshold not met

Run `npm run test:coverage` to see which files need more tests.

### Module not found errors

Check `moduleNameMapper` in `jest.config.js` for path aliases.

## Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
