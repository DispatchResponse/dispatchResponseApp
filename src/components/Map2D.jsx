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
    console.log(this.props)
    const {lat, lng} = this.props.mapData;
        map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {
            lat: lat,
            lng: lng,
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
      height: 30em;
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
