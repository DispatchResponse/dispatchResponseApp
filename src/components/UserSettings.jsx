import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Menu from './Menu';

export default class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props)
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
        box-shadow: 0 4px 2px -2px lightgray;
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
    `;

    const ApparatusItem = styled.ul`
      text-align: center;
      padding: 0;
      list-style: none;
        li:nth-child(odd) {
          color: firebrick;
          background-color: white;
          border-top: 2px solid white;
          text-decoration:underline;
          padding: 5px 0 5px 10px;
          font-size: 1.5em;
        }

        li:nth-child(even) {
          input{

          }
        }
    `;

    const NotificationStatus = styled.div`
      grid-area: notif;
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
          this.props.allApparatus.map(app => {
            return <ApparatusItem key={app['apparatus_id']}>
              <li>{app['apparatus_id']}</li>
              <li><input type="radio"/></li>
            </ApparatusItem>
          })
        }
      </ApparatusAssignment>
      <NotificationStatus>Notifications</NotificationStatus>
    </UserSettingsContainer>


    )

  }
}
