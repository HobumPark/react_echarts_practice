import { useState } from 'react'
import './App.css'
import EChartsBarStaticLargeDatasetPage from './pages/EChartsBarStaticLargeDatasetPage'
import EChartsBarDynamicMultiChartControlPage from './pages/EChartsBarDynamicMultiChartControlPage'
import EChartsLineStaticLargeDatasetPage from './pages/EChartsLineStaticLargeDatasetPage'
import EChartsLineDynamicMultiChartControlPage from './pages/EChartsLineDynamicMultiChartControlPage'
import EChartsPieDynamicControlPage from './pages/EChartsPieDynamicControlPage'
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
          <Route path="/" element={<EChartsBarStaticLargeDatasetPage />} />
          <Route path="/bar/static" element={<EChartsBarStaticLargeDatasetPage />} />
          <Route path="/bar/dynamic" element={<EChartsBarDynamicMultiChartControlPage />} />
          <Route path="/line/static" element={<EChartsLineStaticLargeDatasetPage />} />
          <Route path="/line/dynamic" element={<EChartsLineDynamicMultiChartControlPage />} />
          <Route path="/pie/dynamic" element={<EChartsPieDynamicControlPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
