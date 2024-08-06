// File: src/App.jsx
import React, { useState } from 'react';
import Welcome from './components/Welcome';
import TaskTracker from './components/TaskTracker';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';

function App() {
    const [hasEntered, setHasEntered] = useState(false);

    const handleEnter = () => {
        setHasEntered(true);
    };

    return (
      <ConfigProvider>
        <div className="App">
            {hasEntered ? <TaskTracker /> : <Welcome onEnter={handleEnter} />}
        </div>

      </ConfigProvider>
    );
}

export default App;
