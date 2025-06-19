import React, { useEffect, useState } from 'react';

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
    <div className="p-6 space-y-6">
      {/* 설정 영역 */}
      <div className="bg-gray-100 p-4 rounded-xl shadow border space-y-2">
        <h2 className="text-xl font-semibold mb-2">⚙️ 설정 영역</h2>
        <div className="flex items-center space-x-4">
          <label className="font-medium" htmlFor="speedInput">
            속도 설정 (km/h):
          </label>
          <input
            id="speedInput"
            type="number"
            value={speed}
            min="0"
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-24 px-2 py-1 border rounded text-right"
          />
        </div>
      </div>

      {/* 디스플레이 영역 */}
      <div className="w-[500px] h-[200px] bg-gradient-to-b from-gray-900 to-black text-white rounded-xl shadow-lg border-4 border-yellow-400 flex items-center justify-center text-2xl font-bold text-center p-4 mx-auto">
        {step === 0 && <p>🚦 신호등이 없습니다.</p>}
        {step === 1 && <p>🚗 당신의 속도 {speed}km/h</p>}
        {step === 2 && (
          <img
            src="https://via.placeholder.com/300x150?text=📷+Speed+Camera"
            alt="속도 측정 카메라 이미지"
            className="w-[300px] h-[150px] object-contain rounded"
          />
        )}
      </div>
    </div>
  );
};

export default CarBoardDynamic;
