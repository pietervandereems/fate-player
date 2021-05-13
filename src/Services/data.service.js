import PouchDB from 'pouchdb'
import { db } from '../Utils/config'
import * as character from '../Reducers/characters.reducer'
import * as games from '../Reducers/games.reducer'
import { logout } from '../Reducers/user.reducer'

const stateUpdater = ({ db, dispatch }) => ({ type = '', stateUpdater }) => {
  db.allDocs({
    include_docs: true,
    attachments: true,
    startkey: type,
    endkey: `${type}\ufff0`
  })
    .then((result) => {
      dispatch(stateUpdater(result.rows.map(row => row.doc)))
    })
    .catch((err) => {
      console.error('Error caught retrieving all character docs', { err })
    })
}

export const connect = (user) => async (dispatch) => {
  if (user != null && !Array.isArray(user)) {
    const serverDB = new PouchDB(`${db.url}/fate-player%2F${user.username}`, {
      fetch: (url, opts) => {
        opts.headers.set('Authorization', `Bearer ${user.token}`)
        return PouchDB.fetch(url, opts)
      }
    })
    const userDB = new PouchDB(`fate-player%2F${user.username}`)
    const updateState = stateUpdater({ db: userDB, dispatch })

    userDB.replicate.from(serverDB)
      .on('complete', (info) => {
        if (info.ok) {
          updateState({ type: 'character_', stateUpdater: character.initialize })
          updateState({ type: 'game_', stateUpdater: games.initialize })
        } else {
          console.error('Initial replication did not return ok', { info })
        }

        PouchDB.sync(serverDB, userDB, { live: true, retry: true })
          .on('change', (info) => {
            if (info.change.ok) {
              info.change.docs.forEach((doc) => {
                switch (doc.type) {
                  case 'character':
                    return dispatch(character.dbUpdate(doc))
                  default:
                    console.log('unknown update', info.doc)
                }
              })
            }
            console.info('Change', { info })
          })
          .on('paused', (_err) => {
          })
          .on('active', () => {
            console.log('Sync Active')
          })
          .on('denied', (err) => {
            console.log('Sync Denied', { err })
          })
          .on('complete', (info) => {
            console.log('Sync Complete', { info })
          })
          .on('error', (err) => {
            console.error('Sync Error', { err })
            if (err.error === 'unauthorized') {
              dispatch(logout())
            }
          })
      })
      .on('error', (err) => {
        if (err.error === 'unauthorized') {
          dispatch(logout())
        }
        console.error('Initial replication error', { err })
      })
  }
}
