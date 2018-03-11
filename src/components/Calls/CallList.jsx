/**
 * src/components/Calls/CallList.jsx
 */

import React from 'react';
import CallListEntry from './CallListEntry.jsx';
import {
  Title,
  Subtitle,
  CallTable,
  Wrapper
} from './CallList-css.js'

const CallList = ( {callData} ) => (
  <Wrapper>
    <Title>Call List</Title>
      <Subtitle>
        <div>&nbsp;Timeout</div>
        <div>Description</div>
        <div>District</div>
        <div>Location</div>
        <div>Premise</div>
        <div>Cross Streets</div>
        <div>Assignment</div>
        <div>Radio Freq</div>
        <div>Map</div>
        <div>Remarks</div>
      </Subtitle>

    <CallTable>
      {callData.map((call, idx) => (
        <CallListEntry
          callTimeout={ call.timeout }
          callDescription={ call.call_description }
          callDistrict={ call.city }
          callLocation={ call.location }
          callPremiseName={ call.premise_name }
          callCrossStreets={ call.cross_street }
          callAssignment={ call.assignment }
          callRadioFreq={ (call.radio_freq) }
          callMap={ call.map_ref }
          callRemarks={ call.cfs_remark }
          key={ idx }
        />
      ))}
    </CallTable>
  </Wrapper>
)

export default CallList;
