import Avatar from './Avatar';

function LeaderboardItem({ rank, user, score }) {
  return (
    <div className="leaderboard-item">
      <span className="leaderboard-item__rank">{rank}</span>
      <Avatar src={user.avatar} name={user.name} size={40} />
      <div className="leaderboard-item__info">
        <span className="leaderboard-item__name">{user.name}</span>
        <span className="leaderboard-item__email">{user.email}</span>
      </div>
      <span className="leaderboard-item__score">{score} poin</span>
    </div>
  );
}

export default LeaderboardItem;
