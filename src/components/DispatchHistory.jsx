import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Menu from './Menu';





export default class DispatchHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }



  render() {

    const DispatchHistoryContainer = styled.div`
    width: 100%;
    height: auto;
    max-width: 1200px;
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
      border-radius: none;
    }

    @media screen and (max-device-width: 480px) and (orientation: portrait){
      border-radius: none;
      font-size: 1em;
    }
    `;

    const Title = styled.div`
      grid-area: title;
      font-size: 3em;
      letter-spacing: 5px;
      text-align: center;
      border-radius: 15px 15px 0 0;
      color: white;
      background-color: gray;
      padding: .7% 0;
      font-family: 'Podkova';
    `;

    const TableData = styled.div`
        @media screen and (min-device-width: 768px) and (max-device-width: 1024px){
          div > div {
            min-width: 300px;
          }
        }

        @media screen and (max-device-width: 480px) and (orientation: portrait){
          font-size: 1em;
            div > div {
            min-width: 200px;
          }
        }
        overflow: auto;

    `;

    const Headers = styled.div`
      grid-area: head;
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      background-color: firebrick;
      color: white;
      font-size: 1em;
      padding: 1% 0;
      font-family: 'Podkova';
      width: 100%;
      position: sticky;
      top: 0;
      div {
        margin: auto;
        text-align: center;
      }
      @media screen and (min-device-width: 768px) and (max-device-width: 1024px){
        &:before{
          content: "";
          background-color: firebrick;
          position: absolute;
          height: 100%;
          width: 8000px;
          left: -4000px;
          z-index: -1;
        }
      }

      @media screen and (max-device-width: 480px) and (orientation: portrait){
        &:before{
          content: "";
          background-color: firebrick;
          position: absolute;
          height: 100%;
          width: 4000px;
          left: -2000px;
          z-index: -1;
        }
      }

    `;


    const DispatchTable = styled.div`
      grid-area: records;
      font-size: 1em;
        > div:nth-child(odd){
          background-color: whitesmoke;
          @media screen and (min-device-width: 768px) and (max-device-width: 1024px){
            background-color: white!important;
          }

          @media screen and (max-device-width: 480px) and (orientation: portrait){
            background-color: white!important;
          }

        }
        > div:hover{
          background-color: royalblue;
          color: white;
        }
    `;

    const CallListRow = styled.div`
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      padding: 1% 0;
      font-family: 'Anonymous Pro';
    `;

    const CallListItem = styled.div`

      min-width: 50px;
      max-width: 300px;
      word-wrap: break-word;
      text-align: center;
    `;

    return (

        <DispatchHistoryContainer>

        <Title>Call List</Title>

        <TableData>

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
            <CallListRow key={idx}>
              <CallListItem>
                { call.timeout.split(' ')[0]}
              </CallListItem>
              <CallListItem>
                { call['call_description'] }
              </CallListItem>
              <CallListItem>
                { call.city }
              </CallListItem>
              <CallListItem>
                { call.location }
              </CallListItem>
              <CallListItem>
                { call.location === call['premise_name'] ?
                  '' :
                  call['premise_name']
                }
              </CallListItem>
              <CallListItem>
                { call['cross_street'] }
              </CallListItem>
              <CallListItem>
                { call.assignment }
              </CallListItem>
              <CallListItem>
                { call['radio_freq'] }
              </CallListItem>
              <CallListItem>
                { call['map_ref'] }
              </CallListItem>
              <CallListItem>
                { call['cfs_remark'] }
              </CallListItem>
            </CallListRow>
          ))}
        </DispatchTable>

        </TableData>

      </DispatchHistoryContainer>

    )

  }
}
