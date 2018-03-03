import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

let map;
let userMarker;
let destinationMarker

export default class Map2D extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){

    const {userLat, userLng} = this.props.userCoords;
    const {destinationLat, destinationLng} = this.props.destinationCoords;
        map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {
            lat: userLat,
            lng: userLng,
          },
          streetViewControl: false,
          mapTypeControl: false,
          mapTypeId: 'roadmap',
        });

        userMarker = new google.maps.Marker({
          position: {lat: userLat, lng: userLng},
          map: map,
          title: 'Current Location'
        });

        destinationMarker = new google.maps.Marker({
          position: {lat: destinationLat, lng: destinationLng},
          map: map,
          title: 'Dispatch Destination'
        });

        let markers = [userMarker, destinationMarker];
        let bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < markers.length; i++) {
         bounds.extend(markers[i].getPosition());
        }

        map.fitBounds(bounds);

        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map)
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
