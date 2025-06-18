import React, { useEffect, useState } from 'react';

const BoardDynamic = () => {
  const [step, setStep] = useState(0);
  const speed = 43; // 임의의 속도 값

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % 3); // 0 → 1 → 2 순환
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[500px] h-[200px] bg-black text-white rounded-xl shadow-lg border-4 border-yellow-400 flex items-center justify-center text-2xl font-bold text-center p-4">
      {step === 0 && <p>🚦 신호등이 없습니다.</p>}
      {step === 1 && <p>🚗 당신의 속도 {speed}km/h</p>}
      {step === 2 && (
        <img
          src="https://via.placeholder.com/300x150?text=📷+Speed+Camera"
          alt="속도 이미지"
          className="w-[300px] h-[150px] object-contain rounded"
        />
      )}
    </div>
  );
};

export default BoardDynamic;
