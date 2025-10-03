//const API_BASE = 'http://localhost:8000';
const API_BASE = 'https://file-manager-xb1j.onrender.com';

function getToken() {
  return localStorage.getItem('token');
}

export async function apiRequest(path, { method = 'GET', body, isForm = false } = {}) {
  const headers = {};
  if (!isForm) {
    headers['Content-Type'] = 'application/json';
  }
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

export const authApi = {
  signup: (data) => apiRequest('/signup', { method: 'POST', body: data }),
  login: async (data) => {
    const res = await apiRequest('/login', { method: 'POST', body: data });
    if (res?.access_token) localStorage.setItem('token', res.access_token);
    return res;
  },
  logout: () => localStorage.removeItem('token'),
};

export const filesApi = {
  upload: ({ file, text }) => {
    const form = new FormData();
    form.append('file', file);
    form.append('text', text);
    return apiRequest('/upload', { method: 'POST', body: form, isForm: true });
  },
  list: () => apiRequest('/files', { method: 'GET' }),
  get: (id) => apiRequest(`/files/${id}`, { method: 'GET' }),
  updateText: (id, new_text) => apiRequest(`/files/${id}`, { method: 'PUT', body: { new_text } }),
  remove: (id) => apiRequest(`/files/${id}`, { method: 'DELETE' }),
};

