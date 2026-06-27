import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="page page--not-found">
      <h1>404</h1>
      <p>Halaman yang Anda cari tidak ditemukan.</p>
      <Link to="/" className="btn btn--primary">Kembali ke Beranda</Link>
    </div>
  );
}

export default NotFoundPage;
