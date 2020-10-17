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
        <div>
            <Input 
                name = 'BloodSugar'
                value = {bloodSugar.toString()}
                description = 'Blutzucker'
                unit = 'mg/dl'
                onChange = {(event) => setBloodSugar(event.target.value)}
            />
            <Input 
                name = 'TargetBloodSugar'
                value = {targetBloodSugar}
                description = 'Blutzucker Zielwert'
                unit = 'mg/dl'
                onChange = {(event) => setTargetBloodSugar(event.target.value)}
            />
            <Input 
                name = 'CorrectionFactor'
                value = {correctionFactor}
                description = 'Korrektur-Faktor'
                unit = 'mg/dl'
                onChange = {(event) => setCorrectionFactor(event.target.value)}
            />
            <Input 
                name = 'CarbohydrateFactor'
                value = {carbohydrateFactor}
                description = 'KE-Faktor'
                onChange = {(event) => setCarbohydrateFactor(event.target.value)}
            />
        </div>
    )
}
