import { toast } from 'react-toastify';
import api from '../../utils/api';
import {
  setThreads,
  addThread,
  upVoteThread as upVoteThreadAction,
  downVoteThread as downVoteThreadAction,
} from './reducer';
import { showLoading, hideLoading } from '../loadingBar/reducer';

function asyncPopulateThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getAllThreads();
      dispatch(setThreads(threads));
    } catch {
      toast.error('Gagal memuat daftar thread.');
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThread(thread));
      toast.success('Thread berhasil dibuat!');
      return thread;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Gagal membuat thread.');
      return null;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function determineThreadVoteAction(thread, userId, intendedType) {
  const isUpVoted = thread.upVotesBy.includes(userId);
  const isDownVoted = thread.downVotesBy.includes(userId);

  if (intendedType === 1) {
    return isUpVoted ? 'neutral' : 'up';
  }
  return isDownVoted ? 'neutral' : 'down';
}

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      toast.info('Silakan login untuk memberi vote.');
      return;
    }
    const thread = threads.find((t) => t.id === threadId);
    if (!thread) return;

    const action = determineThreadVoteAction(thread, authUser.id, 1);

    dispatch(upVoteThreadAction({ threadId, userId: authUser.id }));

    try {
      if (action === 'up') {
        await api.upVoteThread(threadId);
      } else {
        await api.neutralizeThreadVote(threadId);
      }
    } catch {
      dispatch(upVoteThreadAction({ threadId, userId: authUser.id }));
      toast.error('Gagal memberi vote. Silakan coba lagi.');
    }
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      toast.info('Silakan login untuk memberi vote.');
      return;
    }
    const thread = threads.find((t) => t.id === threadId);
    if (!thread) return;

    const action = determineThreadVoteAction(thread, authUser.id, -1);

    dispatch(downVoteThreadAction({ threadId, userId: authUser.id }));

    try {
      if (action === 'down') {
        await api.downVoteThread(threadId);
      } else {
        await api.neutralizeThreadVote(threadId);
      }
    } catch {
      dispatch(downVoteThreadAction({ threadId, userId: authUser.id }));
      toast.error('Gagal memberi vote. Silakan coba lagi.');
    }
  };
}

export {
  asyncPopulateThreads,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
};
