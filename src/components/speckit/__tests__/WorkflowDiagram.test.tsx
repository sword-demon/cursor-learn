import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkflowDiagram } from '../WorkflowDiagram';
import type { WorkflowNode } from '../WorkflowDiagram';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockNodes: WorkflowNode[] = [
  {
    id: 'constitution',
    command: '/speckit.constitution',
    title: 'Constitution',
    description: 'Define project principles',
    detailContent: 'Detailed content about constitution',
    exampleInput: 'specify constitution',
    exampleOutput: 'constitution.md created',
    outputFiles: ['constitution.md'],
    order: 1,
    icon: 'shield',
  },
  {
    id: 'specify',
    command: '/speckit.specify',
    title: 'Specify',
    description: 'Write feature specification',
    detailContent: 'Detailed content about specify',
    exampleInput: 'specify "Add login feature"',
    exampleOutput: 'spec.md created',
    outputFiles: ['spec.md'],
    order: 2,
    icon: 'document',
  },
  {
    id: 'plan',
    command: '/speckit.plan',
    title: 'Plan',
    description: 'Generate implementation plan',
    detailContent: 'Detailed content about plan',
    exampleInput: '/speckit.plan',
    exampleOutput: 'plan.md created',
    outputFiles: ['plan.md', 'data-model.md'],
    order: 3,
    icon: 'map',
  },
];

describe('WorkflowDiagram', () => {
  it('renders all workflow nodes', () => {
    render(<WorkflowDiagram nodes={mockNodes} />);

    expect(screen.getByText('/speckit.constitution')).toBeInTheDocument();
    expect(screen.getByText('/speckit.specify')).toBeInTheDocument();
    expect(screen.getByText('/speckit.plan')).toBeInTheDocument();
  });

  it('renders nodes sorted by order', () => {
    const unorderedNodes = [mockNodes[2], mockNodes[0], mockNodes[1]];
    render(<WorkflowDiagram nodes={unorderedNodes} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('1');
    expect(buttons[1]).toHaveTextContent('2');
    expect(buttons[2]).toHaveTextContent('3');
  });

  it('renders node descriptions', () => {
    render(<WorkflowDiagram nodes={mockNodes} />);

    expect(screen.getByText('Define project principles')).toBeInTheDocument();
    expect(screen.getByText('Write feature specification')).toBeInTheDocument();
    expect(screen.getByText('Generate implementation plan')).toBeInTheDocument();
  });

  it('expands detail panel on node click', () => {
    render(<WorkflowDiagram nodes={mockNodes} />);

    // Detail panel should not be visible initially
    expect(screen.queryByText('Detailed content about constitution')).not.toBeInTheDocument();

    // Click the first node
    const firstNode = screen.getByText('/speckit.constitution').closest('button')!;
    fireEvent.click(firstNode);

    // Detail panel should now be visible
    expect(screen.getByText('Detailed content about constitution')).toBeInTheDocument();
    expect(screen.getByText('specify constitution')).toBeInTheDocument();
    expect(screen.getByText('constitution.md created')).toBeInTheDocument();
  });

  it('collapses detail panel when clicking same node again', () => {
    render(<WorkflowDiagram nodes={mockNodes} />);

    const firstNode = screen.getByText('/speckit.constitution').closest('button')!;

    // Click to expand
    fireEvent.click(firstNode);
    expect(screen.getByText('Detailed content about constitution')).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(firstNode);
    expect(screen.queryByText('Detailed content about constitution')).not.toBeInTheDocument();
  });

  it('switches detail panel when clicking different node', () => {
    render(<WorkflowDiagram nodes={mockNodes} />);

    // Click first node
    const firstNode = screen.getByText('/speckit.constitution').closest('button')!;
    fireEvent.click(firstNode);
    expect(screen.getByText('Detailed content about constitution')).toBeInTheDocument();

    // Click second node
    const secondNode = screen.getByText('/speckit.specify').closest('button')!;
    fireEvent.click(secondNode);
    expect(screen.queryByText('Detailed content about constitution')).not.toBeInTheDocument();
    expect(screen.getByText('Detailed content about specify')).toBeInTheDocument();
  });

  it('calls onNodeClick callback', () => {
    const onNodeClick = vi.fn();
    render(<WorkflowDiagram nodes={mockNodes} onNodeClick={onNodeClick} />);

    const firstNode = screen.getByText('/speckit.constitution').closest('button')!;
    fireEvent.click(firstNode);

    expect(onNodeClick).toHaveBeenCalledWith('constitution');
  });

  it('renders output files in detail panel', () => {
    render(<WorkflowDiagram nodes={mockNodes} />);

    // Click the plan node which has multiple output files
    const planNode = screen.getByText('/speckit.plan').closest('button')!;
    fireEvent.click(planNode);

    expect(screen.getByText('plan.md')).toBeInTheDocument();
    expect(screen.getByText('data-model.md')).toBeInTheDocument();
  });

  it('uses responsive grid layout', () => {
    const { container } = render(<WorkflowDiagram nodes={mockNodes} />);

    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-7');
  });
});
