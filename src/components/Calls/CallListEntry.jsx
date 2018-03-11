/*
 * src/CallListEntry.jsx
 */

import React from 'react';
import styled from "styled-components";
import {
  CallListRow,
  CallListItem
} from './CallListEntry-css'

const CallListEntry = (props) => (
  <CallListRow>
    <CallListItem>
      &nbsp;
      { props.callTimeout.split(' ')[1].split(':').slice(0, 2).join(':') }
      &nbsp;&nbsp;
      { props.callTimeout.split(' ')[0].split('-').slice(0, 2).join('-') }
    </CallListItem>
    <CallListItem>
      { props.callDescription }
    </CallListItem>
    <CallListItem>
      { props.callDistrict }
    </CallListItem>
    <CallListItem>
      { props.callLocation }
    </CallListItem>
    <CallListItem>
      { props.callLocation === props.callPremiseName ?
        '' :
        props.callPremiseName
      }
    </CallListItem>
    <CallListItem>
      { props.callCrossStreets }
    </CallListItem>
    <CallListItem>
      { props.callAssignment }
    </CallListItem>
    <CallListItem>
      { props.callRadioFreq }
    </CallListItem>
    <CallListItem>
      { props.callMap }
    </CallListItem>
    <CallListItem>
      { props.callRemarks }
    </CallListItem>
  </CallListRow>
);

export default CallListEntry;
