import { Link } from 'react-router-dom';
import './ChartNav.css';

const ChartNav = () => {
  return (
    <nav className="chart-nav">
      <div className="chart-menu">
        <div className="chart-row">
          <strong>막대차트:</strong>
          <Link to="/bar/large">정적 대용량</Link> {'|'}
          <Link to="/bar/dynamic">동적 데이터</Link>
        </div>
        <div className="chart-row">
          <strong>라인차트:</strong>
          <Link to="/line/large">정적 대용량</Link> {'|'}
          <Link to="/line/dynamic">동적 데이터</Link>
        </div>
        <div className="chart-row">
          <strong>파이차트:</strong>
          <Link to="/pie/dynamic">원형 분할된 파이 그래프</Link>
        </div>
        <div className="chart-row">
          <strong>라인차트 영역 슬라이딩:</strong>
          <Link to="/line/sliding/line">막대 그래프 슬라이딩 (영역이동)</Link>
        </div>
        <div className="chart-row">
          <strong>라인차트 영역 슬라이딩:</strong>
          <Link to="/line/sliding/line2">막대 그래프 슬라이딩 (영역이동-시작/중지 제어)</Link>
        </div>
        <div className="chart-row">
          <strong>산점도 영역 슬라이딩:</strong>
          <Link to="/line/sliding/scatter">산점도 슬라이딩 (영역이동-시작/중지 제어)</Link>
        </div>
        <div className="chart-row">
          <strong>이중 라인차트 영역 슬라이딩:</strong>
          <Link to="/line/sliding/dual_line">이중 라인차트 슬라이딩 (영역이동-시작/중지 제어)</Link>
        </div>
      </div>
      <div className="chart-author">작성자: Brad / 박호범</div>
    </nav>
  );
};

export default ChartNav;
