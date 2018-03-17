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


    const {destinationLat, destinationLng} = this.props.destinationCoords;
        map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {
            lat: destinationLat,
            lng: destinationLng,
          },
          streetViewControl: false,
          mapTypeControl: false,
          mapTypeId: 'roadmap',
        });


        destinationMarker = new google.maps.Marker({
          position: {lat: destinationLat, lng: destinationLng},
          map: map,
          title: 'Dispatch Destination'
        });

        if (this.props.userCoords && this.props.userCoords.userLat && this.props.userCoords.userLng) {
          const {userLat, userLng} = this.props.userCoords;

          userMarker = new google.maps.Marker({
            position: {lat: userLat, lng: userLng},
            map: map,
            title: 'Current Location'
          });

          let markers = [userMarker, destinationMarker];
          let bounds = new google.maps.LatLngBounds();

          for (let i = 0; i < markers.length; i++) {
           bounds.extend(markers[i].getPosition());
          }

          map.fitBounds(bounds);
        }

        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map)
  }


  render() {
    const MapDiv = styled.div`
      width: 100%;
      height: 70vw;
      margin: 0 0 2em 0;
      @media screen and (min-device-width: 768px) and (max-device-width: 1024px){
        height: 100vw;
      }
      @media screen and (max-device-width: 480px) and (orientation: portrait){
        height: 100vw;
      }
    `;

    return (

      <MapDiv
        className="maps"
        id="map"/>

    )

  }
}
