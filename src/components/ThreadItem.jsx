import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import { postedAt, truncateText } from '../utils/formatters';

function ThreadItem({ thread, ownerName, ownerAvatar }) {
  const {
    id, title, body, category, createdAt, totalComments, upVotesBy, downVotesBy,
  } = thread;

  return (
    <article className="thread-item">
      {category && <span className="thread-item__category">{category}</span>}
      <Link to={`/threads/${id}`} className="thread-item__title">
        {title}
      </Link>
      <p className="thread-item__body">{truncateText(body, 150)}</p>
      <div className="thread-item__footer">
        <div className="thread-item__owner">
          <Avatar src={ownerAvatar} name={ownerName} size={28} />
          <span>{ownerName}</span>
        </div>
        <span className="thread-item__dot">&middot;</span>
        <span className="thread-item__time">{postedAt(createdAt)}</span>
        <span className="thread-item__dot">&middot;</span>
        <span className="thread-item__comments">
          {totalComments} komentar
        </span>
        <span className="thread-item__dot">&middot;</span>
        <span className="thread-item__votes">
          <span aria-label="upvote count">&#9650; {upVotesBy.length}</span>
          {' '}
          <span aria-label="downvote count">&#9660; {downVotesBy.length}</span>
        </span>
      </div>
    </article>
  );
}

export default ThreadItem;
