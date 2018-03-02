import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';


export default class Dispatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {

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
      color: black;
      text-align: center;
    `;

    const Description = styled.div`
      grid-area: description;
      font-size: 2.5em;
    `;

    const Timeout = styled.div`
      grid-area: timeout;

    `;

    return (

    <DispatchContainer>
      {
        !this.props.dispatchData ? null : (

          <Title>
            <Description>{this.props.dispatchData.description}</Description>
            <Timeout>{this.props.dispatchData.timeout}</Timeout>
          </Title>

          // Address
          // Apparatus Assigned
          // Nearest Cross Streets
          // Radio Channel & Map Reference
          // Misc Details
          


        )

      }
    </DispatchContainer>

    )

  }
}
