import React from 'react'

import '../css/style.css'
import Input from './Input'
import SuggestionList from './SuggestionList.js'

export default function FoodItem(
    {id, 
    name='', 
    grams='', 
    carbohydratesPer100Grams='',
    isIntermeal=false, 
    foodNameSuggestions,
    handleIsIntermealChange, 
    handleChange,
    deleteFoodItem,
    shouldDisplaySuggestions=true,
    handleSuggestionClick
    }) {

    return (
        <div>
            <button
                className = 'delete-food-item-button'
                onClick={() => deleteFoodItem(id)}
            ></button>

            <label className='intermeal-checkbox'>
                <input
                    type = 'checkbox'
                    checked = {isIntermeal}
                    onChange = {() => handleIsIntermealChange(id)}
                ></input> ZM?
            </label>
            
            
            <Input 
                id = {id}
                name = 'name'
                description = 'Name'
                value = {name}
                onChange = {(event) => handleChange(event)}
            />
            {shouldDisplaySuggestions && <SuggestionList 
                allSuggestions={foodNameSuggestions}
                searchingText={name}
                handleSuggestionClick={(suggestionText) => handleSuggestionClick(suggestionText, id)}
            />}

            <Input
                id = {id}
                name = 'grams'
                description = 'Gramm'
                value = {grams}
                onChange = {(event) => handleChange(event)}
            />
            <Input
                id = {id}
                name = 'carbohydratesPer100Grams'
                description = 'Kohlenhydrate pro 100g'
                value = {carbohydratesPer100Grams}
                onChange = {(event) => handleChange(event)}
            />
            <hr />
        </div>
    )
}
