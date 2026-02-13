import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizQuestion } from '../../types';

interface QuizCardProps {
  quiz: QuizQuestion;
  onComplete?: (correct: boolean) => void;
}

export function QuizCard({ quiz, onComplete }: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === quiz.correctAnswer;

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    onComplete?.(selected === quiz.correctAnswer);
  };

  const handleReset = () => {
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        {quiz.question}
      </h4>

      <div className="space-y-2 mb-4">
        {quiz.options.map((option) => {
          const isSelected = selected === option.id;
          const showResult = submitted;
          const optionCorrect = option.id === quiz.correctAnswer;

          let borderColor = 'border-gray-200 dark:border-gray-600';
          if (showResult && optionCorrect) borderColor = 'border-green-500';
          else if (showResult && isSelected && !optionCorrect) borderColor = 'border-red-500';
          else if (isSelected) borderColor = 'border-[#C41E3A]';

          return (
            <button
              key={option.id}
              onClick={() => !submitted && setSelected(option.id)}
              disabled={submitted}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${borderColor} ${
                !submitted ? 'hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer' : ''
              }`}
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">{option.text}</span>
            </button>
          );
        })}
      </div>

      {/* Submit / Reset */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="px-4 py-2 rounded-lg bg-[#C41E3A] text-white text-sm font-medium disabled:opacity-50 hover:bg-[#A01830] transition-colors"
        >
          提交答案
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              isCorrect
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}
          >
            <p className={`text-sm font-medium mb-1 ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
              {isCorrect ? '回答正确!' : '回答错误'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{quiz.explanation}</p>
            {!isCorrect && (
              <button
                onClick={handleReset}
                className="mt-2 text-sm text-[#C41E3A] hover:underline"
              >
                重新作答
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}