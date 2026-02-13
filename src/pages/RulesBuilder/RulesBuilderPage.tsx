import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { RuleTemplateSelector } from '../../components/rules/RuleTemplateSelector';
import { RuleBuilderForm } from '../../components/rules/RuleBuilderForm';
import { RulePreview } from '../../components/rules/RulePreview';
import { RuleExamples } from '../../components/rules/RuleExamples';
import { RuleTester } from '../../components/rules/RuleTester';
import { getAllTemplates, getTemplateById } from '../../data/cursor-rule-templates';
import { PageSEO } from '../../components/common/PageSEO';

export function RulesBuilderPage() {
  const templates = useMemo(() => getAllTemplates(), []);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[0]?.id || '');
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState<'preview' | 'test'>('preview');

  const currentTemplate = useMemo(() => {
    return getTemplateById(selectedTemplateId) || templates[0];
  }, [selectedTemplateId, templates]);

  const generateRulesContent = useMemo(() => {
    const lines: string[] = [];
    lines.push('# Cursor Rules');
    lines.push(`# Generated from template: ${currentTemplate?.name || 'Custom'}`);
    lines.push('');

    if (!currentTemplate) return lines.join('\n');

    // Generate content based on template type
    switch (currentTemplate.id) {
      case 'coding-style':
        lines.push('# Code Style');
        const indent = formValues.indentation === 'tabs'
          ? 'tabs'
          : formValues.indentation?.includes('4')
            ? '4 spaces'
            : '2 spaces';
        lines.push(`- Use ${indent} for indentation`);
        lines.push(`- ${formValues.semicolons ? 'Always use semicolons' : 'Omit semicolons when possible'}`);
        lines.push(`- Prefer ${formValues.quotes || 'single'} quotes for strings`);
        lines.push(`- Keep lines under ${formValues.maxLineLength || '100'} characters`);
        if (formValues.trailingComma) {
          lines.push(`- Use ${formValues.trailingComma} trailing commas`);
        }
        break;

      case 'framework':
        lines.push('# Tech Stack');
        if (formValues.language) {
          lines.push(`- Primary Language: ${formValues.language}`);
        }
        if (formValues.frontend) {
          lines.push(`- Frontend Framework: ${formValues.frontend}`);
        }
        if (formValues.styling) {
          lines.push(`- Styling: ${formValues.styling}`);
        }
        if (formValues.stateManagement && formValues.stateManagement !== 'none') {
          lines.push(`- State Management: ${formValues.stateManagement}`);
        }
        break;

      case 'communication':
        lines.push('# Communication Style');
        if (formValues.tone) {
          lines.push(`- Tone: ${formValues.tone}`);
        }
        if (formValues.comments) {
          lines.push(`- Comments: ${formValues.comments}`);
        }
        if (formValues.explainReasoning !== undefined) {
          lines.push(`- ${formValues.explainReasoning ? 'Explain reasoning for suggestions' : 'Focus on solutions only'}`);
        }
        if (formValues.suggestAlternatives !== undefined) {
          lines.push(`- ${formValues.suggestAlternatives ? 'Provide alternative approaches when relevant' : 'Stick to the best solution'}`);
        }
        if (formValues.includeExamples !== undefined) {
          lines.push(`- ${formValues.includeExamples ? 'Include practical usage examples' : 'Keep explanations concise without examples'}`);
        }
        break;

      case 'custom':
        if (formValues.customRules) {
          lines.push(formValues.customRules);
        }
        break;
    }

    lines.push('');
    lines.push('# General Guidelines');
    lines.push('- Write clean, readable code');
    lines.push('- Follow existing project conventions');
    lines.push('- Consider performance implications');

    return lines.join('\n');
  }, [currentTemplate, formValues]);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setFormValues({});
  };

  const handleFormChange = (fieldId: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageSEO
        title="规则生成器"
        description="通过表单引导创建个性化的 .cursorrules 配置文件, 定制你的 AI 编程助手。"
        path="/rules"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            .cursorrules 生成器
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            创建个性化的 Cursor 规则文件，让 AI 更好地理解你的偏好
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Template Selector */}
            <Card>
              <CardHeader>
                <CardTitle>选择规则类型</CardTitle>
                <CardDescription>选择适合你项目的规则模板</CardDescription>
              </CardHeader>
              <CardContent>
                <RuleTemplateSelector
                  templates={templates}
                  selectedTemplateId={selectedTemplateId}
                  onSelect={handleTemplateChange}
                />
              </CardContent>
            </Card>

            {/* Form Fields */}
            <Card>
              <CardHeader>
                <CardTitle>配置选项</CardTitle>
                <CardDescription>根据你的偏好自定义规则</CardDescription>
              </CardHeader>
              <CardContent>
                {currentTemplate && (
                  <RuleBuilderForm
                    template={currentTemplate}
                    values={formValues}
                    onChange={handleFormChange}
                  />
                )}
              </CardContent>
            </Card>

            {/* Examples */}
            {currentTemplate?.examples && currentTemplate.examples.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>示例</CardTitle>
                  <CardDescription>查看规则的应用示例</CardDescription>
                </CardHeader>
                <CardContent>
                  <RuleExamples examples={currentTemplate.examples} />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'preview' ? 'primary' : 'outline'}
                onClick={() => setActiveTab('preview')}
                className="flex-1"
              >
                规则预览
              </Button>
              <Button
                variant={activeTab === 'test' ? 'primary' : 'outline'}
                onClick={() => setActiveTab('test')}
                className="flex-1"
              >
                测试规则
              </Button>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'preview' ? (
              <Card>
                <CardHeader>
                  <CardTitle>生成的规则</CardTitle>
                  <CardDescription>复制此内容到你的 .cursorrules 文件</CardDescription>
                </CardHeader>
                <CardContent>
                  <RulePreview content={generateRulesContent} />

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                      如何使用
                    </h4>
                    <ol className="text-sm text-blue-800 dark:text-blue-400 space-y-1 list-decimal list-inside">
                      <li>复制上面的规则内容</li>
                      <li>在项目根目录创建 .cursorrules 文件</li>
                      <li>粘贴规则内容并保存</li>
                      <li>重启 Cursor 使规则生效</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <RuleTester rulesContent={generateRulesContent} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
