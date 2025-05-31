import '@testing-library/jest-dom'

// Mock ResizeObserver for testing
class ResizeObserver
{
  observe() { }
  unobserve() { }
  disconnect() { }
}

Object.defineProperty(global, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserver,
})

// Optional: localStorage mock
Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: (() =>
  {
    let store: Record<string, string> = {}

    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) =>
      {
        store[key] = value.toString()
      },
      removeItem: (key: string) =>
      {
        delete store[key]
      },
      clear: () =>
      {
        store = {}
      },
      get length()
      {
        return Object.keys(store).length
      },
      key: (index: number) =>
      {
        const keys = Object.keys(store)
        return keys[index] || null
      },
    }
  })(),
})
