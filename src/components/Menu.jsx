import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';



export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      display: false,
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay(e) {
      this.setState({display: !this.state.display})
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
          margin: 0;
          &:hover{
            text-decoration: underline;
          }
          @media screen and (min-device-width: 768px) and (max-device-width: 1050px){
            position: fixed;
            bottom: 0px;
            z-index: 5;
            background-color: white;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            border-top: 3px solid firebrick;
            border-bottom: 3px solid firebrick;
          }
          @media screen and (max-device-width: 480px) and (orientation: portrait){
            position: fixed;
            max-width: 100%;
            bottom: 0px;
            z-index: 5;
            color: white;
            height: .7em;
            box-shadow: 2px 0px whitesmoke, -2px -2px whitesmoke;
            background-color: white;
            width: 110%;
            display: flex;
            justify-content: flex-end;
            border-top: 2px solid firebrick;
            border-bottom: 3px solid firebrick;
          }
          @media only screen and (min-device-width: 480px)
                     and (max-device-width: 800px)
                     and (orientation: landscape) {
            position: fixed;
            max-width: 100%;
            bottom: 0px;
            z-index: 5;
            color: white;
            height: .7em;
            box-shadow: 2px 0px whitesmoke, -2px -2px whitesmoke;
            background-color: white;
            width: 110%;
            display: flex;
            justify-content: flex-end;
            border-top: 2px solid firebrick;
            border-bottom: 3px solid firebrick;
          }

      `;

      const MenuTitle = styled.div`
          &:hover{
            cursor: pointer;
          }
          @media screen and (min-device-width: 768px) and (max-device-width: 1024px){
            padding-right: 10%;
            color: firebrick;
            font-size: .7em;
          }
          @media screen and (max-device-width: 480px) and (orientation: portrait){
            padding-right: 10%;
            color: firebrick;
            font-size: .8em;
          }
          @media only screen and (min-device-width: 480px)
                     and (max-device-width: 800px)
                     and (orientation: landscape) {
            padding-right: 10%;
            color: firebrick;
            font-size: .8em;
          }
      `;

      const MenuItems = styled.div`
        display: ${!this.state.display ? 'none' : 'block'};
        position: absolute;
        text-align: left;
        list-style-type: none;
        background-color: white;
        min-width: 160px;
        box-shadow: 1px 0px 5px 0px rgba(0,0,0,0.2);
        z-index: 5;
        padding: 20px;
        @media screen and (min-device-width: 768px) and (max-device-width: 1024px){
          left: 0;
        }
        a {
          text-decoration: none;
          color: black;

          li {
            margin: 15px 0 15px 0;
            border-bottom: 1px solid white;

            &:hover{
              cursor: pointer;
              color: firebrick;
            }

            @media screen and (min-device-width: 768px) and (max-device-width: 1050px){
              font-size: 1em;
              padding: 15px 0px 15px 30px;
            }

            @media screen and (max-device-width: 480px) and (orientation: portrait){
              font-size: 1em;
              padding: 15px 0px 15px 30px;
            }
            @media only screen and (min-device-width: 480px)
                       and (max-device-width: 800px)
                       and (orientation: landscape) {
              font-size: 1em;
              padding: 15px 0px 15px 30px;
            }

          }
        }
        @media screen and (min-device-width: 768px) and (max-device-width: 1050px){
          transform: translateY(-107%);
          width: 100%;
          li:last-child{
            border-bottom: none;
          }
        }
        @media screen and (max-device-width: 480px) and (orientation: portrait){
          transform: translateY(-107%);
          width: 100%;
          li:last-child{
            border-bottom: none;
          }
        }
        @media only screen and (min-device-width: 480px)
                   and (max-device-width: 800px)
                   and (orientation: landscape) {
          transform: translateY(-107%);
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
        padding: 15px 0 5px 0;
        font-size: .6em;
        letter-spacing: 3px;
        margin-bottom:10px;
        @media screen and (min-device-width: 768px) and (max-device-width: 1024px){
          padding: 15px 0px 15px 30px;
          box-shadow: none!important;
          border: none!important;
        }
        @media screen and (max-device-width: 480px) and (orientation: portrait){
          padding: 15px 0px 15px 30px;
          box-shadow: none!important;
          border: none!important;
        }
        @media only screen and (min-device-width: 480px)
                   and (max-device-width: 800px)
                   and (orientation: landscape) {
          padding: 15px 0px 15px 30px;
          box-shadow: none!important;
          border: none!important;
        }
      `;

      const NotificationSwitch = styled.li`
        display: flex;
        color: black;
        font-family: 'Source Code Pro', monospace;
        align-items: center;
        justify-content: space-around;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-around;
        align-items: center;

          input[type=checkbox]{
          	height: 0;
          	width: 0;
          	visibility: hidden;
          }

          label {
          	cursor: pointer;
          	width: 50px;
          	height: 32px;
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
              width: 75px;
              height: 42px;
              background: grey;
              display: block;
              border-radius: 100px;
              position: relative;
            }

            label:after {
              content: '';
              position: absolute;
              top: 2px;
              left: 2px;
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

              <NavLink to="/dispatch-history">
                <li>Dispatch History </li>
              </NavLink>

              <NavLink to="/user-settings">
                <li>User Settings </li>
              </NavLink>

            {
              this.state.isAdmin
              ? <NavLink to="/admin">
                  <li> Admin </li>
                </NavLink>
              : null
            }
            <NotificationTitle> Notifications:</NotificationTitle>
            <NotificationSwitch>
              <span>{this.props.ns ? 'ON' : 'OFF'}</span>
                <input
                  type="checkbox"
                  id={'notifications'}
                  defaultChecked={this.props.ns}
                  onChange={this.props.mns}/>
                <label htmlFor={'notifications'} id="notification-toggle"></label>
            </NotificationSwitch>
          </MenuItems>
        </MenuContainer>
    )

  }
}
