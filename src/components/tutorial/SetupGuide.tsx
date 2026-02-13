import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../common/Card';

interface LLMProvider {
  id: string;
  name: string;
  description: string;
  isFree: boolean;
  setupUrl?: string;
}

interface SetupGuideProps {
  providers?: LLMProvider[];
}

const defaultProviders: LLMProvider[] = [
  {
    id: 'cursor-free',
    name: 'Cursor 免费版',
    description: '每月提供有限的快速请求额度，适合初学者体验。',
    isFree: true,
  },
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    description: 'Anthropic 的 Claude 模型，以安全性和可靠性著称。',
    isFree: false,
  },
  {
    id: 'gpt4',
    name: 'GPT-4 (OpenAI)',
    description: 'OpenAI 的 GPT-4 模型，功能强大，适用范围广。',
    isFree: false,
  },
  {
    id: 'custom-api',
    name: '自定义 API 密钥',
    description: '使用你自己的 OpenAI 或 Anthropic API 密钥。',
    isFree: false,
  },
];

export function SetupGuide({ providers = defaultProviders }: SetupGuideProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>配置 AI 模型</CardTitle>
        <CardDescription>
          选择你喜欢的 AI 模型来完成代码补全和对话功能
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#C41E3A] dark:hover:border-[#C41E3A] transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {provider.name}
                </h4>
                {provider.isFree ? (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full">
                    免费
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                    付费
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {provider.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            配置方法
          </h4>
          <ol className="text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside space-y-1">
            <li>打开 Cursor 设置 (Ctrl+,)</li>
            <li>进入 &quot;Cursor&quot; 选项卡</li>
            <li>选择 &quot;AI Model&quot;</li>
            <li>选择你喜欢的模型或输入 API 密钥</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}

export type { LLMProvider };
