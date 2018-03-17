import axios from 'axios'
const GAPI_KEY = process.env.GAPI_KEY

export default function getCoordinates (address, district) {
  let addressFormatted = address.split(' ').join('_')

  axios
    .get(
      `https://maps.google.com/maps/api/geocode/json?address=
      ${addressFormatted}+
      ${district}+CT&key=
      ${"AIzaSyBih4RSzJ7R3g6cApTvkYMS7pDB8BHVWoA"}`
    )
    .then(response => {
      return response.data.results[0].geometry.location
    }).catch(err => err)
}
