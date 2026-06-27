/**
 * Skenario Pengujian Reducer ThreadDetail:
 *
 * - setThreadDetail: harus menyimpan data detail thread
 * - clearThreadDetail: harus mengembalikan state ke null
 * - addComment: harus menambahkan komentar baru di posisi awal
 * - upVoteThreadDetail: harus menambahkan userId ke upVotesBy thread detail
 * - upVoteThreadDetail (toggle): harus menghapus userId jika sudah upvote
 * - downVoteThreadDetail: harus menambahkan userId ke downVotesBy thread detail
 * - upVoteCommentDetail: harus menambahkan userId ke upVotesBy komentar
 * - downVoteCommentDetail: harus menambahkan userId ke downVotesBy komentar
 * - upVoteCommentDetail: tidak melakukan apa-apa jika state null
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer, {
  setThreadDetail,
  clearThreadDetail,
  addComment,
  upVoteThreadDetail,
  downVoteThreadDetail,
  upVoteCommentDetail,
  downVoteCommentDetail,
} from '../reducer';

const fakeComment = {
  id: 'comment-1',
  content: 'Komentar pertama',
  createdAt: '2024-01-01T01:00:00.000Z',
  owner: { id: 'user-2', name: 'User Dua', avatar: '' },
  upVotesBy: [],
  downVotesBy: [],
};

const fakeThreadDetail = {
  id: 'thread-1',
  title: 'Thread Detail',
  body: 'Isi thread detail',
  category: 'General',
  createdAt: '2024-01-01T00:00:00.000Z',
  owner: { id: 'user-1', name: 'User Satu', avatar: '' },
  upVotesBy: [],
  downVotesBy: [],
  comments: [fakeComment],
};

describe('threadDetailReducer', () => {
  it('harus mengembalikan state awal berupa null', () => {
    const state = threadDetailReducer(undefined, { type: '@@INIT' });
    expect(state).toBeNull();
  });

  it('setThreadDetail: harus menyimpan detail thread dari payload', () => {
    const state = threadDetailReducer(null, setThreadDetail(fakeThreadDetail));
    expect(state).toEqual(fakeThreadDetail);
    expect(state.id).toBe('thread-1');
  });

  it('clearThreadDetail: harus mengembalikan state ke null', () => {
    const state = threadDetailReducer(fakeThreadDetail, clearThreadDetail());
    expect(state).toBeNull();
  });

  it('addComment: harus menambahkan komentar baru di awal array comments', () => {
    const newComment = {
      id: 'comment-2',
      content: 'Komentar baru',
      createdAt: '2024-01-02T00:00:00.000Z',
      owner: { id: 'user-3', name: 'User Tiga', avatar: '' },
      upVotesBy: [],
      downVotesBy: [],
    };

    const state = threadDetailReducer(
      { ...fakeThreadDetail, comments: [fakeComment] },
      addComment(newComment),
    );

    expect(state.comments).toHaveLength(2);
    expect(state.comments[0].id).toBe('comment-2');
  });

  it('upVoteThreadDetail: harus menambahkan userId ke upVotesBy thread', () => {
    const state = threadDetailReducer(
      { ...fakeThreadDetail },
      upVoteThreadDetail({ userId: 'user-2' }),
    );

    expect(state.upVotesBy).toContain('user-2');
    expect(state.downVotesBy).not.toContain('user-2');
  });

  it('upVoteThreadDetail (toggle): harus menghapus userId dari upVotesBy jika sudah upvote', () => {
    const state = threadDetailReducer(
      { ...fakeThreadDetail, upVotesBy: ['user-1'] },
      upVoteThreadDetail({ userId: 'user-1' }),
    );

    expect(state.upVotesBy).not.toContain('user-1');
  });

  it('downVoteThreadDetail: harus menghapus dari upVotesBy dan menambah ke downVotesBy', () => {
    const state = threadDetailReducer(
      { ...fakeThreadDetail, upVotesBy: ['user-1'] },
      downVoteThreadDetail({ userId: 'user-1' }),
    );

    expect(state.upVotesBy).not.toContain('user-1');
    expect(state.downVotesBy).toContain('user-1');
  });

  it('upVoteCommentDetail: harus menambahkan userId ke upVotesBy pada komentar', () => {
    const state = threadDetailReducer(
      { ...fakeThreadDetail },
      upVoteCommentDetail({ commentId: 'comment-1', userId: 'user-1' }),
    );

    expect(state.comments[0].upVotesBy).toContain('user-1');
    expect(state.comments[0].downVotesBy).not.toContain('user-1');
  });

  it('downVoteCommentDetail: harus menambahkan userId ke downVotesBy pada komentar', () => {
    const state = threadDetailReducer(
      { ...fakeThreadDetail },
      downVoteCommentDetail({ commentId: 'comment-1', userId: 'user-1' }),
    );

    expect(state.comments[0].downVotesBy).toContain('user-1');
    expect(state.comments[0].upVotesBy).not.toContain('user-1');
  });

  it('upVoteCommentDetail: tidak mengubah apa pun jika state null', () => {
    const state = threadDetailReducer(
      null,
      upVoteCommentDetail({ commentId: 'comment-1', userId: 'user-1' }),
    );
    expect(state).toBeNull();
  });
});
