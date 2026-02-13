interface BeginnerTipProps {
  title: string;
  children: React.ReactNode;
}

export function BeginnerTipCard({ title, children }: BeginnerTipProps) {
  return (
    <div className="rounded-lg border border-[#FFD700]/30 bg-[#FFD700]/5 dark:bg-[#FFD700]/10 p-4">
      <div className="flex gap-3">
        {/* Lightbulb icon */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-[#D4AF37]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM4 11a1 1 0 100-2H3a1 1 0 000 2h1zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3zM10 4a6 6 0 00-3.47 10.89.5.5 0 01.22.41v.2a.5.5 0 00.5.5h5.5a.5.5 0 00.5-.5v-.2a.5.5 0 01.22-.41A6 6 0 0010 4z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-[#8B6914] dark:text-[#FFD700] mb-1">
            {title}
          </h4>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
