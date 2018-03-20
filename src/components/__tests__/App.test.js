/*
 * App.test.js
 */

import React from 'react'
import ReactDOM from 'react-dom'
import App from '../../App'
import renderer from 'react-test-renderer'

describe('Given we load our app ', () => {
  it('Then renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})

describe('The App screen', () => {
  it('should match its empty snapshot', () => {
    const tree = renderer.create(
      <App />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
