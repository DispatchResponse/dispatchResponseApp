
var axios = require('axios')

var instance = axios.create({
  baseURL: 'https://cp.remotethings.co.uk/api',
  timeout: 5000,
  headers: {'Authorization': 'kKD6pq64fJPaekJgSGOqNKCIPBjKI9i1fCbEVdIXhGLUHtuvAZprkqU3rmFlG3HB'}
})

instance.get('/devices/463/points').then((resp) => {
  console.log('resp.data: ', resp)
})


// var config = {
//   url: 'https://cp.remotethings.co.uk/api/devices/463/points',
//   headers: {'Authorization': 'kKD6pq64fJPaekJgSGOqNKCIPBjKI9i1fCbEVdIXhGLUHtuvAZprkqU3rmFlG3HB'},
//   params: {
//     filter: {
//       where: {
//         "id": {"eq": 1051507}
//       }
//     }
//   }
// }

// axios.request(config).then(resp => {
//   console.log('resp.data: ', resp)
// })
//   .catch(error => {
//     console.log(error);
//   })
