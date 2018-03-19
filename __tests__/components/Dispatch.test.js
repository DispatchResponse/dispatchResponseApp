/*
 * Dispatch.test.js
 */

import React from 'react'
import ReactDOM from 'react-dom'
import Dispatch from '../../src/components/Dispatch'
import App from '../../src/App'
import renderer from 'react-test-renderer'
import toJSON from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { createRenderer } from 'react-test-renderer/shallow'

global.requestAnimationFrme = function(callback) {
  setTimeout(callback, 0)
}

// describe('The Dispatch screen', () => {

  // it('renders a Dispatch component', () => {
  //   const alarmColor = 'firebrick'
  //   const dispatchRenderer = createRenderer();
  //   dispatchRenderer.render(<Dispatch/>);
  //   let dis = dispatchRenderer.getRenderOutput();
  //   expect(dis.type).toBe('div');
  // });

  // it('renders Dispatch component', () => {
  //   const div = document.createElement('div');
  //   ReactDOM.render(
  //     <div>
  //       <Dispatch />
  //     </div>
  //   )
  // })

// })


describe('The App screen', () => {

  it('should match its empty snapshot', () => {
    const tree = renderer.create(
      <App />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
