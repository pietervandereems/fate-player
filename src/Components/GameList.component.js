import React from 'react'
import { useSelector } from 'react-redux'

const GameList = () => {
  const games = useSelector((state) => state.games)
  const characters = useSelector((state) => state.characters)
  const player = useSelector((state) => state.player[0]) ?? { _id: '' }

  const characternames = (linkedPlayers) => linkedPlayers
    .filter((playerId) => playerId === player._id)
    .map((playerId) => characters.find((character) => character.player === playerId)?.name ?? 'Unknown')
    .join(',')

  return (
    <>
      <h2>Game List</h2>
      Hello, These are your available games
      <ul>
        {games.map((game) => <li key={game._id}>{game.name} ({characternames(game.players)})</li>)}
      </ul>
    </>
  )
}

export default GameList
