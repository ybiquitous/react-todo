const STORAGE_KEY = 'react-todo'

export default {
  load() {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : data
  },
  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  },
}
