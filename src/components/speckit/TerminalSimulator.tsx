import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface TerminalCommand {
  id: string;
  command: string;
  output: string[];
  outputDelay: number;
  tutorialStepId: string;
  successMessage?: string;
}

interface TerminalSimulatorProps {
  commands: TerminalCommand[];
  prompt?: string;
  welcomeMessage?: string;
  onCommandComplete?: (commandId: string) => void;
}

interface OutputLine {
  id: string;
  type: 'input' | 'output' | 'success' | 'error';
  content: string;
}

export function TerminalSimulator({
  commands,
  prompt = '$ ',
  welcomeMessage,
  onCommandComplete,
}: TerminalSimulatorProps) {
  const [input, setInput] = useState('');
  const [outputLines, setOutputLines] = useState<OutputLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const lineIdCounter = useRef(0);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Show welcome message on mount
  useEffect(() => {
    if (welcomeMessage) {
      setOutputLines([
        {
          id: `line-${lineIdCounter.current++}`,
          type: 'output',
          content: welcomeMessage,
        },
      ]);
    }
  }, [welcomeMessage]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [outputLines]);

  // Match command (exact or regex)
  const matchCommand = useCallback(
    (userInput: string): TerminalCommand | null => {
      const trimmedInput = userInput.trim();
      for (const cmd of commands) {
        if (cmd.command === trimmedInput) {
          return cmd;
        }
        try {
          const regex = new RegExp(cmd.command);
          if (regex.test(trimmedInput)) {
            return cmd;
          }
        } catch {
          // Not a valid regex, skip
        }
      }
      return null;
    },
    [commands]
  );

  // Animate output lines
  const animateOutput = useCallback(
    async (command: TerminalCommand, userInput: string) => {
      setIsAnimating(true);

      // Add user input line
      setOutputLines((prev) => [
        ...prev,
        {
          id: `line-${lineIdCounter.current++}`,
          type: 'input',
          content: `${prompt}${userInput}`,
        },
      ]);

      // Add output lines one by one
      for (const line of command.output) {
        await new Promise((resolve) => setTimeout(resolve, command.outputDelay));
        setOutputLines((prev) => [
          ...prev,
          {
            id: `line-${lineIdCounter.current++}`,
            type: 'output',
            content: line,
          },
        ]);
      }

      // Add success message if exists
      if (command.successMessage) {
        await new Promise((resolve) => setTimeout(resolve, command.outputDelay));
        setOutputLines((prev) => [
          ...prev,
          {
            id: `line-${lineIdCounter.current++}`,
            type: 'success',
            content: command.successMessage!,
          },
        ]);
      }

      setIsAnimating(false);
      onCommandComplete?.(command.id);
    },
    [prompt, onCommandComplete]
  );

  // Handle command submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isAnimating) return;

      const matchedCommand = matchCommand(input);

      if (matchedCommand) {
        animateOutput(matchedCommand, input);
      } else {
        // Show error for unrecognized command
        const availableCommands = commands.slice(0, 2).map((c) => c.command);
        setOutputLines((prev) => [
          ...prev,
          {
            id: `line-${lineIdCounter.current++}`,
            type: 'input',
            content: `${prompt}${input}`,
          },
          {
            id: `line-${lineIdCounter.current++}`,
            type: 'error',
            content: `命令未识别。请尝试: ${availableCommands.join(', ')}`,
          },
        ]);
      }

      // Update command history
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      setInput('');
    },
    [input, isAnimating, matchCommand, animateOutput, commands, prompt]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length === 0) return;
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex === -1) return;
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    },
    [commandHistory, historyIndex]
  );

  // Focus input when clicking terminal area
  const handleTerminalClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      ref={terminalRef}
      onClick={handleTerminalClick}
      className="bg-gray-900 text-green-400 font-mono text-sm rounded-lg p-4 h-96 overflow-auto cursor-text"
    >
      {/* Output lines */}
      <div className="space-y-1">
        {outputLines.map((line) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={
              line.type === 'input'
                ? 'text-white'
                : line.type === 'success'
                ? 'text-[#FFD700]'
                : line.type === 'error'
                ? 'text-[#C41E3A]'
                : 'text-green-400'
            }
          >
            {line.content}
          </motion.div>
        ))}
      </div>

      {/* Input line */}
      {!isAnimating && (
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-white mr-2">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isAnimating}
            className="flex-1 bg-transparent outline-none text-white caret-white"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      )}
    </div>
  );
}
