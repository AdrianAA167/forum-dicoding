import axios from 'axios';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

function removeAccessToken() {
  localStorage.removeItem('accessToken');
}

function createAuthHeader() {
  const accessToken = getAccessToken();
  return { Authorization: `Bearer ${accessToken}` };
}

const axiosInstance = axios.create({ baseURL: BASE_URL });

async function register({ name, email, password }) {
  const response = await axiosInstance.post('/register', { name, email, password });
  const { data } = response.data;
  return data.user;
}

async function login({ email, password }) {
  const response = await axiosInstance.post('/login', { email, password });
  const { data } = response.data;
  return data.token;
}

async function getOwnProfile() {
  const response = await axiosInstance.get('/users/me', {
    headers: createAuthHeader(),
  });
  const { data } = response.data;
  return data.user;
}

async function getAllUsers() {
  const response = await axiosInstance.get('/users');
  const { data } = response.data;
  return data.users;
}

async function getAllThreads() {
  const response = await axiosInstance.get('/threads');
  const { data } = response.data;
  return data.threads;
}

async function getThreadDetail(threadId) {
  const response = await axiosInstance.get(`/threads/${threadId}`);
  const { data } = response.data;
  return data.detailThread;
}

async function createThread({ title, body, category }) {
  const response = await axiosInstance.post(
    '/threads',
    { title, body, category },
    { headers: createAuthHeader() },
  );
  const { data } = response.data;
  return data.thread;
}

async function createComment({ threadId, content }) {
  const response = await axiosInstance.post(
    `/threads/${threadId}/comments`,
    { content },
    { headers: createAuthHeader() },
  );
  const { data } = response.data;
  return data.comment;
}

async function upVoteThread(threadId) {
  const response = await axiosInstance.post(
    `/threads/${threadId}/up-vote`,
    {},
    { headers: createAuthHeader() },
  );
  const { data } = response.data;
  return data.vote;
}

async function downVoteThread(threadId) {
  const response = await axiosInstance.post(
    `/threads/${threadId}/down-vote`,
    {},
    { headers: createAuthHeader() },
  );
  const { data } = response.data;
  return data.vote;
}

async function neutralizeThreadVote(threadId) {
  const response = await axiosInstance.post(
    `/threads/${threadId}/neutral-vote`,
    {},
    { headers: createAuthHeader() },
  );
  const { data } = response.data;
  return data.vote;
}

async function upVoteComment(threadId, commentId) {
  const response = await axiosInstance.post(
    `/threads/${threadId}/comments/${commentId}/up-vote`,
    {},
    { headers: createAuthHeader() },
  );
  const { data } = response.data;
  return data.vote;
}

async function downVoteComment(threadId, commentId) {
  const response = await axiosInstance.post(
    `/threads/${threadId}/comments/${commentId}/down-vote`,
    {},
    { headers: createAuthHeader() },
  );
  const { data } = response.data;
  return data.vote;
}

async function neutralizeCommentVote(threadId, commentId) {
  const response = await axiosInstance.post(
    `/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {},
    { headers: createAuthHeader() },
  );
  const { data } = response.data;
  return data.vote;
}

async function getLeaderboards() {
  const response = await axiosInstance.get('/leaderboards');
  const { data } = response.data;
  return data.leaderboards;
}

const api = {
  putAccessToken,
  getAccessToken,
  removeAccessToken,
  register,
  login,
  getOwnProfile,
  getAllUsers,
  getAllThreads,
  getThreadDetail,
  createThread,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralizeThreadVote,
  upVoteComment,
  downVoteComment,
  neutralizeCommentVote,
  getLeaderboards,
};

export default api;
