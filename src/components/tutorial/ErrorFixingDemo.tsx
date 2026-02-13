import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { ProjectEditor } from '../simulator/ProjectEditor';

/**
 * 错误修复演示组件
 * 演示 Cursor 如何帮助识别和修复代码错误
 */

interface ErrorExample {
  id: string;
  title: string;
  description: string;
  errorCode: string;
  errorMessage: string;
  language: string;
  hint: string;
  fixedCode: string;
  explanation: string;
}

const errorExamples: ErrorExample[] = [
  {
    id: 'typescript-type-error',
    title: 'TypeScript 类型错误',
    description: '修复常见的 TypeScript 类型不匹配错误',
    errorCode: `interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function addTodo(todos: Todo[], text) {
  return [...todos, {
    id: Date.now(),
    text,
    completed: false
  }];
}`,
    errorMessage: "参数 'text' 隐式具有 'any' 类型",
    language: 'typescript',
    hint: '选中函数定义，按 Ctrl+K 输入"添加参数类型定义"',
    fixedCode: `interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function addTodo(todos: Todo[], text: string): Todo[] {
  return [...todos, {
    id: Date.now().toString(),
    text,
    completed: false
  }];
}`,
    explanation: '添加了 text 参数的类型注解 (string)，并修复了 id 类型不匹配的问题（将 number 转换为 string）',
  },
  {
    id: 'missing-dependency',
    title: 'React Hook 依赖项警告',
    description: '修复 useEffect 缺少依赖项的问题',
    errorCode: `import { useEffect, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos().then(data => setTodos(data));
  }, []);

  return <div>{todos.length} 个待办</div>;
}`,
    errorMessage: "React Hook useEffect 缺少依赖项: 'fetchTodos'",
    language: 'typescript',
    hint: '选中 useEffect 代码块，按 Ctrl+K 输入"修复 missing dependency 警告"',
    fixedCode: `import { useEffect, useState, useCallback } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return <div>{todos.length} 个待办</div>;
}`,
    explanation: '使用 useCallback 包装 fetchTodos 函数，并将其添加到 useEffect 的依赖数组中',
  },
  {
    id: 'accessibility-issue',
    title: '可访问性问题',
    description: '修复 JSX 中的可访问性警告',
    errorCode: `<div className="todo-item" onClick={toggleTodo}>
  <span>{todo.text}</span>
  <button onClick={deleteTodo}>
    <TrashIcon />
  </button>
</div>`,
    errorMessage: "元素的可交互性不明确，缺少 aria-label 和 role 属性",
    language: 'html',
    hint: '选中 div 元素，按 Ctrl+K 输入"添加可访问性属性"',
    fixedCode: `<div
  className="todo-item"
  onClick={toggleTodo}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && toggleTodo()}
  aria-label={todo.completed ? "标记为未完成" : "标记为完成"}
>
  <span>{todo.text}</span>
  <button
    onClick={(e) => { e.stopPropagation(); deleteTodo(); }}
    aria-label="删除待办"
  >
    <TrashIcon />
  </button>
</div>`,
    explanation: '添加了 role、tabIndex、aria-label 和键盘事件处理，使组件符合可访问性标准',
  },
];

export function ErrorFixingDemo() {
  const [selectedExample, setSelectedExample] = useState<ErrorExample>(errorExamples[0]);
  const [showFixed, setShowFixed] = useState(false);

  return (
    <div className="space-y-6">
      {/* 示例选择器 */}
      <div className="flex flex-wrap gap-2">
        {errorExamples.map((example) => (
          <button
            key={example.id}
            onClick={() => {
              setSelectedExample(example);
              setShowFixed(false);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedExample.id === example.id
                ? 'bg-[#C41E3A] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {example.title}
          </button>
        ))}
      </div>

      {/* 错误信息 */}
      <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium text-red-900 dark:text-red-300">错误信息</p>
              <p className="text-sm text-red-700 dark:text-red-400">{selectedExample.errorMessage}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 代码编辑器 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{selectedExample.title}</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {selectedExample.description}
              </p>
            </div>
            <Button
              variant={showFixed ? 'primary' : 'outline'}
              onClick={() => setShowFixed(!showFixed)}
            >
              {showFixed ? '查看原始代码' : '查看修复后的代码'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ProjectEditor
            initialCode={showFixed ? selectedExample.fixedCode : selectedExample.errorCode}
            language={selectedExample.language}
            readOnly={true}
            height="300px"
          />
        </CardContent>
      </Card>

      {/* 操作提示 */}
      {!showFixed && (
        <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-300">如何修复</p>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  {selectedExample.hint}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 修复说明 */}
      {showFixed && (
        <Card>
          <CardHeader>
            <CardTitle>修复说明</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedExample.explanation}
            </p>
          </CardContent>
        </Card>
      )}

      {/* 导航 */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            const currentIndex = errorExamples.findIndex(e => e.id === selectedExample.id);
            if (currentIndex > 0) {
              setSelectedExample(errorExamples[currentIndex - 1]);
              setShowFixed(false);
            }
          }}
          disabled={selectedExample.id === errorExamples[0].id}
        >
          上一个示例
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const currentIndex = errorExamples.findIndex(e => e.id === selectedExample.id);
            if (currentIndex < errorExamples.length - 1) {
              setSelectedExample(errorExamples[currentIndex + 1]);
              setShowFixed(false);
            }
          }}
          disabled={selectedExample.id === errorExamples[errorExamples.length - 1].id}
        >
          下一个示例
        </Button>
      </div>
    </div>
  );
}

export default ErrorFixingDemo;
