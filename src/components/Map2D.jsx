import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

let map;

export default class Map2D extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){

    const {userLat, userLng} = this.props.userCoords;
        map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {
            lat: userLat,
            lng: userLng,
          },
          streetViewControl: false,
          mapTypeControl: false,
          mapTypeId: 'roadmap',
          //turn off all country names and labels

        });
  }


  render() {
    const MapDiv = styled.div`
      width: 100%;
      height: 50em;
      margin: 2em 0 2em 0;
    `;

    return (

      <MapDiv
        className="maps"
        id="map"
        >
      </MapDiv>


    )

  }
}
