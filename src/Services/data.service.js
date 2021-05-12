import PouchDB from 'pouchdb'
import { db } from '../Utils/config'

let userDB

export const connect = (user) => async (dispatch) => {
  if (user != null && !Array.isArray(user)) {
    const serverDB = new PouchDB(`${db.url}/fate-player%2F${user.username}`, {
      fetch: (url, opts) => {
        opts.headers.set('Authorization', `Bearer ${user.token}`)
        return PouchDB.fetch(url, opts)
      }
    })
    userDB = new PouchDB(`fate-player%2F${user.username}`)
    PouchDB.sync(serverDB, userDB, { live: true, retry: true })
      .on('change', (info) => {
        console.log('Change', { info })
      }).on('paused', (err) => {
        console.log('Sync Paused', { err })
      }).on('active', () => {
        console.log('Sync Active')
      }).on('denied', (err) => {
        console.log('Sync Denied', { err })
      }).on('complete', (info) => {
        console.log('Sync Complete', { info })
      }).on('error', (err) => {
        console.log('Sync Error', { err })
      })
  }
}
