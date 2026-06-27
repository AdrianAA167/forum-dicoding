import { useSelector } from 'react-redux';

function LoadingIndicator() {
  const isLoading = useSelector((state) => state.loadingBar);

  if (!isLoading) return null;

  return (
    <div className="loading-bar" role="status" aria-live="polite">
      <div className="loading-bar__progress" />
    </div>
  );
}

export default LoadingIndicator;
