import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Menu from './Menu';
import Map2D from './Map2D';
import Map3D from './Map3D';
import UserSettings from './UserSettings';


export default class Dispatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destinationCoords: null,
      userCoords: null,
      apparatusAssignment: null,
    };
    this.getDestinationData = this.getDestinationData.bind(this);
    this.setApparatus = this.setApparatus.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
  }

  componentDidMount() {
    this.getDestinationData(this.props.dispatchData);
    this.getCurrentLocation();
    this.setApparatus()
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      let userCoords = {
        userLat: position.coords.latitude,
        userLng: position.coords.longitude
      }
      this.setState({userCoords: userCoords})
    }, () => {
      console.log('🐸 ...(denied)');
    });
  }

  setApparatus() {
    let apparatusData = this.props.dispatchData.assignment
      .replace(/\s/g, ',')
      .split(',')
      .filter(apparatus => { return apparatus !== ',' && apparatus !== '' });

    this.setState({apparatusAssignment: apparatusData})
  }

  getDestinationData(dispatchData) {
    let destinationCoords = {
      destinationLat: parseFloat(dispatchData.latitude),
      destinationLng: parseFloat(dispatchData.longitude)
    }

    this.setState({destinationCoords: destinationCoords})
  }

  render() {

    const alarmColor = this.props.dispatchData.call_category.indexOf('MINOR') > -1
                    || this.props.dispatchData.call_category.indexOf('BOX') > -1
                     ? 'green'
                     : 'firebrick';


    const DispatchContainer = styled.div`
      display: grid;
      grid-template-columns: 1fr;
      max-width: 1200px;
    `;

    const Title = styled.div`
      padding: 20px 0 20px 0;
      display: grid;
      grid-template-rows: 2fr 1fr;
      grid-template-columns: 1fr 5fr 1fr;
      grid-template-areas: '.. description ..'
                           '.. timeout     ..';
      color: white;
      text-align: center;
      background-color: ${alarmColor};
      letter-spacing: 5px;
        @media screen and (min-width: 1024px){
          border-radius: 15px 15px 0 0;
        }
    `;

    const Description = styled.div`
      grid-area: description;
      font-size: 3em;
      font-family: 'Podkova';
      @media screen and (max-device-width: 480px) and (orientation: portrait){
        font-size: 5em;
      }
    `;

    const Timeout = styled.div`
      grid-area: timeout;
      font-size: 1.5em;
      font-family: 'Source Code Pro', monospace;
      letter-spacing: 5px;
    `;

    const DispatchDetails = styled.ul`
      padding: 0;
      list-style: none;

      li:nth-child(odd) {
        font-family: 'Anonymous Pro';
        color: firebrick;
        box-shadow: 0 4px 2px -2px lightgray;
        background-color: white;
        border-top: 2px solid white;
        border-bottom: 2px solid firebrick;
        padding: 5px 0 5px 10px;
        font-size: 1.3em;
      }

      li:nth-child(even) {
        font-family: 'Source Code Pro', monospace;
        color: black;
        background-color: white;
        padding: 10px 0 0 10px;
        margin-bottom: 2%;
        font-size: 1.5em;

      }
    `;

    const ApparatusContainer = styled.li`
      display: flex;
      justify-content: space-around;
    `;

    const Apparatus = styled.div`
      color: white;
      text-align: center;
      background-color: black;
      width: 10%;
      font-size: 1em;
      border-radius: 50%;
      margin: 2%;
      padding: 2% 2% 2% 3%;
      letter-spacing: 5px;
      ${'' /* @media screen and (max-device-width: 480px) and (orientation: portrait){
        font-size: 1.5em;
      } */}
    `;


    return (

        <DispatchContainer>

        <Title>
          <Description>{this.props.dispatchData.call_category}</Description>
          <Timeout>{this.props.dispatchData.timeout}</Timeout>
        </Title>

        <DispatchDetails>
          <li>Apparatus Assigned</li>
          <ApparatusContainer>
            {
              !this.state.apparatusAssignment ? null :
              this.state.apparatusAssignment.map( (apparatus) => {
                return <Apparatus key={apparatus}>{apparatus}</Apparatus>
              })
            }
          </ApparatusContainer>
          <li>Description</li>
          <li>{this.props.dispatchData.call_description}</li>
          <li>Address</li>
          <li>{this.props.dispatchData.location + ", " + this.props.dispatchData.city}</li>
          <li>Nearest Cross Streets</li>
          <li>{ this.props.dispatchData.cross_street }</li>
          <li>Radio Channel & Map Reference</li>
          <li>{ this.props.dispatchData.radio_freq } &nbsp; { this.props.dispatchData.map_ref }</li>
          <li>Dispatch Timeout</li>
          <li>{ this.props.dispatchData.timeout }</li>
          <li>Misc. Details</li>
          <li>{this.props.dispatchData.cfs_remark}</li>
          <li>Navigation</li>
        </DispatchDetails>

        {
        !this.state.userCoords || !this.state.destinationCoords ?  null :
        <Map2D
          userCoords={this.state.userCoords}
          destinationCoords={this.state.destinationCoords}/>
        }

        <DispatchDetails>
          <li>Destination</li>
        </DispatchDetails>

        {
        !this.state.destinationCoords ? null :
        <Map3D destinationCoords={this.state.destinationCoords}/>
        }


        </DispatchContainer>

    )

  }
}
