import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

let map3D;
let destinationMarker;

export default class Map3D extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){

    const {destinationLat, destinationLng} = this.props.destinationCoords;

        map3D = new window.google.maps.Map(document.getElementById('map3D'), {
          zoom: 19,
          center: {
            lat: destinationLat,
            lng: destinationLng,
          },
          mapTypeId: google.maps.MapTypeId.HYBRID,
          heading: 90,
          tilt: 45
        });

        destinationMarker = new google.maps.Marker({
          position: {lat: destinationLat, lng: destinationLng},
          map: map3D,
          title: 'Dispatch Destination'
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
        id="map3D"
        >
      </MapDiv>


    )

  }
}
