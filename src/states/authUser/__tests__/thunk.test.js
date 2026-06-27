/**
 * Skenario Pengujian Thunk AuthUser:
 *
 * asyncSetAuthUser:
 *   - harus memanggil api.login dan api.getOwnProfile
 *   - harus mendispatch setAuthUser dengan data user setelah berhasil login
 *   - harus menampilkan toast.error jika login gagal
 *
 * asyncUnsetAuthUser:
 *   - harus memanggil api.removeAccessToken
 *   - harus mendispatch unsetAuthUser
 *
 * asyncRegisterUser:
 *   - harus memanggil api.register dan mengembalikan true jika berhasil
 *   - harus mengembalikan false dan menampilkan toast jika registrasi gagal
 *
 * asyncPreloadAuthUser:
 *   - harus mendispatch setAuthUser jika token ada
 *   - harus mendispatch setAuthUser(null) jika tidak ada token
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../../../utils/api';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
  asyncPreloadAuthUser,
} from '../thunk';
import { setAuthUser, unsetAuthUser } from '../reducer';
import { showLoading, hideLoading } from '../../loadingBar/reducer';
import { setUsers } from '../../users/reducer';

// Mock dependencies
vi.mock('../../../utils/api');
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
  },
}));

const fakeUser = {
  id: 'user-1',
  name: 'User Satu',
  email: 'user1@example.com',
  avatar: 'https://example.com/avatar.jpg',
};

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('harus mendispatch setAuthUser dengan data user saat login berhasil', async () => {
    api.login = vi.fn().mockResolvedValue('fake-token');
    api.putAccessToken = vi.fn();
    api.getOwnProfile = vi.fn().mockResolvedValue(fakeUser);

    const dispatch = vi.fn();
    const thunk = asyncSetAuthUser({ email: 'user1@example.com', password: 'password123' });

    await thunk(dispatch);

    expect(api.login).toHaveBeenCalledWith({
      email: 'user1@example.com',
      password: 'password123',
    });
    expect(api.putAccessToken).toHaveBeenCalledWith('fake-token');
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('harus menampilkan toast error dan tidak mendispatch setAuthUser jika login gagal', async () => {
    const { toast } = await import('react-toastify');
    api.login = vi.fn().mockRejectedValue({
      response: { data: { message: 'Email atau password salah' } },
    });

    const dispatch = vi.fn();
    const thunk = asyncSetAuthUser({ email: 'wrong@example.com', password: 'wrongpass' });

    await thunk(dispatch);

    expect(toast.error).toHaveBeenCalledWith('Email atau password salah');
    const dispatchedActions = dispatch.mock.calls.map((call) => call[0]);
    expect(dispatchedActions).not.toContainEqual(expect.objectContaining({ type: 'authUser/setAuthUser' }));
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('harus memanggil removeAccessToken dan mendispatch unsetAuthUser', () => {
    api.removeAccessToken = vi.fn();

    const dispatch = vi.fn();
    const thunk = asyncUnsetAuthUser();

    thunk(dispatch);

    expect(api.removeAccessToken).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUser());
  });
});

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('harus mengembalikan true dan menampilkan toast success jika registrasi berhasil', async () => {
    const { toast } = await import('react-toastify');
    api.register = vi.fn().mockResolvedValue({});

    const dispatch = vi.fn();
    const thunk = asyncRegisterUser({ name: 'User Baru', email: 'baru@example.com', password: 'pass123' });

    const result = await thunk(dispatch);

    expect(result).toBe(true);
    expect(toast.success).toHaveBeenCalled();
  });

  it('harus mengembalikan false dan menampilkan toast error jika registrasi gagal', async () => {
    const { toast } = await import('react-toastify');
    api.register = vi.fn().mockRejectedValue({
      response: { data: { message: 'Email sudah digunakan' } },
    });

    const dispatch = vi.fn();
    const thunk = asyncRegisterUser({ name: 'User', email: 'ada@example.com', password: 'pass' });

    const result = await thunk(dispatch);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Email sudah digunakan');
  });
});

describe('asyncPreloadAuthUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('harus mendispatch setAuthUser dengan data user jika token tersedia', async () => {
    api.getAccessToken = vi.fn().mockReturnValue('valid-token');
    api.getOwnProfile = vi.fn().mockResolvedValue(fakeUser);
    api.getAllUsers = vi.fn().mockResolvedValue([fakeUser]);

    const dispatch = vi.fn();
    const thunk = asyncPreloadAuthUser();

    await thunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(setUsers([fakeUser]));
  });

  it('harus mendispatch setAuthUser(null) jika tidak ada token', async () => {
    api.getAccessToken = vi.fn().mockReturnValue(null);
    api.getAllUsers = vi.fn().mockResolvedValue([]);

    const dispatch = vi.fn();
    const thunk = asyncPreloadAuthUser();

    await thunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setAuthUser(null));
  });
});
