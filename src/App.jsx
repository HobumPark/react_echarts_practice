import { useState } from 'react'
import './App.css'
import EChartsBarStaticLargeDatasetPage from './pages/EChartsBarStaticLargeDatasetPage'
import EChartsBarDynamicMultiChartControlPage from './pages/EChartsBarDynamicMultiChartControlPage'
import EChartsLineStaticLargeDatasetPage from './pages/EChartsLineStaticLargeDatasetPage'
import EChartsLineDynamicMultiChartControlPage from './pages/EChartsLineDynamicMultiChartControlPage'
import EChartsPieDynamicControlPage from './pages/EChartsPieDynamicControlPage'
//슬라이딩
import EChartsLineDynamicSlidingPage from './pages/sliding/EChartsLineDynamicSlidingPage'
import EChartsLineDynamicSlidingPage2 from './pages/sliding/EChartsLineDynamicSlidingPage2'
import EChartsScatterDynamicSlidingPage from './pages/sliding/EChartsScatterDynamicSlidingPage'
import EChartsDualLineDynamicSlidingPage from './pages/sliding/EChartsDualLineDynamicSlidingPage'
import EChartsLineDynamicSlidingThresholdPage from './pages/sliding/EChartsLineDynamicSlidingThresholdPage'
import EChartsLineDynamicSlidingThresholdAlertPage from './pages/sliding/EChartsLineDynamicSlidingThresholdAlertPage'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ChartNav from './pages/nav/ChartNav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        {/* 상단 탭 네비게이션 */}
        <ChartNav/>
        <Routes>
          <Route path="/" element={<EChartsBarStaticLargeDatasetPage />} />
          <Route path="/bar/large" element={<EChartsBarStaticLargeDatasetPage />} />
          <Route path="/bar/dynamic" element={<EChartsBarDynamicMultiChartControlPage />} />
          <Route path="/line/large" element={<EChartsLineStaticLargeDatasetPage />} />
          <Route path="/line/dynamic" element={<EChartsLineDynamicMultiChartControlPage />} />
          <Route path="/pie/dynamic" element={<EChartsPieDynamicControlPage />} />
          {/* 슬라이딩 */}
          <Route path="/line/sliding/line" element={<EChartsLineDynamicSlidingPage />} />
          <Route path="/line/sliding/line2" element={<EChartsLineDynamicSlidingPage2 />} />
          <Route path="/line/sliding/scatter" element={<EChartsScatterDynamicSlidingPage />} />
          <Route path="/line/sliding/dual_line" element={<EChartsDualLineDynamicSlidingPage />} />
          <Route path="/line/sliding/line/threshold" element={<EChartsLineDynamicSlidingThresholdPage />} />
          <Route path="/line/sliding/line/threshold/alert" element={<EChartsLineDynamicSlidingThresholdAlertPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
