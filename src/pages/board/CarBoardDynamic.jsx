import React, { useEffect, useState } from 'react';
import './CarBoardDynamic.css';  // CSS 임포트 꼭 추가

const CarBoardDynamic = () => {
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(43);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carboard-container">
      {/* 설정 영역 */}
      <div className="carboard-settings">
        <h2>⚙️ 설정 영역</h2>
        <div className="row">
          <label htmlFor="speedInput">속도 설정 (km/h):</label>
          <input
            id="speedInput"
            type="number"
            value={speed}
            min="0"
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
      </div>

      {/* 디스플레이 영역 */}
      <div className="carboard-display">
        {step === 0 && <p>🚦 신호등이 없습니다.</p>}
        {step === 1 && <p>🚗 당신의 속도 {speed}km/h</p>}
        {step === 2 && (
          <img
            src="https://via.placeholder.com/300x150?text=📷+Speed+Camera"
            alt="속도 측정 카메라 이미지"
          />
        )}
      </div>
    </div>
  );
};

export default CarBoardDynamic;
