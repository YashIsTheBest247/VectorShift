// outputNode.js

import { useState } from 'react';
import { BaseNode, fieldStyles } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      nodeType="customOutput"
      label="Output"
      inputs={[{ id: 'value', label: 'Value' }]}
      outputs={[]}
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
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
