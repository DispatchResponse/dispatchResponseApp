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
      background-color: whitesmoke;
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

    const UsrInfo = styled.div`
      grid-area: usrin;
    `;
    const ApparatusAssignment = styled.div`
      grid-area: appar;
    `;
    const NotificationStatus = styled.div`
      grid-area: notif;
    `;

    return (

    <UserSettingsContainer>
      <Menu/>
      <UsrTitle>User Settings</UsrTitle>
      <UsrInfo></UsrInfo>
      <ApparatusAssignment>ApparatusAssignment</ApparatusAssignment>
      <NotificationStatus>Notifications</NotificationStatus>
    </UserSettingsContainer>


    )

  }
}
