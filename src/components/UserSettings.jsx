import React from 'react';
import { Route } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Menu from './Menu';

export default class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCarrierName: null,
    };

    this.determineUserCarrierName = this.determineUserCarrierName.bind(this);
  }

  componentDidMount() {
    this.determineUserCarrierName()
  }

  determineUserCarrierName() {

    for (let i = 0; i < this.props.allCarriers.length; i++) {
      if (this.props.allCarriers[i].gateway === this.props.userInfo['carrier']) {
        this.setState({userCarrierName: this.props.allCarriers[i]['carrier_name']})
        return
      }
    }

  }

  render() {

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
         border-radius: 15px;
       }

       @media screen and (min-device-width: 768px) and (max-device-width: 1024px){
         margin-bottom: 100px;
       }

       @media screen and (max-device-width: 480px) and (orientation: portrait){
         margin-bottom: 50px;
       }
    `;

    const toggleVisibility = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
    `;

    const DBChangeSaved = styled.div`
      display: flex;
      position: fixed;
      align-items: center;
      justify-content: center;
      font-family: 'Source Code Pro', monospace;
      font-size: 1.5em;
      color: white;
      bottom: 45%;
      border-radius: 35px;
      animation: ${toggleVisibility} .5s linear;
      height: 50px;
      width: 200px;
      z-index: 10;
      margin-left: 40%;
      background-color: firebrick;
           @media screen and (min-device-width: 768px) and (max-device-width: 1024px){
             margin-left: 35%;
           }

           @media screen and (max-device-width: 480px) and (orientation: portrait){
             margin-left: 25%;
           }
    `;

    const UsrTitle = styled.div`
      width: 100%;
      height: auto;
      background-color: grey;
      color: white;
      grid-area: title;
      display: flex;
      padding: 2% 0;
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
        font-size: 1.3em;
        @media screen and (max-device-width: 480px) and (orientation: portrait){
          font-size: 1em;
        }
      }

      li:nth-child(even) {
        color: black;
        font-weight: bolder;
        font-family: 'Source Code Pro', monospace;
        background-color: white;
        padding: 10px 0 0 10px;
        margin-bottom: 2%;
        font-size: 1.5em;
        @media screen and (max-device-width: 480px) and (orientation: portrait){
          font-size: 1.3em;
        }
        @media only screen and (min-device-width: 480px)
                   and (max-device-width: 800px)
                   and (orientation: landscape) {
          font-size: 1.3em;
        }
    }
    `;
    const ApparatusAssignment = styled.div`
      grid-area: appar;
      display: grid;
      @media screen and (min-width: 1024px){
        grid-template-columns: repeat(5, 1fr);
      }
      @media screen and (min-device-width: 768px) and (max-device-width: 1024px){
        grid-template-columns: repeat(3, 1fr);
      }

      @media screen and (max-device-width: 480px) and (orientation: portrait){
        grid-template-columns: repeat(2, 1fr);
      }
        @media only screen and (min-device-width: 480px)
                   and (max-device-width: 800px)
                   and (orientation: landscape) {
        grid-template-columns: repeat(2, 1fr);
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
        grid-template-columns: 1fr 2fr 2fr 1fr;
        grid-template-areas: '.. tog dis ..';
        font-weight: bolder;
        background-color: white;
        padding-top: 30px;
        margin-bottom: 2%;
        font-size: 3em;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-around;
        align-items: center;
        span{
          min-width: 100px;
        }
        input[type=checkbox]{
          height: 0;
          width: 0;
          visibility: hidden;
        }

        label {
          cursor: pointer;
          width: 100px;
          height: 51px;
          background: grey;
          display: block;
          border-radius: 100px;
          position: relative;
        }

        label:after {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          width: 45px;
          height: 45px;
          background: #fff;
          border-radius: 45px;
          transition: 0.3s;
        }

        input:checked + label {
          background: green;
        }

        input:checked + label:after {
          left: calc(100% - 5px);
          transform: translateX(-95%);
        }

        label:active:after {
          width: 100px;
        }
      }
    `;

    return (

    <UserSettingsContainer>

      {this.props.toggleDBSave ? <DBChangeSaved>Saved!</DBChangeSaved> : null}

      <UsrTitle>User Settings</UsrTitle>
      <UsrInfo>
        <li>User Name</li>
        <li>{this.props.userInfo['full_name']}</li>
        <li>Mobile Contact</li>
        <li>{this.props.userInfo['mobile']}</li>
        <li>Mobile Carrier</li>
        <li>{!this.state.userCarrierName ? null : this.state.userCarrierName}</li>
        <li>Apparatus Assignments</li>
      </UsrInfo>
      <ApparatusAssignment>

        {
          !this.props.userApparatusAssignment ?
          null : (
          this.props.userApparatusAssignment.map(app => {
            return <ApparatusItem key={app.id}>
              <li>{app.id}</li>
              <li>
                <input
                  type="checkbox"
                  id={`switch-${app.id}`}
                  defaultChecked={app.active}
                  onChange={this.props.modifyApparatusAssignment}/>
                <label htmlFor={`switch-${app.id}`}></label>
              </li>
            </ApparatusItem>
          })
          )
        }
      </ApparatusAssignment>
      <NotificationStatus>
        <li>Notifications</li>
        <li>
          <span>{this.props.notificationStatus ? 'ON' : 'OFF'}</span>

            <input
              type="checkbox"
              id={'notifications'}
              defaultChecked={this.props.notificationStatus}
              onChange={this.props.modifyNotificationStatus}/>
            <label htmlFor={'notifications'}></label>

        </li>
      </NotificationStatus>
    </UserSettingsContainer>


    )

  }
}
