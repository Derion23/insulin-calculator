import React from 'react'

import '../css/style.css'
import Input from './Input'

export default function FixedInformationSection({
  setBloodSugar,
  setSportsKE,
  setDayTimeChoice,
  setTargetBloodSugar,
  setCorrectionFactor,
  setCarbohydrateFactor,

  bloodSugar,
  sportsKE,
  dayTimeChoice,
  targetBloodSugar,
  correctionFactor,
  carbohydrateFactor,

  refreshPage,
}) {
  return (
    <div className='space-around'>
      <Input
        name='BloodSugar'
        type='number'
        value={bloodSugar.toString()}
        description='Blutzucker'
        unit='mg/dl'
        onChange={event => setBloodSugar(event.target.value)}
      />
      <Input
        name='sportsKE'
        type='number'
        value={sportsKE.toString()}
        description='Sport-IE'
        unit='IE'
        onChange={event => setSportsKE(event.target.value)}
      />

      <p className='center-elements day-time-choice-buttons'>
        <button
          className={`automatic-day-time-choice-button 
                    ${dayTimeChoice === 'automatic' && 'active-button'}`}
          onClick={() => {
            setDayTimeChoice('automatic')
            refreshPage()
          }}>
          Auto
        </button>

        <button
          className={`morning-day-time-choice-button 
                    ${dayTimeChoice === 'morning' && 'active-button'}`}
          onClick={() => {
            setDayTimeChoice('morning')
            refreshPage()
          }}>
          Morgens
        </button>

        <button
          className={`midday-day-time-choice-button 
                    ${dayTimeChoice === 'midday' && 'active-button'}`}
          onClick={() => {
            setDayTimeChoice('midday')
            refreshPage()
          }}>
          Mittags
        </button>

        <button
          className={`evening-day-time-choice-button 
                    ${dayTimeChoice === 'evening' && 'active-button'}`}
          onClick={() => {
            setDayTimeChoice('evening')
            refreshPage()
          }}>
          Abends
        </button>
      </p>

      <Input
        name='TargetBloodSugar'
        type='number'
        value={targetBloodSugar}
        description='Blutzucker Zielwert'
        unit='mg/dl'
        onChange={event => setTargetBloodSugar(event.target.value)}
      />
      <Input
        name='CorrectionFactor'
        type='number'
        value={correctionFactor}
        description='Korrektur-Faktor'
        unit='mg/dl'
        onChange={event => setCorrectionFactor(event.target.value)}
      />
      <Input
        name='CarbohydrateFactor'
        type='number'
        value={carbohydrateFactor}
        description='KE-Faktor'
        onChange={event => setCarbohydrateFactor(event.target.value)}
      />
    </div>
  )
}
