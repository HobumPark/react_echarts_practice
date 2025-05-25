// ChartNav.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ChartNav = () => {
  const navStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
  };

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  return (
    <nav style={navStyle}>
      <div style={rowStyle}>
        <strong>막대차트:</strong>
        <Link to="/bar/static">정적 대용량</Link> {'|'}
        <Link to="/bar/dynamic">동적 데이터</Link>
      </div>
      <div style={rowStyle}>
        <strong>라인차트:</strong>
        <Link to="/line/static">정적 대용량</Link> {'|'}
        <Link to="/line/dynamic">동적 데이터</Link>
      </div>
      <div style={rowStyle}>
        <strong>파이차트:</strong>
        <Link to="/pie">원형 분할된 파이 그래프</Link>
      </div>
    </nav>
  );
};

export default ChartNav;
