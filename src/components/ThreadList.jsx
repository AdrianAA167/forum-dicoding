import ThreadItem from './ThreadItem';

function ThreadList({ threads, users }) {
  if (threads.length === 0) {
    return <p className="empty-state">Belum ada thread pada kategori ini.</p>;
  }

  return (
    <div className="thread-list">
      {threads.map((thread) => {
        const owner = users.find((user) => user.id === thread.ownerId);
        return (
          <ThreadItem
            key={thread.id}
            thread={thread}
            ownerName={owner?.name || 'Pengguna'}
            ownerAvatar={owner?.avatar}
          />
        );
      })}
    </div>
  );
}

export default ThreadList;
