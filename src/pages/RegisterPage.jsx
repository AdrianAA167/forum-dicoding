import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { asyncRegisterUser } from '../states/authUser/thunk';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password.length < 6) {
      toast.error('Password harus terdiri dari minimal 6 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Konfirmasi password tidak sesuai.');
      return;
    }

    const success = await dispatch(asyncRegisterUser({ name, email, password }));
    if (success) {
      navigate('/login');
    }
  }

  return (
    <div className="page page--auth">
      <h1 className="page__title">Daftar Akun</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form__label" htmlFor="name">
          Nama
          <input
            id="name"
            type="text"
            className="form__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama lengkap"
            required
          />
        </label>

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
            placeholder="Minimal 6 karakter"
            required
            minLength={6}
          />
        </label>

        <label className="form__label" htmlFor="confirmPassword">
          Konfirmasi Password
          <input
            id="confirmPassword"
            type="password"
            className="form__input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Ulangi password"
            required
            minLength={6}
          />
        </label>

        <button type="submit" className="btn btn--primary">
          Daftar
        </button>
      </form>
      <p className="form__footer-text">
        Sudah punya akun?
        {' '}
        <Link to="/login">Masuk di sini</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
