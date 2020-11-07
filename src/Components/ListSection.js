import React from 'react'

import '../css/style.css'
import FoodItem from './FoodItem'

export default function ListSection(
    {foodItems=[], 
    foodNameSuggestions=[],
    addNewFoodItem, 
    handleIsIntermealChange, 
    handleSlide1ValueChange, 
    handleSlide2ValueChange, 
    deleteFoodItem,
    handleSuggestionClick,
    handleSlideChange
    }) {
    return (
        <div>
            <h3>Elemente</h3>
            {foodItems.map(element => 
                <FoodItem 
                    key={element.key}
                    id={element.id}
                    activeSlideIdx={element.activeSlideIdx}
                    slide1={element.slide1}
                    slide2={element.slide2}
                    
                    foodNameSuggestions={foodNameSuggestions}
                    handleIsIntermealChange={handleIsIntermealChange}
                    handleSlide1ValueChange={handleSlide1ValueChange}
                    handleSlide2ValueChange={handleSlide2ValueChange}
                    deleteFoodItem={deleteFoodItem}
                    handleSuggestionClick={handleSuggestionClick}
                    handleSlideChange={handleSlideChange}
             />)}
             
            <p>
                <button 
                    className='add-new-food-item-button'
                    onClick={() => addNewFoodItem()}
                ></button>
            </p>
        </div>
    )
}
