import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/thunk';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    await dispatch(asyncSetAuthUser({ email, password }));
  }

  return (
    <div className="page page--auth">
      <h1 className="page__title">Masuk</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form__label" htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            className="form__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />
        </label>

        <label className="form__label" htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            className="form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password Anda"
            required
          />
        </label>

        <button type="submit" className="btn btn--primary">
          Masuk
        </button>
      </form>
      <p className="form__footer-text">
        Belum punya akun?
        {' '}
        <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  );
}

export default LoginPage;
