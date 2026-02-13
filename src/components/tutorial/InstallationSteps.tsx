import { Card, CardContent } from '../common/Card';

interface InstallationStep {
  title: string;
  content: string;
  action?: boolean;
}

interface InstallationStepsProps {
  osName: string;
  steps: InstallationStep[];
  completedSteps: boolean[];
  onStepComplete: (stepIndex: number) => void;
  onDownload?: () => void;
}

export function InstallationSteps({
  osName,
  steps,
  completedSteps,
  onStepComplete,
  onDownload,
}: InstallationStepsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {osName} 安装步骤
      </h2>

      {steps.map((step, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  completedSteps[index]
                    ? 'bg-green-500 text-white'
                    : 'bg-[#C41E3A] text-white'
                }`}
              >
                {completedSteps[index] ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="font-semibold">{index + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{step.content}</p>

                {step.action && onDownload && (
                  <button
                    onClick={onDownload}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#C41E3A] text-white rounded-lg hover:bg-[#A01830] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    下载 Cursor for {osName}
                  </button>
                )}

                <div className="mt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedSteps[index]}
                      onChange={() => onStepComplete(index)}
                      className="w-4 h-4 rounded border-gray-300 text-[#C41E3A] focus:ring-[#C41E3A]"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">标记为已完成</span>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export type { InstallationStep };
