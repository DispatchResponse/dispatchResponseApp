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
          padding: 0 0 20px 0;
          &:hover{
            text-decoration: underline;
          }
          @media screen and (max-device-width: 480px) and (orientation: portrait){
          ${'' /* put some styles in here for mobile */}
          }
      `;

      const MenuItems = styled.div`
        display: ${!this.state.display ? 'none' : 'block'};
        position: absolute;
        text-align: left;
        list-style-type: none;
        background-color: white;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 12px 16px;
        z-index: 5;
        padding: 20px;
        &:hover{
          cursor: pointer;
        }
        li {
          margin: 10px 0 10px 0;
          border-bottom: 1px solid white;
          a {
            text-decoration: none;
            color: black;
            &:hover{
              color: firebrick;
              border-bottom: 1px solid firebrick;
            }
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
      `;

    return (
        <MenuContainer onClick={this.toggleDisplay}>
          Menu
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
