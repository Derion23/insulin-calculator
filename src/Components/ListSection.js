import React from 'react'

import '../css/style.css'
import FoodItem from './FoodItem'

export default function ListSection({foodItems=[], addNewFoodItem, handleChange, deleteFoodItem}) {
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
                    handleChange={handleChange}
                    deleteFoodItem={deleteFoodItem}
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
