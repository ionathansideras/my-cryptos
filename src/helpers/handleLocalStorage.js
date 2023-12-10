export function getThemeColor() {
  return localStorage.getItem("theme");
}

export function setThemeColor(theme) {
  return localStorage.setItem("theme", theme);
}
