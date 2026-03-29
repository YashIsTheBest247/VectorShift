// loggerNode.js
// Logs pipeline data for debugging; configurable log level and label.

import { useState } from 'react';
import { BaseNode, fieldStyles, NODE_COLORS } from './BaseNode';

const LOG_LEVELS = [
  { value: 'info',    label: 'ℹ Info',    color: '#3b82f6' },
  { value: 'debug',   label: '🐛 Debug',  color: '#8b5cf6' },
  { value: 'warn',    label: '⚠ Warn',   color: '#f59e0b' },
  { value: 'error',   label: '✖ Error',  color: '#ef4444' },
];

const FAKE_LOGS = [
  '{"status": "ok", "value": 42}',
  '"Hello, pipeline!"',
  '[1, 2, 3, ...]',
];

export const LoggerNode = ({ id, data }) => {
  const [logLabel, setLogLabel] = useState(data?.logLabel || 'Debug Output');
  const [logLevel, setLogLevel] = useState(data?.logLevel || 'info');
  const [logIdx] = useState(() => Math.floor(Math.random() * FAKE_LOGS.length));
  const colors = NODE_COLORS['logger'];
  const currentLevel = LOG_LEVELS.find((l) => l.value === logLevel) || LOG_LEVELS[0];

  return (
    <BaseNode
      id={id}
      nodeType="logger"
      label="Logger"
      inputs={[{ id: 'data', label: 'Data' }]}
      outputs={[{ id: 'passthrough', label: 'Passthrough' }]}
    >
      <div style={fieldStyles.fieldGroup}>
        <label style={fieldStyles.label}>Label</label>
        <input
          style={fieldStyles.input}
          type="text"
          value={logLabel}
          onChange={(e) => setLogLabel(e.target.value)}
          placeholder="Log label..."
        />
      </div>
      <div style={fieldStyles.fieldGroup}>
        <label style={fieldStyles.label}>Log Level</label>
        <select
          style={{ ...fieldStyles.select, color: currentLevel.color, fontWeight: 700 }}
          value={logLevel}
          onChange={(e) => setLogLevel(e.target.value)}
        >
          {LOG_LEVELS.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mini "console" preview */}
      <div
        style={{
          marginTop: '6px',
          background: '#0f172a',
          borderRadius: '6px',
          padding: '6px 8px',
          fontFamily: "'Fira Code', 'Courier New', monospace",
          fontSize: '10px',
          color: currentLevel.color,
          lineHeight: 1.5,
        }}
      >
        <span style={{ color: '#475569' }}>[{currentLevel.value.toUpperCase()}] </span>
        <span>{logLabel}: </span>
        <span style={{ color: '#94a3b8' }}>{FAKE_LOGS[logIdx]}</span>
      </div>
    </BaseNode>
  );
};
