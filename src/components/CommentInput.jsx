import { useState } from 'react';

function CommentInput({ onSubmit, disabled }) {
  const [content, setContent] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent('');
  }

  if (disabled) {
    return (
      <p className="comment-input__disabled-note">
        Silakan login untuk menambahkan komentar.
      </p>
    );
  }

  return (
    <form className="comment-input" onSubmit={handleSubmit}>
      <textarea
        className="comment-input__textarea"
        placeholder="Tulis komentar Anda..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />
      <button type="submit" className="btn btn--primary" disabled={!content.trim()}>
        Kirim Komentar
      </button>
    </form>
  );
}

export default CommentInput;
