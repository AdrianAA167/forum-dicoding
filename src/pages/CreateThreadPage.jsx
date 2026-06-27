import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncAddThread } from '../states/threads/thunk';

function CreateThreadPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const thread = await dispatch(asyncAddThread({
      title: title.trim(),
      body: body.trim(),
      category: category.trim() || undefined,
    }));

    if (thread) {
      navigate(`/threads/${thread.id}`);
    }
  }

  return (
    <div className="page page--create-thread">
      <h1 className="page__title">Buat Thread Baru</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form__label" htmlFor="title">
          Judul
          <input
            id="title"
            type="text"
            className="form__input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul thread"
            required
          />
        </label>

        <label className="form__label" htmlFor="category">
          Kategori (opsional)
          <input
            id="category"
            type="text"
            className="form__input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Misal: General, Teknologi, dll"
          />
        </label>

        <label className="form__label" htmlFor="body">
          Isi Thread
          <textarea
            id="body"
            className="form__textarea"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Tuliskan isi thread Anda..."
            rows={8}
            required
          />
        </label>

        <button type="submit" className="btn btn--primary">
          Publikasikan Thread
        </button>
      </form>
    </div>
  );
}

export default CreateThreadPage;
