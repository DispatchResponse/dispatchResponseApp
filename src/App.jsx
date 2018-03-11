import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import getCoordinates from './utils/getCoordinates'
import Dispatch from './components/Dispatch';
import DispatchHistory from './components/DispatchHistory';
import UserSettings from './components/UserSettings';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apparatusData: null,
      dispatchData: null,
      dispatchHistory: null,
      userData: {}
    };

    this.setAppState = this.setAppState.bind(this);

  }

  componentDidMount() {

    var urlParams = this.props.location.search;
    //1st iteration:
    axios.get('/api/calls').then((resp) => {
      this.setAppState(resp.data[0], 'dispatch');
      this.setAppState(resp.data, 'dispatchHistory');
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
    } else if ( type === 'dispatchHistory') {
      this.setState({dispatchHistory: data});
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

           <Route
             exact path="/dispatch-history"
             render={ routeProps => <DispatchHistory {...routeProps} dispatchHistory={this.state.dispatchHistory}/> }
           />

           <Route
             exact path="/admin"
             render={ routeProps => <UserSettings {...routeProps} dispatchData={this.state.allData}/> }
           />

         </AppContainer>

        )}

     </div>



    )
  }
}
