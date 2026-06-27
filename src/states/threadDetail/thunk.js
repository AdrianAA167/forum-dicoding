import { toast } from 'react-toastify';
import api from '../../utils/api';
import {
  setThreadDetail,
  clearThreadDetail,
  addComment,
  upVoteThreadDetail,
  downVoteThreadDetail,
  upVoteCommentDetail,
  downVoteCommentDetail,
} from './reducer';
import { showLoading, hideLoading } from '../loadingBar/reducer';

function asyncPopulateThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetail());
    try {
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(setThreadDetail(detailThread));
    } catch {
      toast.error('Gagal memuat detail thread.');
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addComment(comment));
      toast.success('Komentar berhasil ditambahkan!');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Gagal menambahkan komentar.');
    } finally {
      dispatch(hideLoading());
    }
  };
}

function determineVoteAction(upVotesBy, downVotesBy, userId, intendedType) {
  const isUpVoted = upVotesBy.includes(userId);
  const isDownVoted = downVotesBy.includes(userId);

  if (intendedType === 1) {
    return isUpVoted ? 'neutral' : 'up';
  }
  return isDownVoted ? 'neutral' : 'down';
}

function asyncToggleUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      toast.info('Silakan login untuk memberi vote.');
      return;
    }
    if (!threadDetail) return;

    const action = determineVoteAction(
      threadDetail.upVotesBy,
      threadDetail.downVotesBy,
      authUser.id,
      1,
    );

    dispatch(upVoteThreadDetail({ userId: authUser.id }));

    try {
      if (action === 'up') {
        await api.upVoteThread(threadId);
      } else {
        await api.neutralizeThreadVote(threadId);
      }
    } catch {
      dispatch(upVoteThreadDetail({ userId: authUser.id }));
      toast.error('Gagal memberi vote. Silakan coba lagi.');
    }
  };
}

function asyncToggleDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      toast.info('Silakan login untuk memberi vote.');
      return;
    }
    if (!threadDetail) return;

    // FIXED: urutan parameter upVotesBy dan downVotesBy diperbaiki
    const action = determineVoteAction(
      threadDetail.upVotesBy,
      threadDetail.downVotesBy,
      authUser.id,
      -1,
    );

    dispatch(downVoteThreadDetail({ userId: authUser.id }));

    try {
      if (action === 'down') {
        await api.downVoteThread(threadId);
      } else {
        await api.neutralizeThreadVote(threadId);
      }
    } catch {
      dispatch(downVoteThreadDetail({ userId: authUser.id }));
      toast.error('Gagal memberi vote. Silakan coba lagi.');
    }
  };
}

function asyncToggleUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      toast.info('Silakan login untuk memberi vote.');
      return;
    }
    const comment = threadDetail?.comments.find((c) => c.id === commentId);
    if (!comment) return;

    const action = determineVoteAction(
      comment.upVotesBy,
      comment.downVotesBy,
      authUser.id,
      1,
    );

    dispatch(upVoteCommentDetail({ commentId, userId: authUser.id }));

    try {
      if (action === 'up') {
        await api.upVoteComment(threadId, commentId);
      } else {
        await api.neutralizeCommentVote(threadId, commentId);
      }
    } catch {
      dispatch(upVoteCommentDetail({ commentId, userId: authUser.id }));
      toast.error('Gagal memberi vote. Silakan coba lagi.');
    }
  };
}

function asyncToggleDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      toast.info('Silakan login untuk memberi vote.');
      return;
    }
    const comment = threadDetail?.comments.find((c) => c.id === commentId);
    if (!comment) return;

    // FIXED: urutan parameter upVotesBy dan downVotesBy diperbaiki
    const action = determineVoteAction(
      comment.upVotesBy,
      comment.downVotesBy,
      authUser.id,
      -1,
    );

    dispatch(downVoteCommentDetail({ commentId, userId: authUser.id }));

    try {
      if (action === 'down') {
        await api.downVoteComment(threadId, commentId);
      } else {
        await api.neutralizeCommentVote(threadId, commentId);
      }
    } catch {
      dispatch(downVoteCommentDetail({ commentId, userId: authUser.id }));
      toast.error('Gagal memberi vote. Silakan coba lagi.');
    }
  };
}

export {
  asyncPopulateThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
};
