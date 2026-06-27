function VoteButtons({
  upVotesCount,
  downVotesCount,
  isUpVoted,
  isDownVoted,
  onUpVote,
  onDownVote,
}) {
  return (
    <div className="vote-buttons">
      <button
        type="button"
        className={`vote-buttons__btn ${isUpVoted ? 'vote-buttons__btn--active-up' : ''}`}
        onClick={onUpVote}
        aria-label="Upvote"
      >
        <span aria-hidden="true">&#9650;</span>
        <span>{upVotesCount}</span>
      </button>
      <button
        type="button"
        className={`vote-buttons__btn ${isDownVoted ? 'vote-buttons__btn--active-down' : ''}`}
        onClick={onDownVote}
        aria-label="Downvote"
      >
        <span aria-hidden="true">&#9660;</span>
        <span>{downVotesCount}</span>
      </button>
    </div>
  );
}

export default VoteButtons;
