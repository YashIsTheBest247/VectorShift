// conditionNode.js
// If/else branching with a configurable condition expression.

import { useState } from 'react';
import { BaseNode, fieldStyles, NODE_COLORS } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'input > 0');
  const colors = NODE_COLORS['condition'];

  return (
    <BaseNode
      id={id}
      nodeType="condition"
      label="Condition"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[
        { id: 'true', label: 'True ✓' },
        { id: 'false', label: 'False ✗' },
      ]}
    >
      <div style={fieldStyles.fieldGroup}>
        <label style={fieldStyles.label}>If Condition</label>
        <input
          style={{
            ...fieldStyles.input,
            fontFamily: "'Fira Code', 'Courier New', monospace",
            fontSize: '12px',
            borderColor: colors.accent + '66',
          }}
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. value > 10"
        />
      </div>

      {/* Visual branch indicator */}
      <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
        <div
          style={{
            flex: 1,
            background: '#d1fae522',
            border: '1px solid #10b98144',
            borderRadius: '6px',
            padding: '4px 6px',
            textAlign: 'center',
            fontSize: '11px',
            fontWeight: 600,
            color: '#10b981',
          }}
        >
          ✓ True
        </div>
        <div
          style={{
            flex: 1,
            background: '#fee2e222',
            border: '1px solid #ef444444',
            borderRadius: '6px',
            padding: '4px 6px',
            textAlign: 'center',
            fontSize: '11px',
            fontWeight: 600,
            color: '#ef4444',
          }}
        >
          ✗ False
        </div>
      </div>
    </BaseNode>
  );
};
