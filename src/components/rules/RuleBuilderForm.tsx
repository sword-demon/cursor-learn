import type { CursorRuleTemplate, RuleField } from '../../types';

interface RuleBuilderFormProps {
  template: CursorRuleTemplate;
  values: Record<string, any>;
  onChange: (fieldId: string, value: any) => void;
}

export function RuleBuilderForm({ template, values, onChange }: RuleBuilderFormProps) {
  const renderField = (field: RuleField) => {
    const value = values[field.id] ?? field.defaultValue ?? '';

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent transition-colors"
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent transition-colors resize-y"
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent transition-colors"
          >
            <option value="">请选择...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => {
              const selectedValues = Array.isArray(value) ? value : [];
              const isSelected = selectedValues.includes(option.value);
              return (
                <label
                  key={option.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...selectedValues, option.value]
                        : selectedValues.filter((v) => v !== option.value);
                      onChange(field.id, newValues);
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-[#C41E3A] focus:ring-[#C41E3A]"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        );

      case 'boolean':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => onChange(field.id, e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#C41E3A] focus:ring-[#C41E3A]"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">启用</span>
          </label>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {template.fields.map((field) => (
        <div key={field.id}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {field.label}
            {field.required && <span className="text-[#C41E3A] ml-1">*</span>}
          </label>
          {renderField(field)}
        </div>
      ))}
    </div>
  );
}
