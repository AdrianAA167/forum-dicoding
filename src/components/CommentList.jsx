import CommentItem from './CommentItem';

function CommentList({ comments, onUpVoteComment, onDownVoteComment }) {
  if (comments.length === 0) {
    return <p className="empty-state">Belum ada komentar. Jadilah yang pertama!</p>;
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onUpVote={() => onUpVoteComment(comment.id)}
          onDownVote={() => onDownVoteComment(comment.id)}
        />
      ))}
    </div>
  );
}

export default CommentList;
