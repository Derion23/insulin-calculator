import React from 'react'

import '../css/style.css'
import Input from './Input'

export default function FixedInformationSection(
    {setBloodSugar, 
    setTargetBloodSugar, 
    setCorrectionFactor,
    setCarbohydrateFactor,
    bloodSugar, 
    targetBloodSugar, 
    correctionFactor, 
    carbohydrateFactor
    }) {
    
    return (
        <div className='space-around'>
            <Input 
                name = 'BloodSugar'
                type='number'
                value = {bloodSugar.toString()}
                description = 'Blutzucker'
                unit = 'mg/dl'
                onChange = {(event) => setBloodSugar(event.target.value)}
            />
            <Input 
                name = 'TargetBloodSugar'
                type='number'
                value = {targetBloodSugar}
                description = 'Blutzucker Zielwert'
                unit = 'mg/dl'
                onChange = {(event) => setTargetBloodSugar(event.target.value)}
            />
            <Input 
                name = 'CorrectionFactor'
                type='number'
                value = {correctionFactor}
                description = 'Korrektur-Faktor'
                unit = 'mg/dl'
                onChange = {(event) => setCorrectionFactor(event.target.value)}
            />
            <Input 
                name = 'CarbohydrateFactor'
                type='number'
                value = {carbohydrateFactor}
                description = 'KE-Faktor'
                onChange = {(event) => setCarbohydrateFactor(event.target.value)}
            />
        </div>
    )
}
