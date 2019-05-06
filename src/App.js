import React from 'react';
import IdolYears from './Idol';
import IdolConstants from './shared/list';
import './App.css';

function App() {
  return (
    <div className="App">
      <IdolYears data={IdolConstants} />
    </div>
  );
}

export default App;
