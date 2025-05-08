import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage.jsx';
import DashJ from './components/DashJ.jsx';
import Stats from './components/Stats.jsx';
import PlayerProfile from './components/PlayerProfile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/dashboard" element={<LoginPage />} />
        <Route path="/dashboard/DashJ" element={<DashJ />} />

        {/* Rutas protegidas sin layout */}
        <Route path="/dashboard/Perfil" element={<ProtectedRoute><PlayerProfile /></ProtectedRoute>} />
        <Route path="/dashboard/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;