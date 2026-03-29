// BaseNode.js
// Reusable base component that eliminates duplication across all node types.
// Supports dynamic labels, dynamic handles, custom content, and consistent styling.

import { Handle, Position } from 'reactflow';

// NODE_COLORS: each node type gets a distinct accent color
export const NODE_COLORS = {
  customInput: { accent: '#6366f1', bg: '#eef2ff', icon: '⬆' },
  customOutput: { accent: '#10b981', bg: '#ecfdf5', icon: '⬇' },
  llm:          { accent: '#f59e0b', bg: '#fffbeb', icon: '🧠' },
  text:         { accent: '#3b82f6', bg: '#eff6ff', icon: '📝' },
  api:          { accent: '#8b5cf6', bg: '#f5f3ff', icon: '🌐' },
  math:         { accent: '#ef4444', bg: '#fef2f2', icon: '∑' },
  filter:       { accent: '#14b8a6', bg: '#f0fdfa', icon: '🔍' },
  condition:    { accent: '#f97316', bg: '#fff7ed', icon: '⚡' },
  logger:       { accent: '#64748b', bg: '#f8fafc', icon: '📋' },
};

/**
 * BaseNode - the single wrapper for all node types.
 *
 * Props:
 *   id          {string}   Node ID from ReactFlow
 *   nodeType    {string}   Key into NODE_COLORS (e.g. 'customInput')
 *   label       {string}   Title shown in the header
 *   inputs      {Array}    [{id, label, style?}] - target handles on the left
 *   outputs     {Array}    [{id, label, style?}] - source handles on the right
 *   children    {ReactNode} Custom body content
 *   minWidth    {number}   Minimum width (default 220)
 *   minHeight   {number}   Minimum height (default 100)
 *   style       {object}   Extra style overrides for the wrapper
 */
export const BaseNode = ({
  id,
  nodeType = 'text',
  label = 'Node',
  inputs = [],
  outputs = [],
  children,
  minWidth = 220,
  minHeight = 100,
  style = {},
}) => {
  const colors = NODE_COLORS[nodeType] || NODE_COLORS['text'];

  const wrapperStyle = {
    minWidth,
    minHeight,
    background: '#ffffff',
    borderRadius: '12px',
    border: `2px solid ${colors.accent}`,
    boxShadow: `0 4px 16px rgba(0,0,0,0.10), 0 0 0 1px ${colors.accent}22`,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    overflow: 'visible',
    position: 'relative',
    transition: 'box-shadow 0.2s',
    ...style,
  };

  const headerStyle = {
    background: `linear-gradient(135deg, ${colors.accent}22 0%, ${colors.bg} 100%)`,
    borderBottom: `1px solid ${colors.accent}33`,
    borderRadius: '10px 10px 0 0',
    padding: '8px 12px 7px',
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
  };

  const iconStyle = {
    fontSize: '14px',
    lineHeight: 1,
  };

  const labelStyle = {
    fontSize: '12px',
    fontWeight: 700,
    color: colors.accent,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  };

  const bodyStyle = {
    padding: '10px 12px',
  };

  const handleStyle = (color) => ({
    background: color,
    width: 10,
    height: 10,
    border: '2px solid white',
    boxShadow: `0 0 0 1px ${color}`,
  });

  // Compute evenly-spaced vertical positions for handles
  const getHandleTop = (index, total) => {
    if (total === 1) return '50%';
    const step = 100 / (total + 1);
    return `${step * (index + 1)}%`;
  };

  return (
    <div style={wrapperStyle}>
      {/* Input Handles (target) */}
      {inputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          style={{
            top: handle.style?.top ?? getHandleTop(i, inputs.length),
            ...handleStyle(colors.accent),
            ...(handle.style || {}),
          }}
          title={handle.label || handle.id}
        />
      ))}

      {/* Header */}
      <div style={headerStyle}>
        <span style={iconStyle}>{colors.icon}</span>
        <span style={labelStyle}>{label}</span>
      </div>

      {/* Body */}
      <div style={bodyStyle}>{children}</div>

      {/* Output Handles (source) */}
      {outputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={{
            top: handle.style?.top ?? getHandleTop(i, outputs.length),
            ...handleStyle(colors.accent),
            ...(handle.style || {}),
          }}
          title={handle.label || handle.id}
        />
      ))}
    </div>
  );
};

// ─── Shared field styles ───────────────────────────────────────────────────────

export const fieldStyles = {
  label: {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600,
    color: '#6b7280',
    marginBottom: '3px',
    letterSpacing: '0.03em',
  },
  input: {
    width: '100%',
    padding: '5px 8px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '12px',
    color: '#111827',
    background: '#f9fafb',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  },
  select: {
    width: '100%',
    padding: '5px 8px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '12px',
    color: '#111827',
    background: '#f9fafb',
    outline: 'none',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    padding: '5px 8px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '12px',
    color: '#111827',
    background: '#f9fafb',
    outline: 'none',
    boxSizing: 'border-box',
    resize: 'none',
    fontFamily: 'inherit',
    lineHeight: '1.5',
    transition: 'border-color 0.15s',
  },
  fieldGroup: {
    marginBottom: '8px',
  },
  row: {
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-end',
  },
  badge: (color) => ({
    display: 'inline-block',
    fontSize: '10px',
    fontWeight: 600,
    padding: '2px 6px',
    borderRadius: '999px',
    background: `${color}22`,
    color: color,
    marginTop: '4px',
  }),
};
