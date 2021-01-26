import React from 'react'

import '../css/style.css'

export default function Input(
    {id, type='text', name='',value='', onChange='', onFocus='', description='', placeholder='', unit=''}) {
    return (
        <div>
            <label> 
                {description}
            </label>
            <br />
            <input
                type={type}
                autoComplete='off'
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange === '' ? () => 0 : (event) => onChange(event)}
                onFocus={onFocus === '' ? () => 0: () => onFocus()}
            ></input>
            <label>
                {unit}
            </label>
        </div>
    )
}
