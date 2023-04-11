import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./components/Home'));
const Register = lazy(() => import('./components/Register'));
const Login = lazy(() => import('./components/Login'));
const GLP = lazy(() => import('./components/GenerateLessonPlan'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/glp" element={<GLP />} />
        </Routes>
      </Suspense>
  </Router>
  );
}

export default App;
