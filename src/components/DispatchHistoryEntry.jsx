import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';



export default class DispatchHistoryEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {

    const CallListRow = styled.div`
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      padding: 1% 0;
      font-family: 'Anonymous Pro';
    `;

    const CallListItem = styled.div`
      margin: auto;
      word-wrap: break-word;
      max-width: 80%;
    `;

    return (
      <CallListRow>
        <CallListItem>
          &nbsp;
          { this.props.callTimeout.split(' ')[1].split(':').slice(0, 2).join(':') }
          &nbsp;&nbsp;
          { this.props.callTimeout.split(' ')[0].split('-').slice(0, 2).join('-') }
        </CallListItem>
        <CallListItem>
          { this.props.callDescription }
        </CallListItem>
        <CallListItem>
          { this.props.callDistrict }
        </CallListItem>
        <CallListItem>
          { this.props.callLocation }
        </CallListItem>
        <CallListItem>
          { this.props.callLocation === this.props.callPremiseName ?
            '' :
            this.props.callPremiseName
          }
        </CallListItem>
        <CallListItem>
          { this.props.callCrossStreets }
        </CallListItem>
        <CallListItem>
          { this.props.callAssignment }
        </CallListItem>
        <CallListItem>
          { this.props.callRadioFreq }
        </CallListItem>
        <CallListItem>
          { this.props.callMap }
        </CallListItem>
        <CallListItem>
          { this.props.callRemarks }
        </CallListItem>
      </CallListRow>
    )

  }
}
