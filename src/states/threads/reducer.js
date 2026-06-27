import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

function toggleVote(votesBy, userId) {
  const isVoted = votesBy.includes(userId);
  return isVoted
    ? votesBy.filter((id) => id !== userId)
    : [...votesBy, userId];
}

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setThreads: (_state, action) => action.payload,
    addThread: (state, action) => {
      state.unshift(action.payload);
    },
    upVoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (!thread) return;
      thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
      thread.upVotesBy = toggleVote(thread.upVotesBy, userId);
    },
    downVoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (!thread) return;
      thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
      thread.downVotesBy = toggleVote(thread.downVotesBy, userId);
    },
  },
});

export const {
  setThreads,
  addThread,
  upVoteThread,
  downVoteThread,
} = threadsSlice.actions;
export default threadsSlice.reducer;
