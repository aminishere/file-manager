import { authApi } from "../api";

export async function login({email, password}){
    return authApi.login({email, password})
}

export function register({email, password, name}) {
    return authApi.signup({email, password, name})
}