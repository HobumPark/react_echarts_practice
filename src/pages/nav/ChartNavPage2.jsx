import { Link } from 'react-router-dom';
import './ChartNav.css';

const ChartNavPage1 = () => {
  return (
    <nav className="chart-nav">
      <div className="chart-menu">
        {/* 기존 샘플 목록 */}
        <div className="chart-row">
          <strong>라인차트:</strong>
          <Link to="/sample/line/vibration">진동 데이터</Link>
        </div>
        <div className="chart-row">
          <strong>라인차트:</strong>
          <Link to="/sample/line/slope">경사 데이터</Link>
        </div>
        <div className="chart-row">
          <strong>라인차트:</strong>
          <Link to="/sample/line/change_color">색변경</Link>
        </div>
        <div className="chart-row">
          <strong>라인차트:</strong>
          <Link to="/sample/line/visual_map">색변경(비쥬얼맵 사용)</Link>
        </div>
        <div className="chart-row">
          <strong>라인차트:</strong>
          <Link to="/sample/line/5min">최근 5분</Link>
        </div>
      </div>

    </nav>
  );
};

export default ChartNavPage1;
