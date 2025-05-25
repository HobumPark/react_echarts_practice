import { useState } from 'react'
import './App.css'
import EChartsBarChartTestPage1 from './pages/EChartsBarChartTestPage1'
import EChartsBarChartTestPage2 from './pages/EChartsBarChartTestPage2'
import EChartsLineChartTestPage1 from './pages/EChartsLineChartTestPage1'
import EChartsLineChartTestPage2 from './pages/EChartsLineChartTestPage2'
import EChartsPieChartTestPage from './pages/EChartsPieChartTestPage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ChartNav from './pages/ChartNav'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        {/* 상단 탭 네비게이션 */}
        <ChartNav/>
        <Routes>
          <Route path="/" element={<EChartsBarChartTestPage1 />} />
          <Route path="/bar/static" element={<EChartsBarChartTestPage1 />} />
          <Route path="/bar/dynamic" element={<EChartsBarChartTestPage2 />} />
          <Route path="/line/static" element={<EChartsLineChartTestPage1 />} />
          <Route path="/line/dynamic" element={<EChartsLineChartTestPage2 />} />
          <Route path="/pie" element={<EChartsPieChartTestPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
