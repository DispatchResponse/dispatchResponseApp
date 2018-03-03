import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import getCoordinates from './utils/getCoordinates'
import Dispatch from './components/Dispatch';
import UserSettings from './components/UserSettings';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dispatchData: {
        assignment: "DC E1 E2 E3 E4 R5 T1",
        radio_freq: "CH1A",
        apt_no: "",
        call_category: "REPORTED STRUCTURE FIRE",
        call_description: "REPORTED STRUCTURE FIRE",
        call_type: "800",
        cfs_no: "1800001052",
        cfs_remark: "SMOKE IN STRUCTURE",
        city: "BELLE HAVEN",
        dispatch_fire: "2018-01-09T12:18:57.110",
        latitude: "41.013021\r",
        location: "00070 BUSH AV",
        longitude: "-73.636978\r",
        premise_name: "00070 BUSH AV",
        priority_amb: "",
        priority_fire: "FD Pri:1",
        priority_pol: "",
        timeout: "01-09-2018 12:17:31",
        cross_street: "MEADOW WOOD DR&FIELD POINT RD",
        map_ref: " Map -F22",
        zip: ""
      }
    };

    this.setDispatchState = this.setDispatchState.bind(this);

  }

  componentDidMount() {
    //1st iteration:
    //make axios request for dispatch data

    //2nd iteratgion:
    //SSR with dispatch data ing single request
  }

  setDispatchState(){
    //setState for dispatch data. used in callback from componentDidMount
  }



  render() {

    const AppContainer = styled.div`
        margin -10px;
        /* #### Mobile Phones Portrait #### */
        @media screen and (max-device-width: 480px) and (orientation: portrait){
          background-color: white;
          width: 100vw;
          height: auto;

        }
        /* #### Tablets Portrait or Landscape #### */
        @media screen and (min-device-width: 768px) and (max-device-width: 1024px){
          background-color: white;
          width: 100vw;
          height: auto;
        }

        /* #### Desktops #### */
        @media screen and (min-width: 1024px){
          background-color: white;
          width: 100vw;
          height: auto;
          max-width: 1200px;
          margin: auto;
          margin-top: 10%;
        }

    `;


    return (
      <AppContainer>

       <Route
         exact path="/"
         render={ routeProps => <Dispatch {...routeProps} dispatchData={this.state.dispatchData}/> }
       />

       <Route
         exact path="/settings"
         render={ routeProps => <UserSettings {...routeProps} dispatchData={this.state.dispatchData}/> }
       />

     </AppContainer>
    )
  }
}
