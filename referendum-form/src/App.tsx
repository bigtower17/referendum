import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import FormPage from './FormPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
