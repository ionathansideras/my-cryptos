// Import the necessary functions from Vitest and your local storage helper file
import { test, expect } from 'vitest'
import { getThemeColor, setThemeColor } from '../helpers/handleLocalStorage.js'

// Mock the localStorage object because Vitest runs in a Node.js environment which does not have a localStorage object
global.localStorage = {
  // The store object is used to hold the data in the mock localStorage
  store: {},
  // The getItem method retrieves the value of the specified key from the store
  getItem(key) {
    return this.store[key] || null
  },
  // The setItem method sets the value of the specified key in the store
  setItem(key, value) {
    this.store[key] = value.toString()
  },
  // The clear method removes all key-value pairs from the store
  clear() {
    this.store = {}
  }
}

// Test that the setThemeColor function correctly sets the theme color in the mock localStorage
test('setThemeColor sets the theme color in local storage', () => {
  const theme = 'dark'
  setThemeColor(theme)
  // Check that the theme color was correctly set in the mock localStorage
  expect(global.localStorage.getItem('theme')).toBe(theme)
})

// Test that the getThemeColor function correctly retrieves the theme color from the mock localStorage
test('getThemeColor retrieves the theme color from local storage', () => {
  const theme = 'light'
  global.localStorage.setItem('theme', theme)
  // Check that the theme color was correctly retrieved from the mock localStorage
  expect(getThemeColor()).toBe(theme)
})