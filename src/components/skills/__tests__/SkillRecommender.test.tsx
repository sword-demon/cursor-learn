import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SkillRecommender } from '../SkillRecommender';
import type { SkillRecommendation, SkillCard } from '../../../types';

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
    button: ({
      children,
      className,
      onClick,
    }: {
      children: React.ReactNode;
      className?: string;
      onClick?: () => void;
    }) => (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const mockSkillCards: SkillCard[] = [
  {
    id: 'frontend-design',
    name: 'frontend-design',
    displayName: 'Frontend Design',
    description: 'Create stunning interfaces',
    category: 'creative-design',
    useCases: [],
    exampleCommand: '/frontend-design',
    exampleOutput: '',
    isOfficial: true,
    tags: ['design'],
  },
  {
    id: 'code-review',
    name: 'code-review',
    displayName: 'Code Review',
    description: 'Review code quality',
    category: 'development',
    useCases: [],
    exampleCommand: '/code-review',
    exampleOutput: '',
    isOfficial: false,
    tags: ['review'],
  },
];

const mockRecommendations: SkillRecommendation[] = [
  {
    id: 'web-dev',
    scenario: 'Web Development',
    scenarioIcon: '🌐',
    description: 'Building web applications',
    recommendedSkills: [
      { skillId: 'frontend-design', reason: 'Great for UI' },
      { skillId: 'code-review', reason: 'Ensures quality' },
    ],
  },
  {
    id: 'code-quality',
    scenario: 'Code Quality',
    scenarioIcon: '✅',
    description: 'Improving code quality',
    recommendedSkills: [
      { skillId: 'code-review', reason: 'Catches bugs early' },
    ],
  },
];

describe('SkillRecommender', () => {
  it('renders section title', () => {
    render(
      <SkillRecommender
        recommendations={mockRecommendations}
        skillCards={mockSkillCards}
      />
    );
    expect(screen.getByText('找到适合你的 Skill')).toBeInTheDocument();
  });

  it('renders scenario buttons', () => {
    render(
      <SkillRecommender
        recommendations={mockRecommendations}
        skillCards={mockSkillCards}
      />
    );
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('Code Quality')).toBeInTheDocument();
  });

  it('shows no recommendations initially', () => {
    render(
      <SkillRecommender
        recommendations={mockRecommendations}
        skillCards={mockSkillCards}
      />
    );
    expect(screen.queryByText('推荐的 Skills')).not.toBeInTheDocument();
  });

  it('shows recommendations after selecting a scenario', () => {
    render(
      <SkillRecommender
        recommendations={mockRecommendations}
        skillCards={mockSkillCards}
      />
    );
    fireEvent.click(screen.getByText('Web Development'));
    expect(screen.getByText(/推荐的 Skills/)).toBeInTheDocument();
    expect(screen.getByText('Frontend Design')).toBeInTheDocument();
    expect(screen.getByText('Code Review')).toBeInTheDocument();
  });

  it('supports multi-select scenarios', () => {
    render(
      <SkillRecommender
        recommendations={mockRecommendations}
        skillCards={mockSkillCards}
      />
    );
    fireEvent.click(screen.getByText('Web Development'));
    fireEvent.click(screen.getByText('Code Quality'));
    expect(screen.getByText('强烈推荐')).toBeInTheDocument();
  });

  it('deselects scenario on second click', () => {
    render(
      <SkillRecommender
        recommendations={mockRecommendations}
        skillCards={mockSkillCards}
      />
    );
    fireEvent.click(screen.getByText('Web Development'));
    expect(screen.getByText(/推荐的 Skills/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Web Development'));
    expect(screen.queryByText(/推荐的 Skills/)).not.toBeInTheDocument();
  });

  it('calls onSkillClick callback', () => {
    const onSkillClick = vi.fn();
    render(
      <SkillRecommender
        recommendations={mockRecommendations}
        skillCards={mockSkillCards}
        onSkillClick={onSkillClick}
      />
    );
    fireEvent.click(screen.getByText('Web Development'));
    fireEvent.click(screen.getByText('Frontend Design'));
    expect(onSkillClick).toHaveBeenCalledWith('frontend-design');
  });

  it('shows recommendation reasons', () => {
    render(
      <SkillRecommender
        recommendations={mockRecommendations}
        skillCards={mockSkillCards}
      />
    );
    fireEvent.click(screen.getByText('Web Development'));
    expect(screen.getByText('Great for UI')).toBeInTheDocument();
    expect(screen.getByText('Ensures quality')).toBeInTheDocument();
  });

  it('shows official badge for official skills', () => {
    render(
      <SkillRecommender
        recommendations={mockRecommendations}
        skillCards={mockSkillCards}
      />
    );
    fireEvent.click(screen.getByText('Web Development'));
    expect(screen.getByText('官方')).toBeInTheDocument();
  });
});
