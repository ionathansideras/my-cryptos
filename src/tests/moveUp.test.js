import { test, expect } from 'vitest'
import { moveUp } from '../helpers/moveUp.js'

test('moveUp', () => {
  // Create a mock function
  const mockScrollTo = (options) => {
    mockScrollTo.options = options
  }

  // Create a mock window object with a scrollTo method
  global.window = {
    scrollTo: mockScrollTo
  }

  // Call the function
  moveUp()

  // Check if window.scrollTo was called with the correct arguments
  expect(mockScrollTo.options).toEqual({
    top: 0,
    behavior: 'smooth',
  })
})