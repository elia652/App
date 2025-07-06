import './App.css';
import MenuBar from './Components/MenuBar/MenuBar';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Explore from './pages/Explore/Explore';
import ManageCat from './pages/ManageCat/ManageCat';
import ManageItems from './pages/ManageItems/ManageItems';
import ManageUsers from './pages/ManageUsers/ManageUsers';
import Login from './Login/Login';
import Signup from './Login/Signup';

import OrderHistory from './Components/OrderHistory/OrderHistory';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { auth } = useContext(AppContext);
  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return element;
};

function App() {
  const location = useLocation();
  const { auth } = useContext(AppContext); // ✅ useContext is inside component

  return (
    <>
      {location.pathname !== "/login" &&  location.pathname!=="/signup" &&<MenuBar />}
      <Toaster />
      <Routes>

        <Route
          path="/login"
          element={auth.token ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/explore" element={<ProtectedRoute element={<Explore />} />} />
        <Route path="/orders" element={<ProtectedRoute element={<OrderHistory />} />} />

        <Route
          path="/items"
          element={<ProtectedRoute element={<ManageItems />} allowedRoles={["ROLE_ADMIN"]} />}
        />
        <Route
          path="/categories"
          element={<ProtectedRoute element={<ManageCat />} allowedRoles={["ROLE_ADMIN"]} />}
        />
        <Route
          path="/users"
          element={<ProtectedRoute element={<ManageUsers />} allowedRoles={["ROLE_ADMIN"]} />}
        />
        <Route path="/signup" 
          element={auth.token ? <Navigate to="/dashboard" replace /> : <Signup />}/>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;

