import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import getCoordinates from './utils/getCoordinates'
import Dispatch from './components/Dispatch';
import DispatchHistory from './components/DispatchHistory';
import UserSettings from './components/UserSettings';
import Admin from './components/Admin';
import Menu from './components/Menu';
import Logo from './assets/logo.svg';

const GAPI_KEY = process.env.GAPI_KEY;


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
      userApparatusAssignment: null,
      userIsAdmin: false,
      userID: null,
      slug: null
    };

    this.setAppState = this.setAppState.bind(this);
    this.modifyNotificationStatus = this.modifyNotificationStatus.bind(this);
    this.modifyApparatusAssignment = this.modifyApparatusAssignment.bind(this);
    this.buildApparatusAssigment = this.buildApparatusAssigment.bind(this);
  }

  async componentDidMount() {
    var urlPathname = this.props.location.pathname;
    let { userID, slug } = this.state;
    slug = urlPathname.split('/')[1]
    userID = urlPathname.split('/')[2]

    //get Current Dispatch
    await axios.get(`/api/${slug}/${userID}`).then((resp) => {
      this.setAppState(resp.data[0], 'dispatch');
    })

    //get Dispatch History
    await axios.get('/api/calls').then((resp) => {
      // console.log("//get Dispatch History",resp)
      this.setAppState(resp.data, 'dispatchHistory');
    })

    //get All Station Apparatus
    await axios.get('/api/apparatus').then((resp) => {
      // console.log("//get All Station Apparatus",resp)
      this.setAppState(resp.data, 'apparatus');
    })

    // get All Carriers
    await axios.get('/api/carriers').then((resp) => {
      // console.log("// get All Carriers",resp)
      this.setAppState(resp.data, 'carrier');
    })

    //get User Info
    await axios.get(`/api/users/${userID}`).then((resp) => {
      // console.log("//get User Info",resp)
      this.setAppState(resp.data, 'userInfo');
      this.setAppState(resp.data['is_admin'], 'userIsAdmin');
      this.setAppState(resp.data['is_sleeping'], 'userNotificationStatus');
    })

    //get User Tracking
    await axios.get(`/api/tracks/${userID}`).then((resp, err) => {
      this.setAppState(resp.data, 'userTracking');
    })

    this.buildApparatusAssigment()
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
      this.setState({userID: data['user_id']});
    } else if ( type === 'userTracking' ) {
      this.setState({userTracking: data});
    } else if ( type === 'userNotificationStatus' ) {
      this.setState({userNotificationStatus: !data});
    } else if ( type === 'userIsAdmin' ) {
      this.setState({userIsAdmin: data});
    }

    return
  }

  buildApparatusAssigment() {
    let userApparatusAssignment = this.state.allApparatus.map( app => {
      // console.log("this.state.userTracking INSIDE BUILD APPARATUS ASSIGNMENT")
      // console.log(this.state.userTracking)
      if (this.state.userTracking && this.state.userTracking.length > 0) {
        for (let i = 0; i < this.state.userTracking.length; i++) {
          if( this.state.userTracking[i]['apparatus_id'] === app['apparatus_id'] ) {
            return {id: app['apparatus_id'], active: true}
          }
        }
      }

      return {id: app['apparatus_id'], active: false}
    })

    this.setState({userApparatusAssignment: userApparatusAssignment})
  }

  async modifyNotificationStatus () {
    let userUpdate = {
        is_sleeping: this.state.userNotificationStatus
    }

    await axios.patch(`/api/users/${this.state.userID}`, userUpdate)
      .catch(err => console.log("ERROR WITH PATCH IN modifyNotificationStatus", err))

    await axios.get(`/api/users/${this.state.userID}`).then((resp) => {
      this.setAppState(resp.data, 'userInfo');
      this.setAppState(resp.data['is_admin'], 'userIsAdmin');
      this.setAppState(resp.data['is_sleeping'], 'userNotificationStatus');
    })
  }

  async modifyApparatusAssignment(e) {
    let { userApparatusAssignment, userID } = this.state;

    // console.log("CURRENT APPARATUS ASSIGNMENT")
    // console.log(userApparatusAssignment)


    let appID = e.target.id.split('-').pop();

    let newApparatusAssignment = userApparatusAssignment.map(appItem => {
      if (appItem.id === appID) {
        return {id: appID, active: !appItem.active}
      } else {
        return appItem
      }
    })

    // console.log("newApparatusAssignment")
    // console.log(newApparatusAssignment)

    let oldAssignmentToDelete = userApparatusAssignment.reduce((acc, item, idx) => {
      if (idx + 1 === userApparatusAssignment.length && item.active) {
        return `${acc + item.id}`
      } else if (idx + 1 === userApparatusAssignment.length) {
        return acc.slice(0, acc.length - 1)
      } else if (item.active) {
        return `${acc + item.id}&`
      } else {
        return acc
      }
    }, '')

    // console.log('oldAssignmentToDelete')
    // console.log(oldAssignmentToDelete)
    let newAssignmentToAdd = newApparatusAssignment
                                .filter(apparatus => apparatus.active)
                                .map(apparatus => apparatus.id)

    if ( newAssignmentToAdd.length > 1 ) {
      newAssignmentToAdd = newAssignmentToAdd.join('&')
    } else {
      newAssignmentToAdd = newAssignmentToAdd.join('')
    }

    // console.log('newAssignmentToAdd')
    // console.log(newAssignmentToAdd)

    this.setState({userApparatusAssignment: newApparatusAssignment})

    if (oldAssignmentToDelete.length > 0) {
      await axios.delete(`/api/tracks/${userID}/${oldAssignmentToDelete}`)
    }

    if (newAssignmentToAdd.length > 0) {
      await axios.post(`/api/tracks/${userID}/${newAssignmentToAdd}`)
    }

    await axios.get(`/api/tracks/${userID}`).then((resp) => {
      this.setAppState(resp.data, 'userTracking');
    })

  }

  render() {

    const AppContainer = styled.div`
        display: grid;
        width: 100vw;
        background-color: white;
        height: auto;
        margin: auto;
        max-width: 1200px;
        grid-template-areas: 'menu'
                             'app '
                             'test';
        /* #### Mobile Phones Portrait #### */
        @media screen and (max-device-width: 480px)
                      and (orientation: portrait){
          background-color: white;
          margin: -10px -10px 100px -10px;
          height: auto;
          grid-template-columns: 1fr;
          grid-template-areas: 'app '
                               'menu';
        }

        @media only screen and (min-device-width: 480px)
                   and (max-device-width: 800px)
                   and (orientation: landscape) {
          background-color: white;
          margin: -10px -10px 100px -10px;
          height: auto;
          grid-template-columns: 1fr;
          grid-template-areas: 'app '
                               'menu';
        }

        /* #### Tablets Portrait or Landscape #### */
        @media screen and (min-device-width: 768px) and (max-device-width: 1050px){
          background-color: white;
          height: auto;
          margin-top: -10px;
          margin-bottom: 100px;
          margin-left: -10px;
          margin-right: -10px;
          grid-template-areas: 'app '
                               'menu';
        }

        /* #### Desktops #### */
        @media screen and (min-width: 1050px){

        }

    `;

    const AppContent = styled.div`
      grid-area: app;
      box-shadow: -3px -3px .7em darkgrey, 3px 3px .7em darkgrey;
      border-radius: 15px;
    `;

    return (

      <div>

        { !this.state.dispatchData ? null : (
          <AppContainer>

          <Menu
            ns={this.state.userNotificationStatus}
            mns={this.modifyNotificationStatus}/>

          <AppContent>


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
                   allCarriers={this.state.allCarriers}
                   userInfo={this.state.userInfo}
                   userApparatusAssignment={this.state.userApparatusAssignment}
                   notificationStatus={this.state.userNotificationStatus}
                   modifyNotificationStatus={this.modifyNotificationStatus}
                   modifyApparatusAssignment={this.modifyApparatusAssignment}
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

             <Route
               exact path="/:slug/:userID"
               render={ routeProps =>
                 <Dispatch {...routeProps}
                   dispatchData={this.state.dispatchData}
                   notificationStatus={this.state.userNotificationStatus}
                   modifyNotificationStatus={this.modifyNotificationStatus}
                   isAdmin={this.state.userIsAdmin}
                 /> }
             />

             <Route
               exact path="/oops"
               render={ routeProps => <Oops {...routeProps}
               /> } 
             />


           </AppContent>

         </AppContainer>

        )}

     </div>



    )
  }
}
