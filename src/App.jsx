import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import LoadingIndicator from './components/LoadingIndicator';
import HomePage from './pages/HomePage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import CreateThreadPage from './pages/CreateThreadPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardPage from './pages/LeaderboardPage';
import NotFoundPage from './pages/NotFoundPage';
import { asyncPreloadAuthUser } from './states/authUser/thunk';
import RequireAuth from './components/RequireAuth';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadAuthUser());
  }, [dispatch]);

  return (
    <div className="app">
      <LoadingIndicator />
      <Navbar />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:threadId" element={<ThreadDetailPage />} />
          <Route
            path="/threads/new"
            element={(
              <RequireAuth>
                <CreateThreadPage />
              </RequireAuth>
            )}
          />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
