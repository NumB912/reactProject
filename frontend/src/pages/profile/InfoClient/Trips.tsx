import React from 'react'
import CardComponent from './CardComponent'

const Trips = () => {
  return (
    <CardComponent
      titleContent="Start your first trip"
      content="You haven't taken any trips yet. Start exploring now!"
      urlContentLink="/explore"
      contentLink="Explore Trips"
    />
  )
}

export default Trips