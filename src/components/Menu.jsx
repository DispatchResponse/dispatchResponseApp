import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';



export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // console.log(this.props.ns)
  }

  render() {

      const MenuContainer = styled.div`
          grid-area: 1/1/1/4;
          padding: 0 20px 5% 0;
          z-index: 5;
          text-align: right;
          color: black;
          transform: translateY(-100%);
          font-family: 'Podkova';
          font-size: 2em;
          &:hover{
            text-decoration: underline;
            div {
              display: block;
            }
          }

      `;

      const MenuItems = styled.div`
        display: none;
        position: absolute;
        right: 0;
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

      const NotificationSwitch = styled.li`
        display: flex;
        align-items: center;

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
        <MenuContainer>
          Menu
          <MenuItems>
            <li>
              <NavLink to="/dispatch-history"> Dispatch History </NavLink>
            </li>
            <li>
              <NavLink to="/user-settings"> User Settings </NavLink>
            </li>
            <li> Notifications:</li>
            <NotificationSwitch>
              <span>{this.props.ns ? 'ON' : 'OFF'}</span>
                <input
                  type="checkbox"
                  id={'notifications'}
                  defaultChecked={this.props.ns}
                  onChange={this.props.tns}/>
                <label htmlFor={'notifications'}></label>
            </NotificationSwitch>
            {
              this.props.isAdmin
              ? <li>Admin</li>
              : null
            }
          </MenuItems>
        </MenuContainer>
    )

  }
}
