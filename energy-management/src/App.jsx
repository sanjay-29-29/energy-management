import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Energy from './Energy';
import dataFetcher from './DataFetcher';
import { DataContext } from './DataContext'; 

export default function App() {
  const data = dataFetcher();
  return (
    <DataContext.Provider value={data}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/energy' element={<Energy />} />
      </Routes>
    </Router>
    </DataContext.Provider>
  );
}