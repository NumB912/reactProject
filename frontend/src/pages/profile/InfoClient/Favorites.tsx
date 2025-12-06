import React from 'react'
import CardComponent from './CardComponent'

const Favorites = () => {
  return (
        <CardComponent
      titleContent="No favorites yet"
      content="Save your favorite destinations so you can find them easily later."
      urlContentLink="/destinations"
      contentLink="Browse destinations"
    />
  )
}

export default Favorites