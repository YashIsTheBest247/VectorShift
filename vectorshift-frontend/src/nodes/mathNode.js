// mathNode.js
// Performs arithmetic operations on two numeric inputs.

import { useState } from 'react';
import { BaseNode, fieldStyles, NODE_COLORS } from './BaseNode';

const OPERATIONS = [
  { value: 'add',      label: 'Add',       symbol: '+' },
  { value: 'subtract', label: 'Subtract',  symbol: '−' },
  { value: 'multiply', label: 'Multiply',  symbol: '×' },
  { value: 'divide',   label: 'Divide',    symbol: '÷' },
  { value: 'modulo',   label: 'Modulo',    symbol: '%' },
  { value: 'power',    label: 'Power',     symbol: 'xⁿ' },
];

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');
  const colors = NODE_COLORS['math'];

  const currentOp = OPERATIONS.find((o) => o.value === operation) || OPERATIONS[0];

  return (
    <BaseNode
      id={id}
      nodeType="math"
      label="Math"
      inputs={[
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' },
      ]}
      outputs={[{ id: 'result', label: 'Result' }]}
    >
      <div style={{ ...fieldStyles.fieldGroup, textAlign: 'center' }}>
        {/* Big operator symbol */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: 800,
            color: colors.accent,
            lineHeight: 1,
            marginBottom: '6px',
          }}
        >
          {currentOp.symbol}
        </div>
        <label style={fieldStyles.label}>Operation</label>
        <select
          style={fieldStyles.select}
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          {OPERATIONS.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label} ({op.symbol})
            </option>
          ))}
        </select>
      </div>
    </BaseNode>
  );
};
