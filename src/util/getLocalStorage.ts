export default function getLocalStorage<T>(key: string, defaultValue: T) {
  const value = window.localStorage.getItem(key);
  return value != null ? (JSON.parse(value) as T) : defaultValue;
}
