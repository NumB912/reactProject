import React, { useState } from 'react'
import Star from './UI/Star'

const StarRatingComponent = () => {
    const [star, setStar] = useState<number>(0)
    const [hoverStar, setHoverStar] = useState<number | null>(null)


    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, index) => (
                <Star key={index}
                    isLight={hoverStar !== null ? index < hoverStar : index < star}
                    styleStar=' text-2xl'
                    onClick={() => setStar(index + 1)}
                    onMouseEnter={() => setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(null)} />
            ))}
        </div>
    )
}

export default StarRatingComponent