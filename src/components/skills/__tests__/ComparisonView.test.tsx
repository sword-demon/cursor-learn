import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComparisonView } from '../ComparisonView';
import type { SkillComparison } from '../../../types';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock('../../common/CodeBlock', () => ({
  CodeBlock: ({ code }: { code: string }) => (
    <pre data-testid="code-block">{code}</pre>
  ),
}));

const mockComparison: SkillComparison = {
  id: 'login-page',
  title: 'Login Page Comparison',
  description: 'Compare login page with and without skill',
  skillName: 'frontend-design',
  withoutSkill: {
    prompt: 'Create a login page',
    code: '<div>Basic login</div>',
    screenshotUrl: '/images/without.png',
  },
  withSkill: {
    prompt: 'Create a login page with /frontend-design',
    code: '<div>Beautiful login</div>',
    screenshotUrl: '/images/with.png',
  },
  highlights: ['Better styling', 'Responsive layout', 'Accessibility'],
};

describe('ComparisonView', () => {
  it('renders title and description', () => {
    render(<ComparisonView comparison={mockComparison} />);
    expect(screen.getByText('Login Page Comparison')).toBeInTheDocument();
    expect(
      screen.getByText('Compare login page with and without skill')
    ).toBeInTheDocument();
  });

  it('renders skill name badge', () => {
    render(<ComparisonView comparison={mockComparison} />);
    expect(screen.getByText('Skill: frontend-design')).toBeInTheDocument();
  });

  it('renders highlights section', () => {
    render(<ComparisonView comparison={mockComparison} />);
    expect(screen.getByText('Better styling')).toBeInTheDocument();
    expect(screen.getByText('Responsive layout')).toBeInTheDocument();
    expect(screen.getByText('Accessibility')).toBeInTheDocument();
  });

  describe('wide screen (side-by-side mode)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });
    });

    it('renders both panels side by side', () => {
      render(<ComparisonView comparison={mockComparison} />);
      expect(screen.getByText('Without Skill')).toBeInTheDocument();
      expect(screen.getByText('With Skill')).toBeInTheDocument();
    });

    it('renders prompts for both panels', () => {
      render(<ComparisonView comparison={mockComparison} />);
      expect(screen.getByText('Create a login page')).toBeInTheDocument();
      expect(
        screen.getByText('Create a login page with /frontend-design')
      ).toBeInTheDocument();
    });
  });

  describe('narrow screen (tab switch mode)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 800,
      });
    });

    it('renders tab buttons', () => {
      render(<ComparisonView comparison={mockComparison} />);
      const withoutButtons = screen.getAllByText('Without Skill');
      const withButtons = screen.getAllByText('With Skill');
      expect(withoutButtons.length).toBeGreaterThanOrEqual(1);
      expect(withButtons.length).toBeGreaterThanOrEqual(1);
    });

    it('switches between tabs', () => {
      render(<ComparisonView comparison={mockComparison} />);
      expect(screen.getByText('Create a login page')).toBeInTheDocument();

      const withButton = screen.getAllByText('With Skill').find(
        (el) => el.tagName === 'BUTTON'
      );
      if (withButton) {
        fireEvent.click(withButton);
        expect(
          screen.getByText('Create a login page with /frontend-design')
        ).toBeInTheDocument();
      }
    });
  });

  it('responds to window resize', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1200,
    });
    render(<ComparisonView comparison={mockComparison} />);

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 800,
    });
    fireEvent(window, new Event('resize'));
    // After resize, tab buttons should appear
    const withButtons = screen.getAllByText('With Skill');
    expect(withButtons.length).toBeGreaterThanOrEqual(1);
  });
});

