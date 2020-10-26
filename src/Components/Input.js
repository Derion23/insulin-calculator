import React from 'react'

import '../css/style.css'

export default function Input({id, name='',value='', onChange='', description='', placeholder='', unit=''}) {
    return (
        <div>
            <label> 
                {description}
            </label>
            <br />
            <input
                type='text'
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange === '' ? () => 0 : (event) => onChange(event)}
            ></input>
            <label>
                {unit}
            </label>
        </div>
    )
}
