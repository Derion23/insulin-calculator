import React from 'react'

import '../css/style.css'
import FoodItem from './FoodItem'

export default function ListSection(
    {foodItems=[], 
    foodNameSuggestionsForPer100gSlide=[],
    foodNameSuggestionsForPerPieceSlide=[],
    addNewFoodItem, 
    handleIsIntermealChange, 
    handlePer100gSlideValueChange, 
    handlePerPieceSlideValueChange, 
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
                    isPer100gSlideActive={element.isPer100gSlideActive}
                    per100gSlide={element.per100gSlide}
                    perPieceSlide={element.perPieceSlide}
                    
                    foodNameSuggestionsForPer100gSlide={foodNameSuggestionsForPer100gSlide}
                    foodNameSuggestionsForPerPieceSlide={foodNameSuggestionsForPerPieceSlide}
                    handleIsIntermealChange={handleIsIntermealChange}
                    handlePer100gSlideValueChange={handlePer100gSlideValueChange}
                    handlePerPieceSlideValueChange={handlePerPieceSlideValueChange}
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
