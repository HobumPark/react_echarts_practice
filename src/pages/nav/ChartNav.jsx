import { useState } from 'react';
import './ChartNav.css';
import ChartNavPage1 from './ChartNavPage1';
import ChartNavPage2 from './ChartNavPage2';

const ChartNav = () => {
  const [currentPage, setCurrentPage] = useState(1); // 1 또는 2

  return (
    <nav className="chart-nav">
      <div className="chart-menu">
        <div className="chart-row page-buttons">
          <button
            className={currentPage === 1 ? 'active' : ''}
            onClick={() => setCurrentPage(1)}
          >
            1페이지
          </button>
          <button
            className={currentPage === 2 ? 'active' : ''}
            onClick={() => setCurrentPage(2)}
          >
            2페이지
          </button>
        </div>

        <div className="chart-page-content">
          {currentPage === 1 && <ChartNavPage1 />}
          {currentPage === 2 && <ChartNavPage2 />}
        </div>
      </div>

      <div className="chart-author">작성자: Brad / 박호범</div>
    </nav>
  );
};

export default ChartNav;
