// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '14px 20px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderTop: '1px solid #334155',
        flexWrap: 'wrap',
      }}
    >
      {/* Node/edge summary */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <span
          style={{
            fontSize: '12px',
            color: '#94a3b8',
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '20px',
            padding: '4px 12px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {nodes.length} nodes
        </span>
        <span
          style={{
            fontSize: '12px',
            color: '#94a3b8',
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '20px',
            padding: '4px 12px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {edges.length} edges
        </span>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || nodes.length === 0}
        style={{
          padding: '10px 28px',
          background:
            nodes.length === 0
              ? '#334155'
              : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: nodes.length === 0 ? '#64748b' : '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '13px',
          fontWeight: 700,
          cursor: nodes.length === 0 ? 'not-allowed' : 'pointer',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '0.03em',
          transition: 'opacity 0.15s, transform 0.1s',
          boxShadow:
            nodes.length > 0 ? '0 4px 14px rgba(99,102,241,0.4)' : 'none',
        }}
        onMouseEnter={(e) => {
          if (nodes.length > 0) e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
        }}
      >
        {loading ? '⏳ Analyzing…' : '⚡ Run Pipeline'}
      </button>

      {/* Result badge */}
      {result && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            background: '#0f2a1e',
            border: '1px solid #10b98155',
            borderRadius: '10px',
            padding: '6px 14px',
            fontSize: '12px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span>
          <span style={{ color: '#6ee7b7' }}>
            {result.num_nodes} nodes · {result.num_edges} edges ·{' '}
            {result.is_dag ? '✅ Valid DAG' : '⚠️ Not a DAG'}
          </span>
        </div>
      )}

      {error && (
        <div
          style={{
            background: '#2a0f0f',
            border: '1px solid #ef444455',
            borderRadius: '10px',
            padding: '6px 14px',
            fontSize: '12px',
            color: '#fca5a5',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          ✖ {error}
        </div>
      )}
    </div>
  );
};

