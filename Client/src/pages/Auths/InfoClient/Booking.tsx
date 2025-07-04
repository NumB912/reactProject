import React from 'react'
import CardComponent from './CardComponent'

const Booking = () => {
  return (
        <CardComponent
      titleContent="No bookings yet"
      content="Once you make a reservation, your bookings will appear here."
      urlContentLink="/book"
      contentLink="Make a booking"
    />
  )
}

export default Booking