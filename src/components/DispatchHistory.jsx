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

    const DispatchHistoryContainer = styled.div`
    width: 100%;
    height: auto;
    background-color: white;
    display: grid;
    grid-template-columns: 100%;
    grid-template-areas: 'title  '
                         'head   '
                         'records';
    @media screen and (min-width: 1024px){
      border-radius: 15px;
    }

    @media screen and (min-device-width: 768px) and (max-device-width: 1024px){
    }

    @media screen and (max-device-width: 480px) and (orientation: portrait){
    }
    `;

    const Title = styled.div`
      grid-area: title;
      font-size: 3.5em;
      letter-spacing: 5px;
      text-align: center;
      color: white;
      background-color: gray;
      padding: .7% 0;
      font-family: 'Podkova';
    `;

    const Headers = styled.div`
      grid-area: head;
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      background-color: DarkRed;
      color: white;
      font-size: 1.4em;
      padding: 1% 0;
      font-family: 'Podkova';
      div {
        margin: auto;
      }
    `;


    const DispatchTable = styled.div`
      grid-area: records;
        > div:nth-child(odd){
          background-color: whitesmoke;
        }
        > div:hover{background-color: tomato;}
    `;

    return (

        <DispatchHistoryContainer>

        <Menu
          ns={this.props.notificationStatus}
          tns={this.props.modifyNotificationStatus}/>

        <Title>Call List</Title>
        <Headers>
          <div>&nbsp;Timeout</div>
          <div>Description</div>
          <div>District</div>
          <div>Location</div>
          <div>Premise</div>
          <div>Cross Streets</div>
          <div>Assignment</div>
          <div>Radio</div>
          <div>Map</div>
          <div>Remarks</div>
        </Headers>

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
      </DispatchHistoryContainer>

    )

  }
}
