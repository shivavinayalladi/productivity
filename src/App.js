import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';

import ScreenTimeTracker from './ScreenTimeTracker';
import Pomodoro from './Pomodoro';
import Recommendations from './Recommendations';
import Mindfulness from './Mindfulness';
import Community from './Community';
import DigitalDetox from './DigitalDetox'

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '350px', padding: '20px'}}>
          <Routes>
            <Route path="/" element={<ScreenTimeTracker/>} />
            <Route path="/screen-time-tracker" element={<ScreenTimeTracker />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/mindfulness" element={<Mindfulness />} />
            <Route path="/community" element={<Community />} />
            <Route path="/digital-detox" element={<DigitalDetox />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
