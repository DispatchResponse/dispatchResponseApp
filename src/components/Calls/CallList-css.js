/**
 * src/components/Calls/CallList-css.jsx
 */

import styled from "styled-components";

module.exports = {

Title: styled.div`
  display: grid;
  grid-template-columns: 1fr;
  font-size: 2.0em;
  text-align: center;
  color: white;
  background-color: Crimson;
  margin: 0 10% 0px 10%;
  padding: .7% 0;
`,

Subtitle: styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  background-color: DarkRed;
  color: white;
  font-size: 1.4em;
  margin: 0 10% 0px 10%;
  padding: .7% 0;
`,

Wrapper: styled.section`
  padding: 4em;
  background: PapayaWhip;
`,

CallTable: styled.div`
  display: grid;
  margin: 0 10% 0 10%;
  grid-template-columns: 1fr;
    > div:nth-child(odd){
      background-color: Gainsboro;
    }
    > div:hover{background-color: tomato;}
`
}
