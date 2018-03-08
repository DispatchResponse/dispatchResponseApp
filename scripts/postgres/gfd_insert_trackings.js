/**
 * scripts/postgres/gfd_insert_trackings.js
 */

const db = require('../../models')

console.log('db.trackings: ', db.trackings);
var tracks = [
  {
    "userId": 1,
    "apparatusId": "E1"
  },
  {
    "userId": 1,
    "apparatusId": "E2"
  },
  {
    "userId": 1,
    "apparatusId": "E3"
  },
  {
    "userId": 1,
    "apparatusId": "E4"
  },
  {
    "userId": 2,
    "apparatusId": "E4"
  },
  {
    "userId": 2,
    "apparatusId": "E5"
  },
  {
    "userId": 2,
    "apparatusId": "E62"
  },
  {
    "userId": 2,
    "apparatusId": "E8"
  }
]

const destroyAllTracks = () => {
  db.trackings.destroy({
    cascade: true,
    restartIdentity: true,
    truncate: true
  }).then(rowDeleted => {
    if (rowDeleted >= 1) {
      console.log('Successfully deleted: ', rowDeleted)
    }
  }, error => {
    console.log(error)
  })
}

const insertTrack = (tracks) => {
  tracks.forEach(track => {
    console.log('track: ', track);
    db.trackings.create({
        userId: track.userId,
        apparatusId: track.apparatusId
      })
      .then(elem => console.log('Success on insert: ', elem))
      .catch(error => console.error("Error on data insert into Trackings table", error))
  })
}

const destroyAndInsert = async () => {
  await destroyAllTracks()
  insertTrack(tracks)
}

destroyAndInsert()
