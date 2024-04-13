import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Energy from './Energy/Energy';
import Water from './Water/Water';
import dataFetcher from './DataFetcher';
import { DataContext } from './DataContext';

export default function App() {
  const data = dataFetcher();
  return (
    <DataContext.Provider value={data}>
      <Router>
        <Routes>
          <Route path='/energy' element={<Energy />} />
          <Route path='/water' element={<Water />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </DataContext.Provider>
  );
}

