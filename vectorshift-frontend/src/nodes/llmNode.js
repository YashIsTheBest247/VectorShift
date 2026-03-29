// llmNode.js

import { BaseNode, fieldStyles } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      nodeType="llm"
      label="LLM"
      inputs={[
        { id: 'system', label: 'System Prompt' },
        { id: 'prompt', label: 'Prompt' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      <div style={{ ...fieldStyles.fieldGroup, textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
          Large Language Model
        </p>
        <div style={fieldStyles.badge('#f59e0b')}>
          GPT-4 / Claude / Gemini
        </div>
      </div>
    </BaseNode>
  );
};
