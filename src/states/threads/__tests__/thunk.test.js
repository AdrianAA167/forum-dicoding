/**
 * Skenario Pengujian Thunk Threads:
 *
 * asyncPopulateThreads:
 *   - harus mendispatch setThreads dengan data dari API saat berhasil
 *   - harus menampilkan toast error jika API gagal
 *
 * asyncAddThread:
 *   - harus mendispatch addThread dan mengembalikan thread baru saat berhasil
 *   - harus mengembalikan null dan toast error jika gagal
 *
 * asyncToggleUpVoteThread:
 *   - harus mendispatch upVoteThread secara optimistic
 *   - harus tidak melakukan apa-apa jika user belum login
 *   - harus rollback jika API gagal
 *
 * asyncToggleDownVoteThread:
 *   - harus mendispatch downVoteThread secara optimistic
 *   - harus memanggil neutralize jika user sudah downvote sebelumnya
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../../../utils/api';
import {
  asyncPopulateThreads,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
} from '../thunk';
import { setThreads, addThread, upVoteThread, downVoteThread } from '../reducer';
import { showLoading, hideLoading } from '../../loadingBar/reducer';

vi.mock('../../../utils/api');
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
  },
}));

const fakeThreads = [
  {
    id: 'thread-1',
    title: 'Thread Satu',
    body: 'Isi thread satu',
    category: 'General',
    createdAt: '2024-01-01T00:00:00.000Z',
    ownerId: 'user-1',
    totalComments: 0,
    upVotesBy: [],
    downVotesBy: [],
  },
];

describe('asyncPopulateThreads thunk', () => {
  beforeEach(() => vi.clearAllMocks());

  it('harus mendispatch setThreads dengan data dari API saat berhasil', async () => {
    api.getAllThreads = vi.fn().mockResolvedValue(fakeThreads);

    const dispatch = vi.fn();
    await asyncPopulateThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setThreads(fakeThreads));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('harus menampilkan toast error jika API getAllThreads gagal', async () => {
    const { toast } = await import('react-toastify');
    api.getAllThreads = vi.fn().mockRejectedValue(new Error('Network Error'));

    const dispatch = vi.fn();
    await asyncPopulateThreads()(dispatch);

    expect(toast.error).toHaveBeenCalled();
    const dispatchedActions = dispatch.mock.calls.map((c) => c[0]);
    expect(dispatchedActions).not.toContainEqual(expect.objectContaining({ type: 'threads/setThreads' }));
  });
});

describe('asyncAddThread thunk', () => {
  beforeEach(() => vi.clearAllMocks());

  it('harus mendispatch addThread dan mengembalikan thread baru saat berhasil', async () => {
    const newThread = { ...fakeThreads[0], id: 'thread-new' };
    api.createThread = vi.fn().mockResolvedValue(newThread);

    const dispatch = vi.fn();
    const result = await asyncAddThread({ title: 'Thread Baru', body: 'Isi', category: 'Tech' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(addThread(newThread));
    expect(result).toEqual(newThread);
  });

  it('harus mengembalikan null jika createThread gagal', async () => {
    api.createThread = vi.fn().mockRejectedValue(new Error('Error'));

    const dispatch = vi.fn();
    const result = await asyncAddThread({ title: '', body: '', category: '' })(dispatch);

    expect(result).toBeNull();
  });
});

describe('asyncToggleUpVoteThread thunk', () => {
  beforeEach(() => vi.clearAllMocks());

  it('harus mendispatch upVoteThread secara optimistic saat user login dan belum upvote', async () => {
    api.upVoteThread = vi.fn().mockResolvedValue({});

    const dispatch = vi.fn();
    const getState = vi.fn().mockReturnValue({
      authUser: { id: 'user-1' },
      threads: [{ ...fakeThreads[0], upVotesBy: [], downVotesBy: [] }],
    });

    await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      upVoteThread({ threadId: 'thread-1', userId: 'user-1' }),
    );
    expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
  });

  it('harus tidak melakukan apa-apa jika authUser null (belum login)', async () => {
    const { toast } = await import('react-toastify');
    const dispatch = vi.fn();
    const getState = vi.fn().mockReturnValue({ authUser: null, threads: [] });

    await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

    expect(toast.info).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: 'threads/upVoteThread' }),
    );
  });

  it('harus memanggil neutralizeThreadVote jika user sudah upvote sebelumnya', async () => {
    api.neutralizeThreadVote = vi.fn().mockResolvedValue({});

    const dispatch = vi.fn();
    const getState = vi.fn().mockReturnValue({
      authUser: { id: 'user-1' },
      threads: [{ ...fakeThreads[0], upVotesBy: ['user-1'], downVotesBy: [] }],
    });

    await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

    expect(api.neutralizeThreadVote).toHaveBeenCalledWith('thread-1');
  });

  it('harus rollback dispatch jika API upVoteThread gagal', async () => {
    api.upVoteThread = vi.fn().mockRejectedValue(new Error('Error'));

    const dispatch = vi.fn();
    const getState = vi.fn().mockReturnValue({
      authUser: { id: 'user-1' },
      threads: [{ ...fakeThreads[0], upVotesBy: [], downVotesBy: [] }],
    });

    await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

    // Dispatch dipanggil dua kali: optimistic + rollback
    const upVoteActions = dispatch.mock.calls.filter(
      (c) => c[0]?.type === 'threads/upVoteThread',
    );
    expect(upVoteActions).toHaveLength(2);
  });
});

describe('asyncToggleDownVoteThread thunk', () => {
  beforeEach(() => vi.clearAllMocks());

  it('harus mendispatch downVoteThread saat user login dan belum downvote', async () => {
    api.downVoteThread = vi.fn().mockResolvedValue({});

    const dispatch = vi.fn();
    const getState = vi.fn().mockReturnValue({
      authUser: { id: 'user-1' },
      threads: [{ ...fakeThreads[0], upVotesBy: [], downVotesBy: [] }],
    });

    await asyncToggleDownVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      downVoteThread({ threadId: 'thread-1', userId: 'user-1' }),
    );
    expect(api.downVoteThread).toHaveBeenCalledWith('thread-1');
  });
});
