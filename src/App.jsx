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
        timeout: '15:14  02-28',
        description: 'AIRPORT',
        district: 'GREENWICH',
        location: '00001 RYE LAKE AV',
        premise: 'WESTCHESTER COUNTY AIRPORT',
        crossStreets: 'STATELINE &KING ST',
        assignment: 'DC E3 E4 E8',
        radioFreq: 'CH2B',
        map: 'Map -438AP',
        remarks: 'LEVEL 3 ALERT 40SOULS ON BOARD',
        coordinates: null,
      }
    };

    this.setDispatchState = this.setDispatchState.bind(this);

  }

  componentDidMount() {
    //1st iteration:
    //make axios request for dispatch data

    //2nd iteratgion:
    //SSR with dispatch data ing single request

    console.log(getCoordinates(this.state.dispatchData.location, this.state.dispatchData.district))
  }

  setDispatchState(){
    //setState for dispatch data. used in callback from componentDidMount
  }



  render() {

    const AppContainer = styled.div`
        margin -10px;
        /* #### Mobile Phones Portrait #### */
        @media screen and (max-device-width: 480px) and (orientation: portrait){
          background-color: aliceblue;
          width: 100vw;
          height: auto;

        }
        /* #### Tablets Portrait or Landscape #### */
        @media screen and (min-device-width: 768px) and (max-device-width: 1024px){
          background-color: salmon;
          width: 100vw;
          height: auto;
        }

        /* #### Desktops #### */
        @media screen and (min-width: 1024px){
          background-color: goldenrod;
          width: 100vw;
          height: auto;
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
