import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import DispatchHistoryEntry from './DispatchHistoryEntry';
import Menu from './Menu';





export default class DispatchHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.dispatchHistory)
  }



  render() {

    const Title = styled.div`
      display: grid;
      grid-template-columns: 1fr;
      font-size: 2.0em;
      text-align: center;
      color: white;
      background-color: lightgray;
      margin: 0 10% 0px 10%;
      padding: .7% 0;
    `;

    const Subtitle = styled.div`
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      background-color: DarkRed;
      color: white;
      font-size: 1.4em;
      margin: 0 10% 0px 10%;
      padding: .7% 0;
    `;

    const Wrapper = styled.section`
      padding: 4em;
      background: white;
    `;

    const DispatchTable = styled.div`
      display: grid;
      margin: 0 10% 0 10%;
      grid-template-columns: 1fr;
        > div:nth-child(odd){
          background-color: Gainsboro;
        }
        > div:hover{background-color: tomato;}
    `;

    return (
      <div>
      <Menu ns={this.props.notificationStatus}/>
      <Wrapper>
        <Title>Call List</Title>
          <Subtitle>
            <div>&nbsp;Timeout</div>
            <div>Description</div>
            <div>District</div>
            <div>Location</div>
            <div>Premise</div>
            <div>Cross Streets</div>
            <div>Assignment</div>
            <div>Radio Freq</div>
            <div>Map</div>
            <div>Remarks</div>
          </Subtitle>

        <DispatchTable>
          {this.props.dispatchHistory.map((call, idx) => (
            <DispatchHistoryEntry
              callTimeout={ call.timeout }
              callDescription={ call.call_description }
              callDistrict={ call.city }
              callLocation={ call.location }
              callPremiseName={ call.premise_name }
              callCrossStreets={ call.cross_street }
              callAssignment={ call.assignment }
              callRadioFreq={ (call.radio_freq) }
              callMap={ call.map_ref }
              callRemarks={ call.cfs_remark }
              key={ idx }
            />
          ))}
        </DispatchTable>
      </Wrapper>
</div>
    )

  }
}
