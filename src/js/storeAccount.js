export function storeAccount(id, key = "id") {
  localStorage.setItem(key, id);
}

export function getAccount(key = "id") {
  return localStorage.getItem(key);
}

export function logoutAccount(key = "id") {
  localStorage.removeItem(key);
}
