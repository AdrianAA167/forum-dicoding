import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

function toggleVote(votesBy, userId) {
  const isVoted = votesBy.includes(userId);
  return isVoted
    ? votesBy.filter((id) => id !== userId)
    : [...votesBy, userId];
}

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState,
  reducers: {
    setThreadDetail: (_state, action) => action.payload,
    clearThreadDetail: () => null,
    addComment: (state, action) => {
      if (!state) return;
      state.comments.unshift(action.payload);
    },
    upVoteThreadDetail: (state, action) => {
      if (!state) return;
      const { userId } = action.payload;
      state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
      state.upVotesBy = toggleVote(state.upVotesBy, userId);
    },
    downVoteThreadDetail: (state, action) => {
      if (!state) return;
      const { userId } = action.payload;
      state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
      state.downVotesBy = toggleVote(state.downVotesBy, userId);
    },
    upVoteCommentDetail: (state, action) => {
      if (!state) return;
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (!comment) return;
      comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
      comment.upVotesBy = toggleVote(comment.upVotesBy, userId);
    },
    downVoteCommentDetail: (state, action) => {
      if (!state) return;
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (!comment) return;
      comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
      comment.downVotesBy = toggleVote(comment.downVotesBy, userId);
    },
  },
});

export const {
  setThreadDetail,
  clearThreadDetail,
  addComment,
  upVoteThreadDetail,
  downVoteThreadDetail,
  upVoteCommentDetail,
  downVoteCommentDetail,
} = threadDetailSlice.actions;
export default threadDetailSlice.reducer;
