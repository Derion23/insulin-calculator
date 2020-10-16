import React from 'react'

export default function Input({id, name='',value='', onChange='', description='', placeholder='', unit=''}) {
    return (
        <div>
            <label>
                {description}
            </label>
            <input
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
