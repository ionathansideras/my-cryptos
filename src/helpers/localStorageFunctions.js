export function rememberUser(user) {
  localStorage.setItem("users", JSON.stringify(user));
}

export function checkIfUserIsLoggedIn() {
  const user = localStorage.getItem("users");
  return user ? true : false;
}

export function removeUserFromLocalStorage() {
  localStorage.setItem("users", "");
}
