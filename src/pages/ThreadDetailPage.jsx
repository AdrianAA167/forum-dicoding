import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import Avatar from '../components/Avatar';
import VoteButtons from '../components/VoteButtons';
import CommentList from '../components/CommentList';
import CommentInput from '../components/CommentInput';
import { postedAt } from '../utils/formatters';
import { useAuthUser, useVoteStatus } from '../hooks/useAuthUser';
import {
  asyncPopulateThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
} from '../states/threadDetail/thunk';

function ThreadDetailPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const authUser = useAuthUser();
  const threadDetail = useSelector((state) => state.threadDetail);

  useEffect(() => {
    dispatch(asyncPopulateThreadDetail(threadId));
  }, [dispatch, threadId]);

  const { isUpVoted, isDownVoted } = useVoteStatus(
    threadDetail?.upVotesBy,
    threadDetail?.downVotesBy,
  );

  if (!threadDetail) {
    return <div className="page page--thread-detail" />;
  }

  const {
    title, body, createdAt, owner, comments, upVotesBy, downVotesBy,
  } = threadDetail;

  function handleAddComment(content) {
    dispatch(asyncAddComment({ threadId, content }));
  }

  return (
    <div className="page page--thread-detail">
      <article className="thread-detail">
        <h1 className="thread-detail__title">{title}</h1>
        <div className="thread-detail__owner">
          <Avatar src={owner.avatar} name={owner.name} size={40} />
          <div>
            <div className="thread-detail__owner-name">{owner.name}</div>
            <div className="thread-detail__time">{postedAt(createdAt)}</div>
          </div>
        </div>

        {/* React Ecosystem: react-markdown untuk render body sebagai Markdown */}
        <div className="thread-detail__body">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>

        <VoteButtons
          upVotesCount={upVotesBy.length}
          downVotesCount={downVotesBy.length}
          isUpVoted={isUpVoted}
          isDownVoted={isDownVoted}
          onUpVote={() => dispatch(asyncToggleUpVoteThreadDetail(threadId))}
          onDownVote={() => dispatch(asyncToggleDownVoteThreadDetail(threadId))}
        />
      </article>

      <section className="thread-detail__comments-section">
        <h2 className="thread-detail__comments-title">
          Komentar ({comments.length})
        </h2>
        <CommentInput onSubmit={handleAddComment} disabled={!authUser} />
        <CommentList
          comments={comments}
          onUpVoteComment={(commentId) => dispatch(
            asyncToggleUpVoteComment({ threadId, commentId }),
          )}
          onDownVoteComment={(commentId) => dispatch(
            asyncToggleDownVoteComment({ threadId, commentId }),
          )}
        />
      </section>
    </div>
  );
}

export default ThreadDetailPage;
