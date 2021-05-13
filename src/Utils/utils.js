const rev = (doc) => parseInt(doc._rev.split('_')[0], 10)

export {
  rev
}
