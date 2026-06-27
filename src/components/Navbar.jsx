import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Avatar from './Avatar';
import { useAuthUser } from '../hooks/useAuthUser';
import { asyncUnsetAuthUser } from '../states/authUser/thunk';

function Navbar() {
  const authUser = useAuthUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        💬 Forum Diskusi
      </Link>
      <div className="navbar__links">
        <Link to="/">Threads</Link>
        <Link to="/leaderboards">Leaderboard</Link>
        {authUser ? (
          <>
            <Link to="/threads/new" className="btn btn--primary btn--sm">
              + Buat Thread
            </Link>
            <div className="navbar__user">
              <Avatar src={authUser.avatar} name={authUser.name} size={32} />
              <span>{authUser.name}</span>
              <button type="button" className="btn btn--ghost btn--sm" onClick={handleLogout}>
                Keluar
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn--ghost btn--sm">Masuk</Link>
            <Link to="/register" className="btn btn--primary btn--sm">Daftar</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
