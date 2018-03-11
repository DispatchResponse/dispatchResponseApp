import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import getCoordinates from './utils/getCoordinates'
import Dispatch from './components/Dispatch';
import UserSettings from './components/UserSettings';
import Home from './components/Calls/Home';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apparatusData: null,
      dispatchData: null,
        // assignment: "DC E1 E2 E3 E4 R5 T1",
        // radio_freq: "CH1A",
        // apt_no: "",
        // call_category: "REPORTED STRUCTURE FIRE",
        // call_description: "REPORTED STRUCTURE FIRE",
        // call_type: "800",
        // cfs_no: "1800001052",
        // cfs_remark: "SMOKE IN STRUCTURE",
        // city: "BELLE HAVEN",
        // dispatch_fire: "2018-01-09T12:18:57.110",
        // latitude: "41.013021\r",
        // location: "00070 BUSH AV",
        // longitude: "-73.636978\r",
        // premise_name: "00070 BUSH AV",
        // priority_amb: "",
        // priority_fire: "FD Pri:1",
        // priority_pol: "",
        // timeout: "01-09-2018 12:17:31",
        // cross_street: "MEADOW WOOD DR&FIELD POINT RD",
        // map_ref: " Map -F22",
        // zip: ""

      userData: {}
    };

    this.setAppState = this.setAppState.bind(this);

  }

  componentDidMount() {

    var urlParams = this.props.location.search;  
    //1st iteration:
    axios.get('/api/calls').then((resp) => {
      this.setAppState(resp.data[0], 'dispatch');
    })

    axios.get('/api/apparatus').then((resp) => {
      this.setAppState(resp.data, 'apparatus');
    })

    axios.get('/api/users').then((resp) => {
      this.setAppState(resp.data, 'user');
    })




    //2nd iteration:
    //SSR with dispatch data ing single request
  }

  setAppState(data, type){
    //setState for dispatch data. used in callback from componentDidMount
    if ( type === 'dispatch') {
      this.setState({dispatchData: data});
    } else if ( type === 'apparatus' ) {
      this.setState({apparatusData: data});
    } else if ( type === 'user' ) {
      this.setState({userData: data});
    } else if ( type === 'admin' ) {
      this.setState({adminData: data})
    }

    return
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
          box-shadow: -3px -3px .7em darkgrey, 3px 3px .7em darkgrey;
          border-radius: 15px;
        }
    `;

    return (

      <div>


        { !this.state.dispatchData ? null : (
          <AppContainer>

           <Route
             exact path="/"
             render={ routeProps => <Dispatch {...routeProps} dispatchData={this.state.dispatchData}/> }
           />

           {/* <Route
             exact path="/settings"
             render={ routeProps => <UserSettings {...routeProps} dispatchData={this.state.userData}/> }
           />

           <Route
             exact path="/admin"
             render={ routeProps => <UserSettings {...routeProps} dispatchData={this.state.allData}/> }
           /> */}

         </AppContainer>

        )}

     </div>



    )
  }
}
