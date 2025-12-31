import React from 'react';
import { render, screen } from '../test-utils';

// Simple test component
const TestComponent = () => <div>Test</div>;

describe('Test Utils', () => {
  it('should render with all providers', () => {
    render(<TestComponent />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should provide Redux store', () => {
    const ConnectedComponent = () => {
      return <div>Connected</div>;
    };
    render(<ConnectedComponent />);
    expect(screen.getByText('Connected')).toBeInTheDocument();
  });

  it('should provide Router', () => {
    const ComponentWithRouter = () => {
      return <div>Routed Component</div>;
    };
    render(<ComponentWithRouter />);
    expect(screen.getByText('Routed Component')).toBeInTheDocument();
  });
});
