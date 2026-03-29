// draggableNode.js

export const DraggableNode = ({ type, label, accent = '#6366f1', icon = '●' }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType };
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{
          cursor: 'grab',
          minWidth: '80px',
          height: '54px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '3px',
          borderRadius: '10px',
          background: `linear-gradient(135deg, ${accent}22 0%, ${accent}11 100%)`,
          border: `1.5px solid ${accent}55`,
          padding: '0 10px',
          transition: 'transform 0.1s, box-shadow 0.1s, border-color 0.1s',
          userSelect: 'none',
        }}
        draggable
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = `0 4px 12px ${accent}44`;
          e.currentTarget.style.borderColor = accent;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '';
          e.currentTarget.style.borderColor = `${accent}55`;
        }}
      >
        <span style={{ fontSize: '14px', lineHeight: 1 }}>{icon}</span>
        <span
          style={{
            color: '#e2e8f0',
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </span>
      </div>
    );
  };
