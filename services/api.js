import axios from "axios";

export const API_URL = "http://10.122.41.181:8000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export function setAuthorizationToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}

export function getApiErrorMessage(error, fallbackMessage) {
  if (error.code === "ECONNABORTED") {
    return "A API demorou para responder. Verifique se o backend esta ligado e acessivel na rede.";
  }

  if (!error.response) {
    return "Network Error: o app nao conseguiu alcancar a API. Confira se o IP/porta estao corretos, se o backend esta rodando e se o celular/emulador esta na mesma rede.";
  }

  const errors = error.response?.data?.errors;

  if (errors) {
    if (Array.isArray(errors)) {
      return errors.join("\n");
    }

    if (typeof errors === "object") {
      return Object.values(errors).flat().join("\n");
    }
  }

  return error.response?.data?.message || error.response?.data?.error || error.message || fallbackMessage;
}

export default api;
