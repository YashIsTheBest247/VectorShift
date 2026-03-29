// inputNode.js

import { useState } from 'react';
import { BaseNode, fieldStyles } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      nodeType="customInput"
      label="Input"
      inputs={[]}
      outputs={[{ id: 'value', label: 'Value' }]}
    >
      <div style={fieldStyles.fieldGroup}>
        <label style={fieldStyles.label}>Name</label>
        <input
          style={fieldStyles.input}
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </div>
      <div style={fieldStyles.fieldGroup}>
        <label style={fieldStyles.label}>Type</label>
        <select
          style={fieldStyles.select}
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
