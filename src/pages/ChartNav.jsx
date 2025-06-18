// ChartNav.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ChartNav = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
  };

  const menuStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  };

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const authorStyle = {
    fontSize: '0.9rem',
    color: '#555',
    alignSelf: 'flex-start',
  };

  return (
    <nav style={navStyle}>
      <div style={menuStyle}>
        <div style={rowStyle}>
          <strong>막대차트:</strong>
          <Link to="/bar/large">정적 대용량</Link> {'|'}
          <Link to="/bar/dynamic">동적 데이터</Link>
        </div>
        <div style={rowStyle}>
          <strong>라인차트:</strong>
          <Link to="/line/large">정적 대용량</Link> {'|'}
          <Link to="/line/dynamic">동적 데이터</Link>
        </div>
        <div style={rowStyle}>
          <strong>파이차트:</strong>
          <Link to="/pie/dynamic">원형 분할된 파이 그래프</Link>
        </div>
        <div style={rowStyle}>
          <strong>영역 슬라이딩:</strong>
          <Link to="/line/sliding">막대 그래프 슬라이딩</Link>
        </div>
        <div style={rowStyle}>
          <strong>영역 슬라이딩:</strong>
          <Link to="/line/sliding2">막대 그래프 슬라이딩2</Link>
        </div>
        <div style={rowStyle}>
          <strong>동적 전광판 테스트:</strong>
          <Link to="/board/dynamic">동적 전광판 테스트</Link>
        </div>
      </div>
      <div style={authorStyle}>작성자: Brad / 박호범</div>
    </nav>
  );
};

export default ChartNav;
