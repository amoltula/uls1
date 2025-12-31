import React from 'react';
import { render, screen } from '@testing-library/react';
import CircleProgress from '../CircleProgress';

describe('CircleProgress', () => {
  it('renders without crashing', () => {
    render(<CircleProgress />);
  });

  it('renders with default props', () => {
    const { container } = render(<CircleProgress />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '100');
    expect(svg).toHaveAttribute('height', '100');
  });

  it('displays correct percentage', () => {
    const { container } = render(<CircleProgress percent={75} />);
    const text = container.querySelector('text');
    expect(text).toHaveTextContent('75%');
  });

  it('renders with custom width', () => {
    const { container } = render(<CircleProgress width={200} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '200');
  });

  it('renders with custom stroke width', () => {
    const { container } = render(<CircleProgress strokeWidth={10} />);
    const circles = container.querySelectorAll('circle');
    circles.forEach(circle => {
      expect(circle).toHaveAttribute('stroke-width', '10');
    });
  });

  it('renders with custom colors', () => {
    const { container } = render(
      <CircleProgress trailColor="#000" strokeColor="#fff" />
    );
    const circles = container.querySelectorAll('circle');
    expect(circles[0]).toHaveAttribute('stroke', '#000');
    expect(circles[1]).toHaveAttribute('stroke', '#fff');
  });

  it('calculates circumference correctly', () => {
    const { container } = render(<CircleProgress percent={50} width={100} strokeWidth={8} />);
    const progressCircle = container.querySelectorAll('circle')[1];
    const circumference = parseFloat(progressCircle.getAttribute('stroke-dasharray') || '0');
    expect(circumference).toBeGreaterThan(0);
  });

  it('handles zero percent', () => {
    const { container } = render(<CircleProgress percent={0} />);
    const text = container.querySelector('text');
    expect(text).toHaveTextContent('0%');
  });

  it('handles 100 percent', () => {
    const { container } = render(<CircleProgress percent={100} />);
    const text = container.querySelector('text');
    expect(text).toHaveTextContent('100%');
  });
});
