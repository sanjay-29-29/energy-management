import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import { DataContext } from './DataContext';

export default function App() {
  const data = [];
  return (
    <DataContext.Provider value={data}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </DataContext.Provider>
  );
}

