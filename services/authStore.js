import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { setAuthorizationToken } from "./api.js";

const AUTH_STORAGE_KEY = "@atividade:auth";

let authSession = null;

export async function saveAuthSession(session) {
  authSession = session;
  await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  setAuthorizationToken(session?.token);
}

export async function getAuthSession() {
  if (authSession) {
    return authSession;
  }

  const storedSession = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedSession) {
    return null;
  }

  authSession = JSON.parse(storedSession);
  setAuthorizationToken(authSession?.token);

  return authSession;
}

export async function getToken() {
  const session = await getAuthSession();
  return session?.token || null;
}

export async function clearAuthSession() {
  authSession = null;
  await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  setAuthorizationToken(null);
}
