import React from 'react'
import CardComponent from './CardComponent'

const Coupons = () => {
  return (
      <CardComponent
      titleContent="No coupons available"
      content="Check back later for special offers and discounts."
      urlContentLink="/offers"
      contentLink="View offers"
    />
  )
}

export default Coupons