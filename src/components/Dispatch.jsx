import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Map2D from './Map2D';


export default class Dispatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData: null,
    };
    this.setMapData = this.setMapData.bind(this);
  }

  componentDidMount(){
    this.setMapData(this.props.dispatchData);
  }

  setMapData(dispatchData){
    let mapData = {
      lat: parseFloat(dispatchData.latitude),
      lng: parseFloat(dispatchData.latitude)
    }

    this.setState({mapData: mapData})
  }

  render() {

    const alarmColor = this.props.dispatchData.call_category.indexOf('MINOR') > -1 || this.props.dispatchData.call_category.indexOf('BOX') > -1 ? 'green' : 'firebrick';

    const DispatchContainer = styled.div`
      display: grid;
      grid-template-columns: 1fr;
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
      background-color: ${alarmColor}
    `;

    const Description = styled.div`
      grid-area: description;
      font-size: 2.5em;
    `;

    const Timeout = styled.div`
      grid-area: timeout;

    `;

    const DispatchDetails = styled.ul`
      padding: 0;
      list-style: none;

      li:nth-child(odd) {
        color: firebrick;
        box-shadow: 0 4px 2px -2px lightgray;
        background-color: white;
        border-top: 2px solid white;
        border-bottom: 2px solid firebrick;
        padding: 5px 0 5px 10px;
      }

      li:nth-child(even) {
        color: black;
        background-color: white;
        padding: 10px 0 0 10px;

      }
    `;

    return (
      <div>
        {
          !this.state.mapData ? null : (
      <DispatchContainer>

        <Title>
          <Description>{this.props.dispatchData.call_category}</Description>
          <Timeout>{this.props.dispatchData.timeout}</Timeout>
        </Title>

        <DispatchDetails>
          <li>Description</li>
          <li>{this.props.dispatchData.call_description}</li>
          <li>Address</li>
          <li>{this.props.dispatchData.location + ", " + this.props.dispatchData.city}</li>
          <li>Apparatus Assigned</li>
          <li>{ this.props.dispatchData.assignment }</li>
          <li>Nearest Cross Streets</li>
          <li>{ this.props.dispatchData.cross_street }</li>
          <li>Radio Channel & Map Reference</li>
          <li>{ this.props.dispatchData.radio_freq } &nbsp; { this.props.dispatchData.map_ref }</li>
          <li>Dispatch Timeout</li>
          <li>{ this.props.dispatchData.timeout }</li>
          <li>Misc. Details</li>
          <li>{this.props.dispatchData.cfs_remark}</li>
        </DispatchDetails>

        <Map2D mapData={this.state.mapData}/>

      </DispatchContainer>  )
        }
      </div>
    )

  }
}
