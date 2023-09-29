export default function useLocalStorage() {
  const setItem = (name) => localStorage.setItem(name, JSON.stringify(name));

  const getItem = (name) => localStorage.getItem(name);

  return [getItem, setItem];
}
