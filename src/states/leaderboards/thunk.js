import { toast } from 'react-toastify';
import api from '../../utils/api';
import { setLeaderboards } from './reducer';
import { showLoading, hideLoading } from '../loadingBar/reducer';

function asyncPopulateLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(setLeaderboards(leaderboards));
    } catch {
      toast.error('Gagal memuat leaderboard.');
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { asyncPopulateLeaderboards };
