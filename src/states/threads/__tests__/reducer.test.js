/**
 * Skenario Pengujian Reducer Threads:
 *
 * - setThreads: harus mengganti state dengan array thread baru
 * - addThread: harus menambahkan thread baru di posisi awal (unshift)
 * - upVoteThread: harus menambahkan userId ke upVotesBy dan menghapus dari downVotesBy
 * - upVoteThread (toggle): harus menghapus userId dari upVotesBy jika sudah ada (un-upvote)
 * - downVoteThread: harus menambahkan userId ke downVotesBy dan menghapus dari upVotesBy
 * - downVoteThread (toggle): harus menghapus userId dari downVotesBy jika sudah ada (un-downvote)
 * - upVoteThread pada thread tidak dikenal: state tidak berubah
 */

import { describe, it, expect } from 'vitest';
import threadsReducer, {
  setThreads,
  addThread,
  upVoteThread,
  downVoteThread,
} from '../reducer';

const fakeThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Isi thread pertama',
  category: 'General',
  createdAt: '2024-01-01T00:00:00.000Z',
  ownerId: 'user-1',
  totalComments: 0,
  upVotesBy: [],
  downVotesBy: [],
};

const fakeThread2 = {
  id: 'thread-2',
  title: 'Thread Kedua',
  body: 'Isi thread kedua',
  category: 'Tech',
  createdAt: '2024-01-02T00:00:00.000Z',
  ownerId: 'user-2',
  totalComments: 3,
  upVotesBy: ['user-1'],
  downVotesBy: [],
};

describe('threadsReducer', () => {
  it('harus mengembalikan state awal berupa array kosong', () => {
    const state = threadsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
  });

  it('setThreads: harus mengganti seluruh state dengan payload baru', () => {
    const initialState = [fakeThread];
    const newThreads = [fakeThread2];

    const state = threadsReducer(initialState, setThreads(newThreads));

    expect(state).toEqual(newThreads);
    expect(state).toHaveLength(1);
    expect(state[0].id).toBe('thread-2');
  });

  it('addThread: harus menambahkan thread baru di awal array', () => {
    const initialState = [fakeThread];
    const newThread = {
      id: 'thread-3',
      title: 'Thread Baru',
      body: 'Isi thread baru',
      category: 'Berita',
      createdAt: '2024-01-03T00:00:00.000Z',
      ownerId: 'user-3',
      totalComments: 0,
      upVotesBy: [],
      downVotesBy: [],
    };

    const state = threadsReducer(initialState, addThread(newThread));

    expect(state).toHaveLength(2);
    expect(state[0].id).toBe('thread-3');
    expect(state[1].id).toBe('thread-1');
  });

  it('upVoteThread: harus menambahkan userId ke upVotesBy', () => {
    const initialState = [{ ...fakeThread }];

    const state = threadsReducer(
      initialState,
      upVoteThread({ threadId: 'thread-1', userId: 'user-1' }),
    );

    expect(state[0].upVotesBy).toContain('user-1');
    expect(state[0].downVotesBy).not.toContain('user-1');
  });

  it('upVoteThread (toggle): harus menghapus userId jika sudah upvote sebelumnya', () => {
    const initialState = [{ ...fakeThread, upVotesBy: ['user-1'] }];

    const state = threadsReducer(
      initialState,
      upVoteThread({ threadId: 'thread-1', userId: 'user-1' }),
    );

    expect(state[0].upVotesBy).not.toContain('user-1');
  });

  it('upVoteThread: harus menghapus userId dari downVotesBy jika sebelumnya downvote', () => {
    const initialState = [{ ...fakeThread, downVotesBy: ['user-1'] }];

    const state = threadsReducer(
      initialState,
      upVoteThread({ threadId: 'thread-1', userId: 'user-1' }),
    );

    expect(state[0].upVotesBy).toContain('user-1');
    expect(state[0].downVotesBy).not.toContain('user-1');
  });

  it('downVoteThread: harus menambahkan userId ke downVotesBy', () => {
    const initialState = [{ ...fakeThread }];

    const state = threadsReducer(
      initialState,
      downVoteThread({ threadId: 'thread-1', userId: 'user-2' }),
    );

    expect(state[0].downVotesBy).toContain('user-2');
    expect(state[0].upVotesBy).not.toContain('user-2');
  });

  it('downVoteThread (toggle): harus menghapus userId jika sudah downvote sebelumnya', () => {
    const initialState = [{ ...fakeThread, downVotesBy: ['user-1'] }];

    const state = threadsReducer(
      initialState,
      downVoteThread({ threadId: 'thread-1', userId: 'user-1' }),
    );

    expect(state[0].downVotesBy).not.toContain('user-1');
  });

  it('upVoteThread: tidak mengubah state jika threadId tidak ditemukan', () => {
    const initialState = [{ ...fakeThread }];

    const state = threadsReducer(
      initialState,
      upVoteThread({ threadId: 'thread-tidak-ada', userId: 'user-1' }),
    );

    expect(state[0].upVotesBy).toEqual([]);
  });
});
