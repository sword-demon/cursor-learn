import { Button } from '../common/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../common/Card';

interface TutorialCompletionProps {
  tutorialTitle: string;
  isCompleted: boolean;
  onComplete: () => void;
  nextTutorial?: {
    title: string;
    path: string;
  };
  accomplishments?: string[];
}

export function TutorialCompletion({
  tutorialTitle,
  isCompleted,
  onComplete,
  nextTutorial,
  accomplishments = [],
}: TutorialCompletionProps) {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
          {isCompleted ? (
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-[#C41E3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <CardTitle>
          {isCompleted ? '已完成' : '即将完成'}: {tutorialTitle}
        </CardTitle>
        <CardDescription>
          {isCompleted
            ? '恭喜你完成了本教程！继续保持学习的热情。'
            : '完成本教程后，你将掌握 Cursor 的基础安装和配置。'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {accomplishments.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              你将学会:
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {accomplishments.map((item, index) => (
                <li key={index} className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={onComplete}
            disabled={isCompleted}
            leftIcon={
              isCompleted ? undefined : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )
            }
          >
            {isCompleted ? '已完成' : '标记为完成'}
          </Button>

          {nextTutorial && !isCompleted && (
            <Button
              size="lg"
              variant="outline"
              onClick={() => {}}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              }
            >
              继续: {nextTutorial.title}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
