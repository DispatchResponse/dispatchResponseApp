import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import getCoordinates from './utils/getCoordinates'
import Dispatch from './components/Dispatch';
import DispatchHistory from './components/DispatchHistory';
import UserSettings from './components/UserSettings';
import Admin from './components/Admin';


export default class App extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      allApparatus: null,
      allCarriers: null,
      dispatchData: null,
      dispatchHistory: null,
      userInfo: null,
      userTracking: null,
      userNotificationStatus: null,
      userIsAdmin: false,
    };

    this.setAppState = this.setAppState.bind(this);
    this.modifyNotificationStatus = this.modifyNotificationStatus.bind(this);

  }

  componentDidMount() {

    //NOTE:get URL Params, and extract slug and userID.
    //for now slug and userID is hard coded.

    let slug = 'mg08p5p';
    let userID = 2;

    //get Current Dispatch
    axios.get(`/api/${slug}/${userID}`).then((resp) => {
      console.log("//get Current Dispatch", resp)
      this.setAppState(resp.data[0], 'dispatch');
    })

    //get Dispatch History
    axios.get('/api/calls').then((resp) => {
      console.log("//get Dispatch History",resp)
      this.setAppState(resp.data, 'dispatchHistory');
    })

    //get All Station Apparatus
    axios.get('/api/apparatus').then((resp) => {
      console.log("//get All Station Apparatus",resp)
      this.setAppState(resp.data, 'apparatus');
    })

    // get All Carriers
    axios.get('/api/carriers').then((resp) => {
      console.log("// get All Carriers",resp)
      this.setAppState(resp.data, 'carrier');

    })

    //get User Info
    axios.get(`/api/users/${userID}`).then((resp) => {
      console.log("//get User Info",resp)
      this.setAppState(resp.data, 'userInfo');
      this.setAppState(resp.data['is_admin'], 'userIsAdmin');
      this.setAppState(resp.data['is_sleeping'], 'userNotificationStatus');

    })

    //get User Tracking
    axios.get(`/api/tracks/${userID}`).then((resp) => {
      console.log("//get User Tracking",resp)
      this.setAppState(resp.data, 'userTracking');
    })


  }

  setAppState(data, type){
    //setState for dispatch data. used in callback from componentDidMount
      if ( type === 'dispatch') {
      this.setState({dispatchData: data});
    } else if ( type === 'dispatchHistory') {
      this.setState({dispatchHistory: data});
    } else if ( type === 'apparatus' ) {
      this.setState({allApparatus: data});
    } else if ( type === 'carrier' ) {
      this.setState({allCarriers: data});
    } else if ( type === 'userInfo' ) {
      this.setState({userInfo: data});
    } else if ( type === 'userTracking' ) {
      this.setState({userTracking: data});
    } else if ( type === 'userNotificationStatus' ) {
      this.setState({userNotificationStatus: !data});
    } else if ( type === 'userIsAdmin' ) {
      this.setState({userIsAdmin: data});
    }

    return
  }

  modifyNotificationStatus() {
    this.setState({userNotificationStatus: !this.state.userNotificationStatus})
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
             render={ routeProps =>
               <Dispatch {...routeProps}
                 dispatchData={this.state.dispatchData}
                 notificationStatus={this.state.userNotificationStatus}
                 modifyNotificationStatus={this.modifyNotificationStatus}
                 isAdmin={this.state.userIsAdmin}
               /> }
           />

           <Route
             exact path="/dispatch-history"
             render={ routeProps =>
               <DispatchHistory {...routeProps}
                 dispatchHistory={this.state.dispatchHistory}
                 notificationStatus={this.state.userNotificationStatus}
                 modifyNotificationStatus={this.modifyNotificationStatus}
                 isAdmin={this.state.userIsAdmin}
               /> }
           />

           <Route
             exact path="/user-settings"
             render={ routeProps =>
               <UserSettings {...routeProps}
                 allApparatus={this.state.allApparatus}
                 allCarriers={this.state.allCarriers}
                 userInfo={this.state.userInfo}
                 userTracking={this.state.userTracking}
                 notificationStatus={this.state.userNotificationStatus}
                 modifyNotificationStatus={this.modifyNotificationStatus}
                 isAdmin={this.state.userIsAdmin}
               /> }
           />

           <Route
             exact path="/admin"
             render={ routeProps =>
               <Admin {...routeProps}
                 notificationStatus={this.state.notificationStatus}
                 modifyNotificationStatus={this.modifyNotificationStatus}
                 isAdmin={this.state.userIsAdmin}
               /> }
           />

         </AppContainer>

        )}

     </div>



    )
  }
}
