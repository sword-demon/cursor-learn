import type { CursorRuleTemplate } from '../../types';

interface RuleTemplateSelectorProps {
  templates: CursorRuleTemplate[];
  selectedTemplateId: string;
  onSelect: (templateId: string) => void;
}

export function RuleTemplateSelector({
  templates,
  selectedTemplateId,
  onSelect,
}: RuleTemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
              selectedTemplateId === template.id
                ? 'border-[#C41E3A] bg-[#C41E3A]/5'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="font-medium text-sm text-gray-900 dark:text-white">
              {template.name}
            </div>
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {templates.find((t) => t.id === selectedTemplateId)?.description}
      </p>
    </div>
  );
}
