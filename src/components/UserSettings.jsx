import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Menu from './Menu';

export default class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentApparatusAssignment: null
    };
    this.modifyApparatusAssignment = this.modifyApparatusAssignment.bind(this);
    this.buildApparatusAssigments = this.buildApparatusAssigments.bind(this);
  }

  componentDidMount() {
    //TODO: map user mobile carrier to carriers obj and get carrier Name
    //TODO: map apparatuses to tracking and get trues and falses
    console.log(this.props.allApparatus)
    console.log(this.props.userTracking)
    this.buildApparatusAssigments()

  }

  buildApparatusAssigments() {
    let userApparatusAssignment = this.props.allApparatus.map( app => {
      for (let i = 0; i < this.props.userTracking.length; i++) {
        if( this.props.userTracking[i]['apparatus_id'] === app['apparatus_id'] ) {
          return {id: app['apparatus_id'], active: true}
        }
      }
      return {id: app['apparatus_id'], active: false}
    })

    this.setState({currentApparatusAssignment: userApparatusAssignment})
  }

  modifyApparatusAssignment(e) {
    let appID = e.target.id.split('-').pop();
    let newApparatusAssignment = this.state.currentApparatusAssignment.map(app => {
      if (app.id === appID) {
        return {id: appID, active: !app.active}
      } else {
        return app
      }
    })
    this.setState({currentApparatusAssignment: newApparatusAssignment})
  }

  render() {
    console.log('rerendered', this.state.currentApparatusAssignment)
    const UserSettingsContainer = styled.div`
      width: 100%;
      height: auto;
      background-color: white;
      display: grid;
      grid-template-columns: 100%;
      grid-template-areas: 'title'
                           'usrin'
                           'appar'
                           'notif';
       @media screen and (min-width: 1024px){
         border-radius: 15px 15px 0 0;
       }
    `;

    const UsrTitle = styled.div`
      width: 100%;
      height: auto;
      background-color: grey;
      color: white;
      grid-area: title;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3.5em;
      font-family: 'Podkova';
      @media screen and (min-width: 1024px){
        border-radius: 15px 15px 0 0;
      }
    `;

    const UsrInfo = styled.ul`
      grid-area: usrin;
      padding: 0;
      list-style: none;
      font-family: 'Anonymous Pro';

      li:nth-child(odd) {
        color: firebrick;
        background-color: white;
        border-top: 2px solid white;
        border-bottom: 2px solid firebrick;
        padding: 5px 0 5px 10px;
        font-size: 1.5em;
      }

      li:nth-child(even) {
        color: black;
        font-weight: bolder;
        background-color: white;
        padding: 10px 0 0 10px;
        margin-bottom: 2%;
        font-size: 1.75em;
      }
    `;
    const ApparatusAssignment = styled.div`
      grid-area: appar;
      display: grid;
      @media screen and (min-width: 1024px){
        grid-template-columns: repeat(5, 1fr);
      }
      @media screen and (max-device-width: 480px) and (orientation: portrait){
        grid-template-columns: repeat(3, 1fr);
      }
    `;

    const ApparatusItem = styled.ul`
      text-align: center;
      padding: 0;
      list-style: none;
        li:nth-child(odd) {
          color: firebrick;
          background-color: white;
          border-bottom: 2px solid firebrick;
          padding: 5px 0 5px 10px;
          font-size: 1.5em;
          max-width: 30%;
          margin: 0 auto 10px auto;
          font-family: 'Anonymous Pro';
          font-weight: bold;
        }

        li:nth-child(even) {
          display: flex;
          justify-content: center;
          input[type=checkbox]{
          	height: 0;
          	width: 0;
          	visibility: hidden;
          }

          label {
          	cursor: pointer;
          	width: 50px;
          	height: 25px;
          	background: grey;
          	display: block;
          	border-radius: 100px;
          	position: relative;
          }

          label:after {
          	content: '';
          	position: absolute;
          	top: 2px;
          	left: 3px;
          	width: 21px;
          	height: 21px;
          	background: #fff;
          	border-radius: 45px;
          	transition: 0.3s;
          }

          input:checked + label {
          	background: green;
          }

          input:checked + label:after {
          	left: calc(100% - 5px);
          	transform: translateX(-90%);
          }

          label:active:after {
          	width: 100px;
          }
        }
    `;

    const NotificationStatus = styled.div`
      grid-area: notif;
      padding: 0;
      list-style: none;
      font-family: 'Anonymous Pro';
      li:nth-child(odd) {
        color: firebrick;
        background-color: white;
        border-top: 2px solid white;
        border-bottom: 2px solid firebrick;
        padding: 5px 0 5px 10px;
        font-size: 1.5em;
      }

      li:nth-child(even) {
        color: black;
        font-weight: bolder;
        background-color: white;
        padding: 10px 0 0 10px;
        margin-bottom: 2%;
        font-size: 1.75em;
      }
    `;

    return (

    <UserSettingsContainer>
      <Menu ns={this.props.notificationStatus}/>
      <UsrTitle>User Settings</UsrTitle>
      <UsrInfo>
        <li>User Name</li>
        <li>{this.props.userInfo['full_name']}</li>
        <li>Mobile Contact</li>
        <li>{this.props.userInfo['mobile']}</li>
        <li>Mobile Carrier</li>
        <li>{this.props.userInfo['carrier']}</li>
        <li>Apparatus Assignments</li>
      </UsrInfo>
      <ApparatusAssignment>

        {
          !this.state.currentApparatusAssignment ?
          null : (
          this.state.currentApparatusAssignment.map(app => {
            return <ApparatusItem key={app.id}>
              <li>{app.id}</li>
              <li>
                <input
                  type="checkbox"
                  id={`switch-${app.id}`}
                  defaultChecked={app.active}
                  onChange={this.modifyApparatusAssignment}/>
                <label htmlFor={`switch-${app.id}`}></label>
              </li>
            </ApparatusItem>
          })
          )
        }
      </ApparatusAssignment>
      <NotificationStatus>
        <li>Notifications</li>
        <li>{this.props.notificationStatus ? 'ON' : 'OFF'}</li>
      </NotificationStatus>
    </UserSettingsContainer>


    )

  }
}
