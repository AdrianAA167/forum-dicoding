import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardItem from '../components/LeaderboardItem';
import { asyncPopulateLeaderboards } from '../states/leaderboards/thunk';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <div className="page page--leaderboard">
      <h1 className="page__title">Leaderboard</h1>
      {leaderboards.length === 0 ? (
        <p className="empty-state">Belum ada data leaderboard.</p>
      ) : (
        <div className="leaderboard-list">
          {leaderboards.map((entry, index) => (
            <LeaderboardItem
              key={entry.user.id}
              rank={index + 1}
              user={entry.user}
              score={entry.score}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LeaderboardPage;
