import { useState } from 'react';
import { Button } from '../common/Button';

interface RuleTesterProps {
  rulesContent: string;
}

interface TestMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function RuleTester({ rulesContent }: RuleTesterProps) {
  const [messages, setMessages] = useState<TestMessage[]>([
    {
      id: '1',
      role: 'ai',
      content: '你好！我是你的 AI 编程助手。我已经读取了你的 .cursorrules 配置。请问有什么可以帮你的吗？',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMockResponse = (userInput: string): string => {
    // Simulate AI response based on rules content
    const rules = rulesContent.toLowerCase();

    if (rules.includes('react')) {
      return `基于你的 React 配置，这是一个函数组件示例：

\`\`\`tsx
import React from 'react';

interface Props {
  title: string;
}

export const ExampleComponent: React.FC<Props> = ({ title }) => {
  return (
    <div className="p-4">
      <h1>{title}</h1>
    </div>
  );
};
\`\`\`

我使用了 TypeScript 接口定义 props，并按照你的样式配置添加了 className。`;
    }

    if (rules.includes('vue')) {
      return `基于你的 Vue 配置，这是一个使用 Composition API 的组件：

\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  title: string;
}>();

const count = ref(0);
</script>

<template>
  <div class="p-4">
    <h1>{{ title }}</h1>
    <button @click="count++">Count: {{ count }}</button>
  </div>
</template>
\`\`\``;
    }

    if (userInput.toLowerCase().includes('style') || userInput.toLowerCase().includes('格式')) {
      if (rules.includes('2 space') || rules.includes('spaces-2')) {
        return '根据你的代码风格规则，我使用 2 个空格缩进。这样可以保持代码紧凑，同时保持良好的可读性。';
      }
      if (rules.includes('4 space') || rules.includes('spaces-4')) {
        return '根据你的代码风格规则，我使用 4 个空格缩进。这提供了更清晰的代码层级结构。';
      }
      if (rules.includes('semicolon') || rules.includes('分号')) {
        if (rules.includes('omit') || !rules.includes('always use')) {
          return '根据你的偏好，我会省略不必要的分号，利用 JavaScript 的自动分号插入机制。';
        }
        return '根据你的偏好，我确保每个语句都以分号结尾。';
      }
    }

    if (rules.includes('explain') || rules.includes('解释')) {
      return `我来详细解释一下这个概念：

## 核心概念
这是一个编程中的基本概念，理解它对于后续学习非常重要。

## 为什么重要
1. 提高代码可维护性
2. 减少潜在的错误
3. 使代码更容易被其他开发者理解

## 实现方式
\`\`\`
// 示例代码
const example = () => {
  // 遵循你的代码风格
  return true;
};
\`\`\`

希望这个解释对你有帮助！`;
    }

    if (rules.includes('concise') || rules.includes('简洁')) {
      return '这是一个简洁的实现：\n\n```ts\nconst result = data.map(x => x.value).filter(Boolean);\n```';
    }

    return '我已经根据你的 .cursorrules 配置生成了响应。如果你需要更具体的示例或有其他问题，请告诉我！';
  };

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: TestMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const aiMessage: TestMessage = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      content: generateMockResponse(userMessage.content),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsGenerating(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-white">规则测试器</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          模拟 AI 如何根据你的规则回复
        </p>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-[#C41E3A] text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {isGenerating && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息测试 AI 回复..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent"
            disabled={isGenerating}
          />
          <Button onClick={handleSend} disabled={isGenerating || !input.trim()}>
            发送
          </Button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          提示: 尝试询问关于代码风格的问题，观察 AI 如何根据你的规则回复
        </p>
      </div>
    </div>
  );
}
