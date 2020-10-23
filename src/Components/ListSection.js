import React from 'react'

import '../css/style.css'
import FoodItem from './FoodItem'

export default function ListSection(
    {foodItems=[], 
    addNewFoodItem, 
    handleIsIntermealChange, 
    handleChange, 
    deleteFoodItem,
    handleSuggestionClick
    }) {
    return (
        <div>
            <h3>Elemente</h3>

            {foodItems.map(element => 
                <FoodItem 
                    key={element.key}
                    id={element.id}
                    name={element.name}
                    grams={element.grams}
                    carbohydratesPer100Grams={element.carbohydratesPer100Grams}
                    isIntermeal={element.isIntermeal}
                    handleIsIntermealChange={handleIsIntermealChange}
                    handleChange={handleChange}
                    deleteFoodItem={deleteFoodItem}
                    handleSuggestionClick={handleSuggestionClick}
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
