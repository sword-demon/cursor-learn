import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SkillCardGrid } from '../SkillCardGrid';
import type { SkillCard } from '../../../types';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
      onClick,
    }: {
      children: React.ReactNode;
      className?: string;
      onClick?: () => void;
    }) => (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const mockCards: SkillCard[] = [
  {
    id: 'frontend-design',
    name: 'frontend-design',
    displayName: 'Frontend Design',
    description: 'Create stunning frontend interfaces',
    category: 'creative-design',
    useCases: ['Landing pages', 'Dashboards'],
    exampleCommand: '/frontend-design',
    exampleOutput: 'Generating design...',
    isOfficial: true,
    tags: ['design', 'ui'],
  },
  {
    id: 'code-review',
    name: 'code-review',
    displayName: 'Code Review',
    description: 'Comprehensive code review',
    category: 'development',
    useCases: ['PR review', 'Quality check'],
    exampleCommand: '/code-review',
    exampleOutput: 'Reviewing code...',
    isOfficial: false,
    tags: ['review', 'quality'],
  },
  {
    id: 'speckit',
    name: 'speckit',
    displayName: 'Spec Kit',
    description: 'Specification toolkit',
    category: 'document',
    useCases: ['Spec writing'],
    exampleCommand: '/speckit.specify',
    exampleOutput: 'Creating spec...',
    isOfficial: true,
    tags: ['spec', 'docs'],
  },
];

describe('SkillCardGrid', () => {
  it('renders all cards', () => {
    render(<SkillCardGrid cards={mockCards} />);
    expect(screen.getByText('Frontend Design')).toBeInTheDocument();
    expect(screen.getByText('Code Review')).toBeInTheDocument();
    expect(screen.getByText('Spec Kit')).toBeInTheDocument();
  });

  it('renders category filter tabs', () => {
    render(<SkillCardGrid cards={mockCards} />);
    expect(screen.getByText('全部')).toBeInTheDocument();
    // Category labels appear in both filter tabs and card badges
    expect(screen.getAllByText('创意与设计').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('开发与技术').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('文档处理').length).toBeGreaterThanOrEqual(1);
  });

  it('filters cards by category', () => {
    render(<SkillCardGrid cards={mockCards} />);
    // Click the filter tab button (first match is the button)
    const categoryButtons = screen.getAllByText('创意与设计');
    fireEvent.click(categoryButtons[0]);
    expect(screen.getByText('Frontend Design')).toBeInTheDocument();
    expect(screen.queryByText('Code Review')).not.toBeInTheDocument();
    expect(screen.queryByText('Spec Kit')).not.toBeInTheDocument();
  });

  it('shows all cards when clicking all filter', () => {
    render(<SkillCardGrid cards={mockCards} />);
    const categoryButtons = screen.getAllByText('创意与设计');
    fireEvent.click(categoryButtons[0]);
    fireEvent.click(screen.getByText('全部'));
    expect(screen.getByText('Frontend Design')).toBeInTheDocument();
    expect(screen.getByText('Code Review')).toBeInTheDocument();
    expect(screen.getByText('Spec Kit')).toBeInTheDocument();
  });

  it('expands card details on click', () => {
    render(<SkillCardGrid cards={mockCards} />);
    expect(screen.queryByText('Landing pages')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Frontend Design'));
    expect(screen.getByText('Landing pages')).toBeInTheDocument();
    expect(screen.getByText('/frontend-design')).toBeInTheDocument();
  });

  it('collapses card details on second click', () => {
    render(<SkillCardGrid cards={mockCards} />);
    fireEvent.click(screen.getByText('Frontend Design'));
    expect(screen.getByText('Landing pages')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Frontend Design'));
    expect(screen.queryByText('Landing pages')).not.toBeInTheDocument();
  });

  it('calls onCardClick callback', () => {
    const onCardClick = vi.fn();
    render(<SkillCardGrid cards={mockCards} onCardClick={onCardClick} />);
    fireEvent.click(screen.getByText('Frontend Design'));
    expect(onCardClick).toHaveBeenCalledWith('frontend-design');
  });

  it('shows official badge for official cards', () => {
    render(<SkillCardGrid cards={mockCards} />);
    const officialBadges = screen.getAllByText('官方');
    expect(officialBadges.length).toBe(2);
  });

  it('renders card tags', () => {
    render(<SkillCardGrid cards={mockCards} />);
    expect(screen.getByText('design')).toBeInTheDocument();
    expect(screen.getByText('review')).toBeInTheDocument();
  });
});
