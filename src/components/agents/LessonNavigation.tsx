import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

interface LessonInfo {
  title: string;
  path: string;
}

interface LessonNavigationProps {
  prev?: LessonInfo;
  next?: LessonInfo;
  parentPath: string;
  parentLabel: string;
}

export function LessonNavigation({
  prev,
  next,
  parentPath,
  parentLabel,
}: LessonNavigationProps) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
      <div>
        {prev ? (
          <Link to={prev.path}>
            <Button variant="outline" size="sm">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {prev.title}
              </span>
            </Button>
          </Link>
        ) : (
          <Link to={parentPath}>
            <Button variant="outline" size="sm">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {parentLabel}
              </span>
            </Button>
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link to={next.path}>
            <Button variant="primary" size="sm">
              <span className="flex items-center gap-1">
                {next.title}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
