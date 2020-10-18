import React from 'react'

import '../css/style.css'
import Input from './Input'

export default function FoodItem(
    {id, 
    name='', 
    grams='', 
    carbohydratesPer100Grams='',
    isIntermeal=false, 
    handleIsIntermealChange, 
    handleChange, 
    deleteFoodItem
    }) {

    return (
        <div>
            <button
                className = 'delete-food-item-button'
                onClick={() => deleteFoodItem(id)}
            >x</button>

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
            <Input
                id = {id}
                name = 'grams'
                description = 'Gramm'
                value={grams}
                onChange = {(event) => handleChange(event)}
            />
            <Input
                id = {id}
                name = 'carbohydratesPer100Grams'
                description = 'Kohlenhydrate pro 100g'
                value={carbohydratesPer100Grams}
                onChange = {(event) => handleChange(event)}
            />
            <hr />
        </div>
    )
}
