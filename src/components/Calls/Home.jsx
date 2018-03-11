/**
 * src/component/Calls/Home.jsx
 */

import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import CallList from './CallList.jsx'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      callData: []
    }
    this.getCalls = this.getCalls.bind(this)
  }

  componentDidMount () {
    this.getCalls()
  }

  getCalls () {
    $.ajax({
      url: '/calls',
      type: 'GET',
      dataType: 'json',
      ContentType: 'application/json',
      success: function (calls) {
        this.setState({
          callData: calls
        })
      }.bind(this),
      error: function (jqXHR) {
        console.log('AJAX ERROR: ', jqXHR)
      }
    })
  }

  render () {
    return (
      <div className='app'>
        <CallList callData={this.state.callData} />
      </div>
    )
  }
}
