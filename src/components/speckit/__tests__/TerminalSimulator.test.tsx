import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TerminalSimulator } from '../TerminalSimulator';
import type { TerminalCommand } from '../TerminalSimulator';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
  },
}));

const mockCommands: TerminalCommand[] = [
  {
    id: 'test-cmd',
    command: 'specify init my-project --ai claude',
    output: ['Initializing project...', 'Project created successfully!'],
    outputDelay: 0,
    tutorialStepId: 'step-1',
    successMessage: 'Done!',
  },
  {
    id: 'install-cmd',
    command: 'uvx spec-kit',
    output: ['Installing spec-kit...'],
    outputDelay: 0,
    tutorialStepId: 'step-2',
  },
];

describe('TerminalSimulator', () => {
  it('renders with welcome message', () => {
    render(
      <TerminalSimulator
        commands={mockCommands}
        welcomeMessage="Welcome to the terminal!"
      />
    );
    expect(screen.getByText('Welcome to the terminal!')).toBeInTheDocument();
  });

  it('renders input field with default prompt', () => {
    render(<TerminalSimulator commands={mockCommands} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('renders input field with custom prompt', () => {
    render(<TerminalSimulator commands={mockCommands} prompt="> " />);
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('matches exact command and shows output', async () => {
    const onComplete = vi.fn();
    render(
      <TerminalSimulator
        commands={mockCommands}
        onCommandComplete={onComplete}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'specify init my-project --ai claude' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('Initializing project...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Project created successfully!')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Done!')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledWith('test-cmd');
    });
  });

  it('shows error hint for unrecognized command', () => {
    render(<TerminalSimulator commands={mockCommands} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'unknown-command' } });
    fireEvent.submit(input.closest('form')!);

    expect(screen.getByText(/命令未识别/)).toBeInTheDocument();
  });

  it('clears input after submission', () => {
    render(<TerminalSimulator commands={mockCommands} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'unknown-command' } });
    fireEvent.submit(input.closest('form')!);

    expect(input.value).toBe('');
  });

  it('navigates command history with arrow keys', () => {
    render(<TerminalSimulator commands={mockCommands} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    // Submit two commands
    fireEvent.change(input, { target: { value: 'first-cmd' } });
    fireEvent.submit(input.closest('form')!);
    fireEvent.change(input, { target: { value: 'second-cmd' } });
    fireEvent.submit(input.closest('form')!);

    // Press ArrowUp to get last command
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input.value).toBe('second-cmd');

    // Press ArrowUp again to get first command
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input.value).toBe('first-cmd');

    // Press ArrowDown to go back
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input.value).toBe('second-cmd');

    // Press ArrowDown again to clear
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input.value).toBe('');
  });

  it('does not submit empty input', () => {
    render(<TerminalSimulator commands={mockCommands} />);

    const input = screen.getByRole('textbox');
    fireEvent.submit(input.closest('form')!);

    // No output lines should be added (only welcome message if present)
    expect(screen.queryByText(/命令未识别/)).not.toBeInTheDocument();
  });
});
