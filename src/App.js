import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ChatPages from './pages/ChatPages';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Welcome from './components/Welcome';
import Contacts from './components/Contacts';
import { useEffect } from 'react';
import { initializeSocket } from './redux/slices/socketSlice';

// Layout for consistent styling
const Layout = ({ children }) => (
  <div style={{
    height: '100vh', width: '100vw',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'black'
  }}>
    {children}
  </div>
);

// Route that checks for auth
const Private = ({ children }) => {
  const { user } = useSelector((state) => state.login);
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeSocket());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Private */}
          <Route path="/" element={<Private><ChatPages /></Private>} />
          <Route path="/welcome" element={<Private><Welcome /></Private>} />
          <Route path="/contacts" element={<Private><Contacts /></Private>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
