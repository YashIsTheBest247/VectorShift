// filterNode.js
// Filters data by applying a condition on a specified field.

import { useState } from 'react';
import { BaseNode, fieldStyles } from './BaseNode';

const OPERATORS = [
  { value: 'eq',         label: '== equals' },
  { value: 'neq',        label: '!= not equals' },
  { value: 'gt',         label: '> greater than' },
  { value: 'gte',        label: '>= greater or equal' },
  { value: 'lt',         label: '< less than' },
  { value: 'lte',        label: '<= less or equal' },
  { value: 'contains',   label: '⊃ contains' },
  { value: 'startsWith', label: '↵ starts with' },
  { value: 'endsWith',   label: '→ ends with' },
];

export const FilterNode = ({ id, data }) => {
  const [field, setField] = useState(data?.field || 'value');
  const [operator, setOperator] = useState(data?.operator || 'eq');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');

  return (
    <BaseNode
      id={id}
      nodeType="filter"
      label="Filter"
      inputs={[{ id: 'data', label: 'Data' }]}
      outputs={[
        { id: 'pass', label: 'Pass ✓' },
        { id: 'fail', label: 'Fail ✗' },
      ]}
    >
      <div style={fieldStyles.fieldGroup}>
        <label style={fieldStyles.label}>Field</label>
        <input
          style={fieldStyles.input}
          type="text"
          value={field}
          onChange={(e) => setField(e.target.value)}
          placeholder="e.g. status, name"
        />
      </div>
      <div style={fieldStyles.fieldGroup}>
        <label style={fieldStyles.label}>Operator</label>
        <select
          style={fieldStyles.select}
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          {OPERATORS.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      </div>
      <div style={fieldStyles.fieldGroup}>
        <label style={fieldStyles.label}>Value</label>
        <input
          style={fieldStyles.input}
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Compare value..."
        />
      </div>
    </BaseNode>
  );
};
