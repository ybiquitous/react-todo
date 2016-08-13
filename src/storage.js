const STORAGE_KEY = 'react-todo'

export function load() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : data
}

export function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
