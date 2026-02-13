import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../common/Card';

interface TroubleshootingItem {
  title: string;
  description: string;
  solution?: string;
}

interface TroubleshootingPanelProps {
  items?: TroubleshootingItem[];
}

const defaultTroubleshootingItems: TroubleshootingItem[] = [
  {
    title: '安装程序无法打开',
    description: '确保你下载的是正确版本的安装包。如果问题持续，尝试以管理员身份运行安装程序。',
  },
  {
    title: '启动后白屏或崩溃',
    description: '检查显卡驱动是否最新，或尝试使用 --disable-gpu 参数启动 Cursor。',
  },
  {
    title: '无法登录账号',
    description: '确保网络连接正常。如果在中国大陆，可能需要配置代理才能正常登录。',
  },
];

export function TroubleshootingPanel({ items = defaultTroubleshootingItems }: TroubleshootingPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>常见问题</CardTitle>
        <CardDescription>安装过程中可能遇到的问题及解决方案</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index}>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export type { TroubleshootingItem };
