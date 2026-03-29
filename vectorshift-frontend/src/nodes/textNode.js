// textNode.js
// Features:
//   1. Auto-resize: width and height grow as the user types
//   2. Variable detection: {{varName}} creates dynamic input handles on the left

import { useState, useEffect, useRef, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { NODE_COLORS, fieldStyles } from './BaseNode';

const MIN_WIDTH = 220;
const MIN_HEIGHT = 120;
const CHAR_WIDTH = 8;     // approx px per character
const LINE_HEIGHT = 18;   // px per line in textarea
const PADDING = 40;       // horizontal padding buffer
const VERTICAL_PADDING = 90; // header + label + bottom padding

// Extract {{varName}} tokens from text
const extractVariables = (text) => {
  const regex = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;
  const vars = [];
  const seen = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      vars.push(match[1]);
    }
  }
  return vars;
};

// Highlight {{variables}} in the text with colored spans
const HighlightedText = ({ text }) => {
  const parts = text.split(/(\{\{[a-zA-Z_][a-zA-Z0-9_]*\}\})/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\{\{[a-zA-Z_][a-zA-Z0-9_]*\}\}$/.test(part) ? (
          <mark
            key={i}
            style={{
              background: '#6366f122',
              color: '#6366f1',
              borderRadius: '3px',
              fontWeight: 700,
              padding: '0 2px',
            }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeSize, setNodeSize] = useState({ width: MIN_WIDTH, height: MIN_HEIGHT });
  const textareaRef = useRef(null);
  const colors = NODE_COLORS['text'];

  const variables = extractVariables(currText);

  // Recalculate node size based on text content
  const recalcSize = useCallback((text) => {
    const lines = text.split('\n');
    const maxLineLen = Math.max(...lines.map((l) => l.length), 10);
    const newWidth = Math.max(MIN_WIDTH, maxLineLen * CHAR_WIDTH + PADDING);
    const newHeight = Math.max(
      MIN_HEIGHT,
      lines.length * LINE_HEIGHT + VERTICAL_PADDING,
      variables.length * 28 + VERTICAL_PADDING // ensure room for handle labels
    );
    setNodeSize({ width: newWidth, height: newHeight });
  }, [variables.length]);

  useEffect(() => {
    recalcSize(currText);
  }, [currText, recalcSize]);

  // Auto-resize textarea itself
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  const handleChange = (e) => {
    setCurrText(e.target.value);
  };

  // Prevent ReactFlow drag when interacting with textarea
  const stopPropagation = (e) => e.stopPropagation();

  const getHandleTop = (index, total) => {
    const topOffset = 48; // header height
    const available = nodeSize.height - topOffset;
    if (total === 1) return topOffset + available / 2;
    const step = available / (total + 1);
    return topOffset + step * (index + 1);
  };

  const wrapperStyle = {
    width: nodeSize.width,
    minHeight: nodeSize.height,
    background: '#ffffff',
    borderRadius: '12px',
    border: `2px solid ${colors.accent}`,
    boxShadow: `0 4px 16px rgba(0,0,0,0.10), 0 0 0 1px ${colors.accent}22`,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    position: 'relative',
    transition: 'width 0.1s, min-height 0.1s',
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

  return (
    <div style={wrapperStyle}>
      {/* Dynamic Input Handles for {{variables}} */}
      {variables.map((varName, i) => (
        <div key={varName}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${varName}`}
            style={{
              top: getHandleTop(i, variables.length),
              background: colors.accent,
              width: 10,
              height: 10,
              border: '2px solid white',
              boxShadow: `0 0 0 1px ${colors.accent}`,
            }}
            title={varName}
          />
          {/* Variable label next to handle */}
          <span
            style={{
              position: 'absolute',
              left: 14,
              top: getHandleTop(i, variables.length) - 7,
              fontSize: '10px',
              color: colors.accent,
              fontWeight: 600,
              background: '#fff',
              padding: '1px 4px',
              borderRadius: '4px',
              border: `1px solid ${colors.accent}44`,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {varName}
          </span>
        </div>
      ))}

      {/* Header */}
      <div style={headerStyle}>
        <span style={{ fontSize: '14px' }}>{colors.icon}</span>
        <span style={{ fontSize: '12px', fontWeight: 700, color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Text
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 12px' }}>
        <label style={fieldStyles.label}>Content</label>
        <textarea
          ref={textareaRef}
          style={{
            ...fieldStyles.textarea,
            minHeight: '60px',
            overflow: 'hidden',
          }}
          value={currText}
          onChange={handleChange}
          onMouseDown={stopPropagation}
          onKeyDown={stopPropagation}
          placeholder="Type text... use {{variable}} for dynamic inputs"
          rows={1}
        />

        {/* Variable chips preview */}
        {variables.length > 0 && (
          <div style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {variables.map((v) => (
              <span
                key={v}
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  padding: '2px 7px',
                  borderRadius: '999px',
                  background: `${colors.accent}18`,
                  color: colors.accent,
                  border: `1px solid ${colors.accent}44`,
                }}
              >
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: '50%',
          background: colors.accent,
          width: 10,
          height: 10,
          border: '2px solid white',
          boxShadow: `0 0 0 1px ${colors.accent}`,
        }}
        title="Output"
      />
    </div>
  );
};
