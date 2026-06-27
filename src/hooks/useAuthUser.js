import { useSelector } from 'react-redux';

export function useAuthUser() {
  return useSelector((state) => state.authUser);
}

export function useVoteStatus(upVotesBy = [], downVotesBy = []) {
  const authUser = useAuthUser();
  if (!authUser) {
    return { isUpVoted: false, isDownVoted: false };
  }
  return {
    isUpVoted: upVotesBy.includes(authUser.id),
    isDownVoted: downVotesBy.includes(authUser.id),
  };
}
