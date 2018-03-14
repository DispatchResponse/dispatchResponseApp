import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';



export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: true,
      display: false,
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.ns)
  }

  toggleDisplay(e) {
    if (e.target.id === 'notification-toggle') {
      this.props.tns;
    } else {
      this.setState({display: !this.state.display})
    }
    return;
  }

  render() {
      // grid-area: menu refers to the templates provided in App.jsx
      const MenuContainer = styled.div`
          grid-area: menu;
          color: black;
          font-family: 'Podkova';
          font-size: 2em;
          padding: 20px 0;
          &:hover{
            text-decoration: underline;
          }
          @media screen and (max-device-width: 480px) and (orientation: portrait){
            position: fixed;
            bottom: 0;
            z-index: 5;
            background-color: white;
            width: 100%;
            margin-left: -5px;
            display: flex;
            justify-content: flex-end;
            border-top: 5px solid firebrick;
          }
      `;

      const MenuTitle = styled.div`
          @media screen and (max-device-width: 480px) and (orientation: portrait){
            padding-right: 10%;
            color: firebrick;
            font-size: 2em;
          }
      `;

      const MenuItems = styled.div`
        display: ${!this.state.display ? 'none' : 'block'};
        position: absolute;
        text-align: left;
        list-style-type: none;
        background-color: white;
        min-width: 160px;
        box-shadow: 8px 0px 0px 8px rgba(0,0,0,0.2);
        padding: 12px 16px;
        z-index: 5;
        padding: 20px;
        &:hover{
          cursor: pointer;
        }
        li {
          margin: 10px 0 10px 0;
          border-bottom: 1px solid black;
          a {
            text-decoration: none;
            color: black;
            @media screen and (max-device-width: 480px) and (orientation: portrait){
              margin-left: 30px;
              padding-bottom: 20px;
            }
            &:hover{
              color: firebrick;
              border-bottom: 1px solid firebrick;
            }
          }
          @media screen and (max-device-width: 480px) and (orientation: portrait){
            font-size: 2em;
            padding: 15px 0px 15px 30px;
          }
        }
        @media screen and (max-device-width: 480px) and (orientation: portrait){
          transform: translateY(-100%);
          width: 100%;
          li:last-child{
            border-bottom: none;
          }
        }
      `;

      const NotificationTitle = styled.li`
        color: firebrick;
        box-shadow: 0 4px 2px -2px lightgray;
        background-color: white;
        border-bottom: 2px solid firebrick;
        padding: 25px 0 5px 0;
        font-size: .6em;
        letter-spacing: 3px;
        @media screen and (max-device-width: 480px) and (orientation: portrait){
          font-size: 1.5em!important;
          padding-left: 60px!important;
          box-shadow: none!important;
          border: none!important;
        }
      `;

      const NotificationSwitch = styled.li`
        display: flex;
        align-items: center;
        justify-content: space-around;

          input[type=checkbox]{
          	height: 0;
          	width: 0;
          	visibility: hidden;
          }

          label {
          	cursor: pointer;
          	width: 75px;
          	height: 35px;
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
          	width: 28px;
          	height: 28px;
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
          @media screen and (max-device-width: 480px) and (orientation: portrait){

            label {
              cursor: pointer;
              width: 100px;
              height: 45px;
              background: grey;
              display: block;
              border-radius: 100px;
              position: relative;
            }

            label:after {
              content: '';
              position: absolute;
              top: 2px;
              left: 5px;
              width: 38px;
              height: 38px;
              background: #fff;
              border-radius: 45px;
              transition: 0.3s;
            }

          }
      `;

    return (
        <MenuContainer onClick={this.toggleDisplay}>
          <MenuTitle>Menu</MenuTitle>
          <MenuItems>
            <li>
              <NavLink to="/dispatch-history"> Dispatch History </NavLink>
            </li>
            <li>
              <NavLink to="/user-settings"> User Settings </NavLink>
            </li>
            {
              this.state.isAdmin
              ? <li> <NavLink to="/admin"> Admin </NavLink> </li>
              : null
            }
            <NotificationTitle> Notifications:</NotificationTitle>
            <NotificationSwitch>
              <span>{this.props.ns ? 'ON' : 'OFF'}</span>
                <input
                  type="checkbox"
                  id={'notifications'}
                  defaultChecked={this.props.ns}
                  onChange={this.props.tns}/>
                <label htmlFor={'notifications'} id="notification-toggle"></label>
            </NotificationSwitch>
          </MenuItems>
        </MenuContainer>
    )

  }
}
