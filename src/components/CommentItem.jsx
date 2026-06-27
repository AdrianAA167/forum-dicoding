import Avatar from './Avatar';
import VoteButtons from './VoteButtons';
import { postedAt } from '../utils/formatters';
import { useVoteStatus } from '../hooks/useAuthUser';

function CommentItem({ comment, onUpVote, onDownVote }) {
  const {
    content, createdAt, owner, upVotesBy, downVotesBy,
  } = comment;
  const { isUpVoted, isDownVoted } = useVoteStatus(upVotesBy, downVotesBy);

  return (
    <div className="comment-item">
      <Avatar src={owner.avatar} name={owner.name} size={36} />
      <div className="comment-item__content">
        <div className="comment-item__header">
          <span className="comment-item__name">{owner.name}</span>
          <span className="comment-item__time">{postedAt(createdAt)}</span>
        </div>
        <p className="comment-item__text">{content}</p>
        <VoteButtons
          upVotesCount={upVotesBy.length}
          downVotesCount={downVotesBy.length}
          isUpVoted={isUpVoted}
          isDownVoted={isDownVoted}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </div>
    </div>
  );
}

export default CommentItem;
