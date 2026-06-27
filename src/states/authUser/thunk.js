import { toast } from 'react-toastify';
import api from '../../utils/api';
import { setAuthUser, unsetAuthUser } from './reducer';
import { showLoading, hideLoading } from '../loadingBar/reducer';
import { setUsers } from '../users/reducer';

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Gagal login. Silakan coba lagi.');
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(showLoading());
    api.removeAccessToken();
    dispatch(unsetAuthUser());
    dispatch(hideLoading());
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
      toast.success('Registrasi berhasil! Silakan login.');
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Gagal mendaftar. Silakan coba lagi.');
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncPreloadAuthUser() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const accessToken = api.getAccessToken();
      if (accessToken) {
        const authUser = await api.getOwnProfile();
        dispatch(setAuthUser(authUser));
      } else {
        dispatch(setAuthUser(null));
      }
      const users = await api.getAllUsers();
      dispatch(setUsers(users));
    } catch {
      dispatch(setAuthUser(null));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
  asyncPreloadAuthUser,
};
