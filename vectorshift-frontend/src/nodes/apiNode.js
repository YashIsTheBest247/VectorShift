// apiNode.js
// Makes HTTP API calls with configurable method, URL, and headers.

import { useState } from 'react';
import { BaseNode, fieldStyles } from './BaseNode';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const METHOD_COLORS = {
  GET: '#10b981',
  POST: '#6366f1',
  PUT: '#f59e0b',
  PATCH: '#8b5cf6',
  DELETE: '#ef4444',
};

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/endpoint');
  const [method, setMethod] = useState(data?.method || 'GET');

  const methodColor = METHOD_COLORS[method] || '#6b7280';

  return (
    <BaseNode
      id={id}
      nodeType="api"
      label="API Call"
      inputs={[
        { id: 'body', label: 'Body / Params' },
        { id: 'headers', label: 'Headers' },
      ]}
      outputs={[
        { id: 'response', label: 'Response' },
        { id: 'status', label: 'Status Code' },
      ]}
    >
      <div style={fieldStyles.row}>
        <div style={{ width: '68px', flexShrink: 0 }}>
          <label style={fieldStyles.label}>Method</label>
          <select
            style={{
              ...fieldStyles.select,
              color: methodColor,
              fontWeight: 700,
              fontSize: '11px',
            }}
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            {METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={fieldStyles.label}>URL</label>
          <input
            style={{ ...fieldStyles.input, fontSize: '11px' }}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>
    </BaseNode>
  );
};
