import React from 'react'
import { useSelector } from 'react-redux'

const CharacterList = () => {
  const characters = useSelector(state => state.characters)
  const games = useSelector(state => state.games)

  const gameNames = (linkedGames) => linkedGames
    .map((gameId) => games.find((game) => game._id === gameId)?.name ?? 'Unknown')
    .join(',')

  return (
    <>
      <h2>CharacterList</h2>
      Hello, These are your available characters
      <ul>
        {characters.map(character => <li key={character._id}>{character.name} ({gameNames(character.games)})</li>)}
      </ul>
    </>
  )
}

export default CharacterList
