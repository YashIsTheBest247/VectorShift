// toolbar.js

import { DraggableNode } from './draggableNode';

const NODE_DEFS = [
  // Core nodes
  { type: 'customInput', label: 'Input',     accent: '#6366f1', icon: '⬆', group: 'Core' },
  { type: 'llm',         label: 'LLM',       accent: '#f59e0b', icon: '🧠', group: 'Core' },
  { type: 'customOutput',label: 'Output',    accent: '#10b981', icon: '⬇', group: 'Core' },
  { type: 'text',        label: 'Text',      accent: '#3b82f6', icon: '📝', group: 'Core' },
  // New nodes
  { type: 'api',         label: 'API Call',  accent: '#8b5cf6', icon: '🌐', group: 'Extended' },
  { type: 'math',        label: 'Math',      accent: '#ef4444', icon: '∑',  group: 'Extended' },
  { type: 'filter',      label: 'Filter',    accent: '#14b8a6', icon: '🔍', group: 'Extended' },
  { type: 'condition',   label: 'Condition', accent: '#f97316', icon: '⚡', group: 'Extended' },
  { type: 'logger',      label: 'Logger',    accent: '#64748b', icon: '📋', group: 'Extended' },
];

const GROUP_LABELS = {
  Core: 'Core Nodes',
  Extended: 'Extended Nodes',
};

export const PipelineToolbar = () => {
  const groups = [...new Set(NODE_DEFS.map((n) => n.group))];

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderBottom: '1px solid #334155',
        padding: '10px 20px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
        boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
      }}
    >
      {/* Branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px' }}>
        <span style={{ fontSize: '20px' }}>⚡</span>
        <span
          style={{
            fontSize: '15px',
            fontWeight: 800,
            color: '#f1f5f9',
            letterSpacing: '0.02em',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          VectorShift
        </span>
      </div>

      <div style={{ width: '1px', height: '36px', background: '#334155' }} />

      {/* Node groups */}
      {groups.map((group) => (
        <div key={group} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 700,
              color: '#64748b',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {GROUP_LABELS[group] || group}
          </span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {NODE_DEFS.filter((n) => n.group === group).map((node) => (
              <DraggableNode
                key={node.type}
                type={node.type}
                label={node.label}
                accent={node.accent}
                icon={node.icon}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

