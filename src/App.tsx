import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initializeIcons } from '@fluentui/react';
import { Home } from './pages/Home/Home';
import { DishDetail } from './pages/DishDetail/DishDetail';
import { Login } from './pages/Login/Login';
import { PrivateRoute } from './components/common/PrivateRoute';
import { store } from './store/store';
import './styles/global.css';

initializeIcons();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/dish/:name"
            element={
              <PrivateRoute>
                <DishDetail />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;