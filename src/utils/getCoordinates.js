import axios from 'axios'

export default function getCoordinates (address, district) {
  let addressFormatted = address.split(' ').join('_')

  axios
    .get(
      `https://maps.google.com/maps/api/geocode/json?address=${addressFormatted}+${district}+CT&key=AIzaSyDaIBXGdwp9ItpY-lA_rLk7cJ35jorY18k`
    )
    .then(response => {
      console.log(response.data.results[0].geometry.location)
      return response.data.results[0].geometry.location
    })
}
