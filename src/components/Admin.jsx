import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';



export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeColor: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
  }

  handleClick() {
    this.setState({changeColor: !this.state.changeColor})
  }

  render() {
    const AdminContainer = styled.div`
      width: 100%;
      height: 500px;
      background-color: ${!this.state.changeColor ? 'indianred' : 'midnightblue'};
      &:hover{
        cursor: pointer;
      }

    `;

    return (
        <AdminContainer onClick={this.handleClick}>



          admin stuff



        </AdminContainer>
    )

  }
}
