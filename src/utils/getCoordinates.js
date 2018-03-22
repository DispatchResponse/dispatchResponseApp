import axios from 'axios'
const GAPI_KEY = process.env.GAPI_KEY

export default function getCoordinates (address, district, context) {
  let addressFormatted = address.split(' ').join('_')

  axios
    .get(
      `https://maps.google.com/maps/api/geocode/json?address=
      ${addressFormatted}+
      ${district}+CT&key=
      ${"AIzaSyBih4RSzJ7R3g6cApTvkYMS7pDB8BHVWoA"}`
    )
    .then(response => {
        let destinationCoords = {
          destinationLat: response.data.results[0].geometry.location.lat,
          destinationLng: response.data.results[0].geometry.location.lng
        }
        console.log('coordinates retrieved', destinationCoords)
        context.setState({destinationCoords: destinationCoords})
        return;
    }).catch(err => console.log('ERROR: coordinates were not retrieved from fallback'))
}
