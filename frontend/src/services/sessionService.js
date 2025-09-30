import { authApi } from '../api'

export async function login({ email, password }) {
  return authApi.login({ email, password })
}

export async function register({ email, password }) {
  const name = (email && email.split('@')[0]) || 'User'
  return authApi.signup({ email, password, name })
}

